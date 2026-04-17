"use client";

import { useState, useEffect, useCallback } from "react";
import type { WeatherResponse } from "@/app/api/weather/route";

// 풍향을 화살표 회전 각도로 변환 (바람이 불어오는 방향 → 화살표 방향)
function windArrowDeg(deg: number): number {
  return (deg + 180) % 360;
}

function formatTime(iso: string): string {
  // "2026-04-15T15:45" 형태
  return iso.slice(11, 16); // "15:45"
}

export default function WeatherPanel() {
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error("API 오류");
      setData(await res.json());
    } catch {
      setError("기상 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !data && !loading) fetchData();
  }, [isOpen, data, loading, fetchData]);

  return (
    <div className="flex flex-col items-end gap-2">
      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg transition-all ${
          isOpen
            ? "bg-sky-500 text-white shadow-sky-400/30"
            : "bg-white/96 text-slate-800 border border-slate-200 hover:bg-white backdrop-blur"
        }`}
      >
        <span>🌊</span>
        <span>호르무즈 기상</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>

      {/* 패널 */}
      {isOpen && (
        <div className="w-[280px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white/96 shadow-2xl backdrop-blur overflow-hidden">
          {/* 헤더 */}
          <div className="px-4 pt-4 pb-3 border-b border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500 mb-1">
              Open-Meteo 실시간
            </p>
            <h3 className="text-sm font-semibold text-slate-900">
              호르무즈 해협 현재 기상
            </h3>
            {data && (
              <p className="text-[11px] text-slate-400 mt-0.5">
                관측 {formatTime(data.observedAt)} (현지) · 위도 26.5 / 경도 56.5
              </p>
            )}
          </div>

          {/* 콘텐츠 */}
          <div className="p-4">
            {loading && (
              <div className="py-6 text-center text-xs text-slate-400 animate-pulse">
                기상 데이터 불러오는 중...
              </div>
            )}

            {error && (
              <div className="py-4 text-center">
                <p className="text-xs text-red-500 mb-2">{error}</p>
                <button
                  type="button"
                  onClick={fetchData}
                  className="text-xs text-sky-500 underline"
                >
                  다시 시도
                </button>
              </div>
            )}

            {data && (
              <div className="space-y-3">
                {/* 날씨 + 기온 */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {data.temperature}°C
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{data.weatherLabel} · 습도 {data.humidity}%</p>
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* 풍속 / 풍향 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                    <p className="text-[10px] text-slate-400 mb-1">풍속</p>
                    <p className="text-lg font-bold text-slate-800">{data.windSpeed} <span className="text-xs font-normal">kn</span></p>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                    <p className="text-[10px] text-slate-400 mb-1">풍향</p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-base"
                        style={{ display: "inline-block", transform: `rotate(${windArrowDeg(data.windDeg)}deg)` }}
                      >
                        ↑
                      </span>
                      <p className="text-lg font-bold text-slate-800">{data.windDirection}</p>
                    </div>
                  </div>
                </div>

                {/* 파고 / 파주기 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-sky-50 border border-sky-100 p-3">
                    <p className="text-[10px] text-sky-500 mb-1">파고</p>
                    <p className="text-lg font-bold text-sky-700">{data.waveHeight} <span className="text-xs font-normal">m</span></p>
                  </div>
                  <div className="rounded-xl bg-sky-50 border border-sky-100 p-3">
                    <p className="text-[10px] text-sky-500 mb-1">파주기</p>
                    <p className="text-lg font-bold text-sky-700">{data.wavePeriod} <span className="text-xs font-normal">s</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 출처 */}
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
            <p className="text-[10px] text-slate-400">
              출처: Open-Meteo · CC BY 4.0 · 30분 간격 갱신
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
