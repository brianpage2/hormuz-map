import type { Vessel } from "./types";

type KoreanPort = {
  label: string;
  aliases: string[];
};

const KOREAN_MMSI_PREFIXES = new Set(["440", "441"]);

const KOREAN_PORTS: KoreanPort[] = [
  { label: "부산", aliases: ["BUSAN", "PUSAN", "KRPUS", "KRBUS"] },
  { label: "울산", aliases: ["ULSAN", "KRUSN"] },
  { label: "여수", aliases: ["YEOSU", "KRYOS", "YEOSU SI"] },
  { label: "대산", aliases: ["DAESAN", "KRDSN"] },
  { label: "온산", aliases: ["ONSAN", "KRONS"] },
  { label: "광양", aliases: ["GWANGYANG", "KWANGYANG", "KRKAN"] },
  { label: "인천", aliases: ["INCHEON", "INCHON", "KRINC"] },
  { label: "평택", aliases: ["PYEONGTAEK", "PYEONGTAEK DANGJIN", "KRPYT"] },
  { label: "포항", aliases: ["POHANG", "KRKPO"] },
  { label: "목포", aliases: ["MOKPO", "KRMOK"] },
  { label: "군산", aliases: ["GUNSAN", "KUKSAN", "KRKAN2"] },
  { label: "제주", aliases: ["JEJU", "CHEJU", "KRJJU"] },
];

function normalizeDestination(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

function compactDestination(value: string) {
  return normalizeDestination(value).replace(/\s+/g, "");
}

export function inferCountryCodeFromMmsi(mmsi: string) {
  const prefix = mmsi.trim().slice(0, 3);
  if (KOREAN_MMSI_PREFIXES.has(prefix)) {
    return "KR";
  }

  return "";
}

export function matchKoreanDestination(destination: string) {
  if (!destination) {
    return null;
  }

  const normalized = normalizeDestination(destination);
  const compact = compactDestination(destination);

  for (const port of KOREAN_PORTS) {
    for (const alias of port.aliases) {
      const normalizedAlias = normalizeDestination(alias);
      const compactAlias = compactDestination(alias);

      if (
        normalized.includes(normalizedAlias) ||
        compact.includes(compactAlias)
      ) {
        return port.label;
      }
    }
  }

  return null;
}

export function enrichKoreanContext(vessel: Vessel): Vessel {
  const inferredFlag = vessel.flag || inferCountryCodeFromMmsi(vessel.mmsi);
  const koreanDestination = matchKoreanDestination(vessel.destination);
  const isKoreanFlagged = inferredFlag === "KR";
  const isKoreanBound = Boolean(koreanDestination);

  return {
    ...vessel,
    flag: inferredFlag,
    isKoreanFlagged,
    isKoreanBound,
    isKoreanRelated: isKoreanFlagged || isKoreanBound,
    koreanDestination: koreanDestination ?? "",
  };
}
