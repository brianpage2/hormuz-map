// aisstream.io WebSocket API 연동
// 문서: https://aisstream.io/documentation
// GitHub: https://github.com/aisstream/example

import { VESSEL_TYPE_LABELS } from "@/lib/utils/constants";
import type { Vessel } from "./types";

// 호르무즈 해협 정밀 바운딩 박스 (GitHub hormuz-crossing-tracker 참조)
// [[남쪽위도, 서쪽경도], [북쪽위도, 동쪽경도]]
export const HORMUZ_BOUNDING_BOX = [[25.4, 55.0], [26.9, 57.8]];

const AIS_STATUS_LABELS: Record<number, string> = {
  0: "항해 중",
  1: "닻 내림",
  2: "조종 불능",
  3: "조종 제한",
  4: "흘수 제한",
  5: "계류 중",
  6: "좌초",
  7: "어로 중",
  8: "항해 중",
  15: "미정의",
};

// aisstream.io 메시지 타입
interface AISStreamMessage {
  MessageType: string;
  MetaData?: {
    MMSI?: number;
    ShipName?: string;
    latitude?: number;
    longitude?: number;
    time_utc?: string;
    Latitude?: number;
    Longitude?: number;
    Time_UTC?: string;
  };
  Metadata?: {
    MMSI?: number;
    ShipName?: string;
    latitude?: number;
    longitude?: number;
    time_utc?: string;
    Latitude?: number;
    Longitude?: number;
    Time_UTC?: string;
  };
  Message?: {
    PositionReport?: {
      Cog?: number;         // Course over ground
      Sog?: number;         // Speed over ground
      TrueHeading?: number;
      NavigationalStatus?: number;
      Latitude?: number;
      Longitude?: number;
    };
    StandardClassBPositionReport?: {
      Cog?: number;
      Sog?: number;
      TrueHeading?: number;
      NavigationalStatus?: number;
      Latitude?: number;
      Longitude?: number;
    };
    ExtendedClassBPositionReport?: {
      Cog?: number;
      Sog?: number;
      TrueHeading?: number;
      NavigationalStatus?: number;
      Latitude?: number;
      Longitude?: number;
    };
    ShipStaticData?: {
      Name?: string;
      CallSign?: string;
      Type?: number;
      Dimension?: {
        A?: number; B?: number; C?: number; D?: number;
      };
      Draught?: number;
      Destination?: string;
      ImoNumber?: number;
    };
    StaticDataReport?: {
      ReportA?: {
        Name?: string;
      };
      ReportB?: {
        CallSign?: string;
        ShipType?: number;
        Dimension?: {
          A?: number; B?: number; C?: number; D?: number;
        };
      };
    };
  };
}

function pickNumber(...values: Array<number | undefined>) {
  return values.find((value): value is number => typeof value === "number" && Number.isFinite(value));
}

function pickString(...values: Array<string | undefined>) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function readPositionReport(msg: AISStreamMessage) {
  return (
    msg.Message?.PositionReport ??
    msg.Message?.StandardClassBPositionReport ??
    msg.Message?.ExtendedClassBPositionReport
  );
}

function readShipStaticData(msg: AISStreamMessage) {
  if (msg.Message?.ShipStaticData) {
    return msg.Message.ShipStaticData;
  }

  const staticDataReport = msg.Message?.StaticDataReport;
  if (!staticDataReport) {
    return undefined;
  }

  return {
    Name: staticDataReport.ReportA?.Name,
    CallSign: staticDataReport.ReportB?.CallSign,
    Type: staticDataReport.ReportB?.ShipType,
    Dimension: staticDataReport.ReportB?.Dimension,
  };
}

// AISStream 메시지 → 내부 Vessel 타입 변환
export function parseAISMessage(msg: AISStreamMessage): Partial<Vessel> | null {
  const meta = msg.MetaData ?? msg.Metadata;
  if (!meta?.MMSI) return null;

  const pos = readPositionReport(msg);
  const stat = readShipStaticData(msg);

  const typeCode = stat?.Type ?? 0;
  const typeLabel = VESSEL_TYPE_LABELS[typeCode] ?? "기타";
  const lat = pickNumber(pos?.Latitude, meta.latitude, meta.Latitude);
  const lng = pickNumber(pos?.Longitude, meta.longitude, meta.Longitude);
  const timestamp = pickString(meta.time_utc, meta.Time_UTC) || new Date().toISOString();

  return {
    mmsi: String(meta.MMSI),
    name: pickString(meta.ShipName, stat?.Name, "Unknown"),
    flag: "",
    vesselType: typeCode,
    vesselTypeLabel: typeLabel,
    ...(lat !== undefined ? { lat } : {}),
    ...(lng !== undefined ? { lng } : {}),
    speed: pos?.Sog ? Math.round(pos.Sog * 10) / 10 : 0,
    course: pos?.Cog ?? 0,
    heading: pos?.TrueHeading ?? pos?.Cog ?? 0,
    status: pos?.NavigationalStatus ?? 0,
    statusLabel: AIS_STATUS_LABELS[pos?.NavigationalStatus ?? 0] ?? "미정의",
    destination: pickString(stat?.Destination),
    draught: stat?.Draught ?? 0,
    length: stat?.Dimension ? (stat.Dimension.A ?? 0) + (stat.Dimension.B ?? 0) : 0,
    timestamp,
  };
}

// WebSocket 구독 메시지 생성 (hormuz-crossing-tracker 참조)
export function buildSubscribeMessage(apiKey: string) {
  return JSON.stringify({
    APIKey: apiKey,
    BoundingBoxes: [HORMUZ_BOUNDING_BOX],
    FilterMessageTypes: [
      "PositionReport",
      "StandardClassBPositionReport",
      "ExtendedClassBPositionReport",
      "ShipStaticData",
      "StaticDataReport",
    ],
  });
}
