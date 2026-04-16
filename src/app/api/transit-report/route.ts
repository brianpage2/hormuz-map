import { NextResponse } from "next/server";

export const revalidate = 3600; // 1시간 캐시

const API_KEY = process.env.TRANSIT_REPORT_API_KEY;
const BASE = "https://api.odcloud.kr/api/15115889/v1";

// v3: 선종별 누적 통계 (2025.08 최신)
const V3_ID = "uddi:9cd38469-b243-47d3-ae00-b30ccba578bc";

export type TransitStat = {
  건수: number;
  선종: string;
  통항해역: string;
};

export type TransitReportResponse = {
  stats: TransitStat[];        // 호르무즈 선종별 누적 통계
  totalHormuzCount: number;    // 호르무즈 누적 통항 건수
  dataRange: string;           // 데이터 기준 시점
  updatedAt: string;
};

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "TRANSIT_REPORT_API_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    // v3: 선종별 누적 통계 (전체 43건 조회 후 호르무즈만 필터)
    const statsUrl = new URL(`${BASE}/${V3_ID}`);
    statsUrl.searchParams.set("serviceKey", API_KEY);
    statsUrl.searchParams.set("page", "1");
    statsUrl.searchParams.set("perPage", "43");

    const statsRes = await fetch(statsUrl.toString(), {
      next: { revalidate: 3600 },
    });
    const statsJson = await statsRes.json();

    // 호르무즈 필터 후 동일 선종 집계 (원본 데이터에 중복 행 존재)
    const hormuzStats: TransitStat[] = (statsJson.data ?? [])
      .filter((d: TransitStat) => d.통항해역 === "호르무즈")
      .reduce((acc: TransitStat[], d: TransitStat) => {
        const existing = acc.find((s) => s.선종 === d.선종);
        if (existing) {
          existing.건수 += d.건수;
        } else {
          acc.push({ ...d });
        }
        return acc;
      }, []);

    const totalHormuzCount: number = hormuzStats.reduce((sum, s) => sum + s.건수, 0);

    const body: TransitReportResponse = {
      stats: hormuzStats,
      totalHormuzCount,
      dataRange: "누적 (~2025.08)",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("[transit-report] fetch error:", err);
    return NextResponse.json(
      { error: "공공데이터 API 호출 실패" },
      { status: 502 }
    );
  }
}
