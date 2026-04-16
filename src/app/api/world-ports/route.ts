import { NextRequest, NextResponse } from "next/server";

export const revalidate = 1800; // 30분 캐시

const API_URL = "https://www.upa.or.kr/data/portal/openapi/WOMAHA";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;
const MAX_PAGE_SIZE = 100;

export type WorldPortContact = {
  nation: string;
  harbor: string;
  engn: string;
  site: string;
};

export type WorldPortsResponse = {
  items: WorldPortContact[];
  page: number;
  pageSize: number;
  currentCount: number;
  totalCount: number;
  query: {
    nation: string;
    harbor: string;
    engn: string;
    site: string;
  };
  usingSampleKey: boolean;
  source: string;
  message?: string;
};

function clampPage(value: string | null, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

function clampPageSize(value: string | null, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(MAX_PAGE_SIZE, Math.floor(parsed));
}

function getQueryValue(searchParams: URLSearchParams, ...keys: string[]) {
  for (const key of keys) {
    const value = searchParams.get(key);
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePortRow(value: unknown): WorldPortContact | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const nation = normalizeString(row.NATION);
  const harbor = normalizeString(row.HARBOR);
  const engn = normalizeString(row.ENGN);
  const site = normalizeString(row.SITE);

  if (!nation && !harbor && !engn && !site) {
    return null;
  }

  return {
    nation,
    harbor,
    engn,
    site,
  };
}

function collectPortRows(value: unknown) {
  const rows: WorldPortContact[] = [];
  const visited = new Set<unknown>();

  function visit(node: unknown) {
    if (!node || typeof node !== "object" || visited.has(node)) {
      return;
    }

    visited.add(node);

    if (Array.isArray(node)) {
      for (const item of node) {
        visit(item);
      }
      return;
    }

    const normalized = normalizePortRow(node);
    if (normalized) {
      rows.push(normalized);
    }

    for (const child of Object.values(node as Record<string, unknown>)) {
      visit(child);
    }
  }

  visit(value);

  return rows;
}

function findFirstNumber(value: unknown) {
  const visited = new Set<unknown>();
  const stack: unknown[] = [value];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || typeof current !== "object" || visited.has(current)) {
      continue;
    }

    visited.add(current);

    if (Array.isArray(current)) {
      for (const item of current) {
        stack.push(item);
      }
      continue;
    }

    const record = current as Record<string, unknown>;
    for (const key of ["totalCount", "list_total_count", "listTotalCount"]) {
      const valueAtKey = record[key];
      if (typeof valueAtKey === "number" && Number.isFinite(valueAtKey)) {
        return valueAtKey;
      }
      if (typeof valueAtKey === "string" && valueAtKey.trim() && !Number.isNaN(Number(valueAtKey))) {
        return Number(valueAtKey);
      }
    }

    for (const child of Object.values(record)) {
      stack.push(child);
    }
  }

  return null;
}

function findFirstMessage(value: unknown) {
  const visited = new Set<unknown>();
  const stack: unknown[] = [value];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || typeof current !== "object" || visited.has(current)) {
      continue;
    }

    visited.add(current);

    if (Array.isArray(current)) {
      for (const item of current) {
        stack.push(item);
      }
      continue;
    }

    const record = current as Record<string, unknown>;
    for (const key of ["MESSAGE", "message"]) {
      const valueAtKey = record[key];
      if (typeof valueAtKey === "string" && valueAtKey.trim()) {
        return valueAtKey.trim();
      }
    }

    for (const child of Object.values(record)) {
      stack.push(child);
    }
  }

  return "";
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = clampPage(searchParams.get("page") ?? searchParams.get("pIndex"), DEFAULT_PAGE);
  const pageSize = clampPageSize(
    searchParams.get("pageSize") ?? searchParams.get("pSize"),
    DEFAULT_PAGE_SIZE
  );
  const query = {
    nation: getQueryValue(searchParams, "nation", "NATION"),
    harbor: getQueryValue(searchParams, "harbor", "HARBOR"),
    engn: getQueryValue(searchParams, "engn", "ENGN"),
    site: getQueryValue(searchParams, "site", "SITE"),
  };
  const apiKey = process.env.UPA_WORLD_PORTS_API_KEY?.trim() || "sample";
  const usingSampleKey = apiKey === "sample";

  try {
    const upstreamUrl = new URL(API_URL);
    upstreamUrl.searchParams.set("KEY", apiKey);
    upstreamUrl.searchParams.set("Type", "json");
    upstreamUrl.searchParams.set("pIndex", String(page));
    upstreamUrl.searchParams.set("pSize", String(pageSize));

    if (query.nation) upstreamUrl.searchParams.set("NATION", query.nation);
    if (query.harbor) upstreamUrl.searchParams.set("HARBOR", query.harbor);
    if (query.engn) upstreamUrl.searchParams.set("ENGN", query.engn);
    if (query.site) upstreamUrl.searchParams.set("SITE", query.site);

    const response = await fetch(upstreamUrl.toString(), {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `세계 주요 항만 API 호출 실패 (${response.status})` },
        { status: 502 }
      );
    }

    const payload = await response.json();
    const items = collectPortRows(payload);
    const totalCount = findFirstNumber(payload) ?? items.length;
    const message = findFirstMessage(payload);

    const body: WorldPortsResponse = {
      items,
      page,
      pageSize,
      currentCount: items.length,
      totalCount,
      query,
      usingSampleKey,
      source: "세계 주요 항만 연락처 데이터",
      ...(message ? { message } : {}),
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("[world-ports]", error);
    return NextResponse.json(
      { error: "세계 주요 항만 데이터를 불러오지 못했습니다." },
      { status: 502 }
    );
  }
}
