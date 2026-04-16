"use client";

import { useState, useEffect, useCallback } from "react";
import type { EnergyStatsResponse, EnergyYearData } from "@/app/api/energy-stats/route";

function MiniBar({ item, max }: { item: EnergyYearData; max: number }) {
  const pct = Math.round((item.value / max) * 100);
  // 85% 이상이면 빨간색, 이하면 주황색
  const color = item.value >= 85 ? "bg-rose-500" : "bg-orange-400";

  return (
    <div className="flex items-center gap-2">
      <span className="w-9 text-right text-[10px] text-slate-500 tabular-nums shrink-0">
        {item.year}
      </span>
      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-[10px] font-medium text-slate-700 tabular-nums shrink-0">
        {item.value}%
      </span>
    </div>
  );
}

export default function EnergyStatsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<EnergyStatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/energy-stats");
      if (!res.ok) throw new Error("API 오류");
      setData(await res.json());
    } catch {
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !data && !loading) fetchData();
  }, [isOpen, data, loading, fetchData]);

  const maxVal = data ? Math.max(...data.series.map((d) => d.value)) : 100;

  return (
    <div className="flex flex-col items-end gap-2">
      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg transition-all ${
          isOpen
            ? "bg-orange-500 text-white shadow-orange-400/30"
            : "bg-white/96 text-slate-800 border border-slate-200 hover:bg-white backdrop-blur"
        }`}
      >
        <span>⚡</span>
        <span>한국 에너지 의존도</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>

      {/* 패널 */}
      {isOpen && (
        <div className="w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white/96 shadow-2xl backdrop-blur overflow-hidden">
          {/* 헤더 */}
          <div className="px-4 pt-4 pb-3 border-b border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1">
              World Bank 공개 데이터
            </p>
            <h3 className="text-sm font-semibold text-slate-900">
              한국 에너지 수입 의존도
            </h3>
            {data && (
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold text-rose-600">
                  {data.latest.value}%
                </span>
                <span className="text-xs text-slate-500">
                  ({data.latest.year}년 기준)
                </span>
              </div>
            )}
            <p className="text-[11px] text-slate-500 mt-1">
              전체 에너지 소비 중 수입 비중 · 호르무즈 의존 근거
            </p>
          </div>

          {/* 차트 */}
          <div className="p-4">
            {loading && (
              <div className="py-6 text-center text-xs text-slate-400 animate-pulse">
                World Bank 데이터 불러오는 중...
              </div>
            )}

            {error && (
              <div className="py-4 text-center">
                <p className="text-xs text-red-500 mb-2">{error}</p>
                <button
                  type="button"
                  onClick={fetchData}
                  className="text-xs text-orange-500 underline"
                >
                  다시 시도
                </button>
              </div>
            )}

            {data && (
              <div className="space-y-1.5">
                {data.series.slice(-10).map((item) => (
                  <MiniBar key={item.year} item={item} max={maxVal} />
                ))}
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>한국 에너지 자급률</span>
                    <span className="font-medium text-slate-700">
                      약 {(100 - data.latest.value).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 출처 */}
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
            <p className="text-[10px] text-slate-400">
              출처: World Bank · Energy imports, net (% of energy use)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
