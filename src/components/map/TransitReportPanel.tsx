"use client";

import { useState, useEffect, useCallback } from "react";
import type { TransitReportResponse, TransitStat } from "@/app/api/transit-report/route";

const SHIP_TYPE_COLOR: Record<string, string> = {
  유조선:         "bg-yellow-400",
  "LNG Carrrier": "bg-cyan-400",
  벌크선:         "bg-green-400",
  자동차운반선:   "bg-purple-400",
  "LPG Carrier":  "bg-orange-400",
  컨테이너선:     "bg-blue-400",
  케미칼선:       "bg-pink-400",
  일반화물선:     "bg-gray-400",
  기타:           "bg-slate-400",
};

function StatBar({ stat, max }: { stat: TransitStat; max: number }) {
  const pct = Math.round((stat.건수 / max) * 100);
  const color = SHIP_TYPE_COLOR[stat.선종] ?? "bg-slate-400";
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
          <span className="text-slate-700 font-medium">{stat.선종}</span>
        </span>
        <span className="text-slate-500 tabular-nums">{stat.건수.toLocaleString()}건</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TransitReportPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TransitReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/transit-report");
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

  const maxStat = data ? Math.max(...data.stats.map((s) => s.건수), 1) : 1;

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg transition-all ${
          isOpen
            ? "bg-rose-600 text-white shadow-rose-500/30"
            : "bg-white/96 text-slate-800 border border-slate-200 hover:bg-white backdrop-blur"
        }`}
      >
        <span>🇰🇷</span>
        <span>위험해역 통항보고</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white/96 shadow-2xl backdrop-blur overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-slate-100">
<h3 className="text-sm font-semibold text-slate-900">
              호르무즈 한국 선박 통항보고
            </h3>
            {data && (
              <p className="text-[11px] text-slate-500 mt-1">
                누적 통항보고{" "}
                <span className="font-bold text-slate-800">
                  {data.totalHormuzCount.toLocaleString()}건
                </span>{" "}
                · 통계 선종 {data.stats.length}종
              </p>
            )}
          </div>

          <div className="max-h-[420px] overflow-y-auto p-4">
            {loading && (
              <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
                공공데이터 불러오는 중...
              </div>
            )}

            {error && (
              <div className="py-4 text-center">
                <p className="text-xs text-red-500 mb-2">{error}</p>
                <button
                  type="button"
                  onClick={fetchData}
                  className="text-xs text-rose-600 underline"
                >
                  다시 시도
                </button>
              </div>
            )}

            {data && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400 mb-3">
                  호르무즈 해협 통항 누적 · 선종별 건수 ({data.dataRange})
                </p>
                {data.stats
                  .slice()
                  .sort((a, b) => b.건수 - a.건수)
                  .map((stat) => (
                    <StatBar key={stat.선종} stat={stat} max={maxStat} />
                  ))}
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs">
                  <span className="text-slate-500">총 통항 건수</span>
                  <span className="font-bold text-slate-800">
                    {data.totalHormuzCount.toLocaleString()}건
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
            <p className="text-[10px] text-slate-400">
              출처: 해양수산부 해양안전종합정보시스템 · 공공데이터포털
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
