import { NextResponse } from "next/server";

export const revalidate = 86400; // 24시간 캐시 (World Bank는 연간 업데이트)

// World Bank API — 한국 에너지 수입 의존도
// EG.IMP.CONS.ZS: Energy imports, net (% of energy use)
// 무료, 인증키 불필요
const WB_URL =
  "https://api.worldbank.org/v2/country/KOR/indicator/EG.IMP.CONS.ZS" +
  "?format=json&per_page=15&mrv=15";

export type EnergyYearData = {
  year: string;
  value: number; // % of energy use
};

export type EnergyStatsResponse = {
  series: EnergyYearData[];   // 연도별 에너지 수입 의존도
  latest: EnergyYearData;     // 가장 최근 데이터
  source: string;
  updatedAt: string;
};

export async function GET() {
  try {
    const res = await fetch(WB_URL, { next: { revalidate: 86400 } });

    if (!res.ok) throw new Error(`World Bank API ${res.status}`);

    const json = await res.json();
    const raw: Array<{ date: string; value: number | null }> = json[1] ?? [];

    const series: EnergyYearData[] = raw
      .filter((r) => r.value !== null)
      .map((r) => ({ year: r.date, value: Math.round(r.value! * 10) / 10 }))
      .sort((a, b) => Number(a.year) - Number(b.year)); // 오래된 순

    if (series.length === 0) throw new Error("No data from World Bank");

    const latest = series[series.length - 1];

    const body: EnergyStatsResponse = {
      series,
      latest,
      source: "World Bank — EG.IMP.CONS.ZS",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("[energy-stats]", err);
    return NextResponse.json(
      { error: "World Bank API 호출 실패" },
      { status: 502 }
    );
  }
}
