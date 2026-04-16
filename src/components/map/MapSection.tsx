"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAISStream } from "@/hooks/useAISStream";
import MapContainer from "./MapContainer";
import TransitReportPanel from "./TransitReportPanel";
import EnergyStatsPanel from "./EnergyStatsPanel";
import WeatherPanel from "./WeatherPanel";
import WorldPortsPanel from "./WorldPortsPanel";

const STATUS_LABELS = {
  connecting: { dot: "bg-yellow-400 animate-pulse", text: "연결 중..." },
  connected: { dot: "bg-green-400 animate-pulse", text: "실시간 연결" },
  disconnected: { dot: "bg-gray-400", text: "재연결 중..." },
  error: { dot: "bg-red-400", text: "연결 오류" },
} as const;

export default function MapSection() {
  const { vessels, total, status, lastMessageAt } = useAISStream();
  const [showKoreanOnly, setShowKoreanOnly] = useState(false);
  const COUNTDOWN_FROM = 30;
  const [waitingSecs, setWaitingSecs] = useState(COUNTDOWN_FROM);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const s = STATUS_LABELS[status];

  const koreanRelatedVessels = useMemo(
    () => vessels.filter((vessel) => vessel.isKoreanRelated),
    [vessels]
  );
  const koreanFlaggedCount = useMemo(
    () => koreanRelatedVessels.filter((vessel) => vessel.isKoreanFlagged).length,
    [koreanRelatedVessels]
  );
  const koreanBoundCount = useMemo(
    () => koreanRelatedVessels.filter((vessel) => vessel.isKoreanBound).length,
    [koreanRelatedVessels]
  );
  const visibleVessels = showKoreanOnly ? koreanRelatedVessels : vessels;
  const featuredVessels = useMemo(
    () =>
      koreanRelatedVessels
        .slice()
        .sort((left, right) => right.speed - left.speed)
        .slice(0, 6),
    [koreanRelatedVessels]
  );
  useEffect(() => {
    if (featuredVessels.length === 0) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => setWaitingSecs((n) => (n <= 1 ? COUNTDOWN_FROM : n - 1)), 1000);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setWaitingSecs(COUNTDOWN_FROM);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [featuredVessels.length]);

  const lastMessageLabel = useMemo(() => {
    if (!lastMessageAt) {
      return "";
    }

    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(lastMessageAt));
  }, [lastMessageAt]);
  const emptyStateMessage = useMemo(() => {
    if (total === 0) {
      if (status === "error") {
        return "AISStream 연결 또는 인증에 문제가 있어 선박 데이터를 받지 못하고 있습니다.";
      }

      if (status === "connected") {
        return "현재 AISStream 연결은 열려 있지만 선박 데이터가 들어오지 않고 있습니다. 한국 선박이 없는 것이 아니라 전체 스트림이 비어 있는 상태일 수 있습니다.";
      }

      return "실시간 선박 데이터를 기다리는 중입니다.";
    }

    return "현재 스트림에서 한국 관련 선박이 아직 잡히지 않았습니다.";
  }, [status, total]);

  return (
    <div className="relative h-full w-full">
      <MapContainer vessels={visibleVessels} />
      <div className="absolute right-4 top-4 z-[1000] flex flex-col items-end gap-2">
        <WeatherPanel />
        <TransitReportPanel />
        <WorldPortsPanel />
        <EnergyStatsPanel />
      </div>

      <div className="absolute left-4 top-4 z-[1000] w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-300 bg-white/96 p-4 shadow-2xl backdrop-blur">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-700">
              Korea Watch
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              호르무즈의 한국 관련 선박
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              MMSI 기준 한국 국적 추정과 한국 항만 목적지를 함께 표시합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowKoreanOnly((current) => !current)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              showKoreanOnly
                ? "bg-rose-600 text-white shadow-lg shadow-rose-500/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {showKoreanOnly ? "전체 보기" : "한국 관련만 보기"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] text-slate-500">한국 관련</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {koreanRelatedVessels.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] text-slate-500">국적 추정</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {koreanFlaggedCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] text-slate-500">한국행</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {koreanBoundCount}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-700">지금 잡히는 선박</p>
            <div className="text-right">
              <p className="text-[11px] text-slate-500">
                {showKoreanOnly ? `${visibleVessels.length}척 표시` : `전체 ${total}척`}
              </p>
              {lastMessageLabel && (
                <p className="text-[10px] text-slate-400">마지막 수신 {lastMessageLabel}</p>
              )}
            </div>
          </div>

          {featuredVessels.length > 0 ? (
            <div className="space-y-2">
              {featuredVessels.map((vessel) => (
                <div
                  key={vessel.mmsi}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {vessel.name}
                      </p>
                      <p className="truncate text-[11px] text-slate-600">
                        {vessel.vesselTypeLabel} · {vessel.destination || "목적지 미상"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-rose-700">
                        {vessel.speed.toFixed(1)} kn
                      </p>
                      <p className="text-[11px] text-slate-500">MMSI {vessel.mmsi}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {vessel.isKoreanFlagged && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] text-rose-700">
                        한국 국적 추정
                      </span>
                    )}
                    {vessel.isKoreanBound && (
                      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] text-sky-700">
                        한국행{vessel.koreanDestination ? ` · ${vessel.koreanDestination}` : ""}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-500">
                {emptyStateMessage}
              </div>
              {/* 대기 타이머 */}
              <div className="rounded-xl bg-rose-50 border border-rose-200 px-3 py-2.5 flex items-center gap-3">
                <div className="text-center">
                  <p className="text-3xl font-black text-red-600 leading-none tabular-nums">
                    {String(waitingSecs).padStart(2, "0")}
                  </p>
                  <p className="text-[10px] text-red-400 mt-0.5">초 후 재시도</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-600 leading-snug">
                    실시간 선박 데이터를<br />수신 대기 중입니다.
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] text-red-500 font-medium">LIVE 연결 중</span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-semibold text-rose-600 px-1">외부 서비스에서 전세계 선박 실시간 확인</p>
              <div className="grid grid-cols-2 gap-2">
                {/* MarineTraffic 프리뷰 카드 */}
                <a
                  href="https://www.marinetraffic.com/en/ais/home/centerx:56/centery:26/zoom:8"
                  className="group rounded-xl overflow-hidden border border-slate-200 shadow-sm transition hover:shadow-md hover:border-blue-300"
                >
                  {/* 미니 지도 프리뷰 */}
                  <div className="relative h-20 bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0d2d4a] overflow-hidden">
                    {/* 육지 실루엣 */}
                    <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#2d4a2a] opacity-70 rounded-t-sm" />
                    <div className="absolute bottom-3 left-4 w-8 h-3 bg-[#2d4a2a] opacity-60 rounded-sm" />
                    {/* 선박 도트들 */}
                    <div className="absolute top-3 left-6 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                    <div className="absolute top-5 left-12 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                    <div className="absolute top-2 right-6 w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_4px_#fde047]" />
                    <div className="absolute top-7 right-10 w-1 h-1 rounded-full bg-emerald-300 opacity-80" />
                    <div className="absolute top-4 left-1/2 w-1 h-1 rounded-full bg-blue-300 opacity-70" />
                    {/* 격자선 */}
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                    {/* 오버레이 배지 */}
                    <div className="absolute top-1.5 right-1.5 rounded bg-blue-600/80 px-1.5 py-0.5 text-[9px] font-bold text-white">LIVE</div>
                  </div>
                  {/* 카드 하단 */}
                  <div className="bg-white px-2.5 py-2">
                    <p className="text-[11px] font-bold text-slate-800">MarineTraffic</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 group-hover:text-blue-600 transition-colors">전세계 선박 보기 →</p>
                  </div>
                </a>

                {/* VesselFinder 프리뷰 카드 */}
                <a
                  href="https://www.vesselfinder.com/?lat=26&lng=56&zoom=8"
                  className="group rounded-xl overflow-hidden border border-slate-200 shadow-sm transition hover:shadow-md hover:border-sky-300"
                >
                  {/* 미니 지도 프리뷰 */}
                  <div className="relative h-20 bg-gradient-to-br from-[#0f3460] via-[#16537e] to-[#0a2744] overflow-hidden">
                    {/* 육지 실루엣 */}
                    <div className="absolute bottom-0 right-0 w-10 h-6 bg-[#3a5a2a] opacity-65 rounded-tl-md" />
                    <div className="absolute bottom-0 left-0 w-6 h-4 bg-[#3a5a2a] opacity-60 rounded-tr-sm" />
                    {/* 선박 도트들 */}
                    <div className="absolute top-4 left-8 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
                    <div className="absolute top-2 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
                    <div className="absolute top-6 right-8 w-1.5 h-1.5 rounded-full bg-orange-300 shadow-[0_0_4px_#fdba74]" />
                    <div className="absolute top-3 right-4 w-1 h-1 rounded-full bg-cyan-300 opacity-80" />
                    <div className="absolute top-8 left-4 w-1 h-1 rounded-full bg-white opacity-50" />
                    {/* 격자선 */}
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                    {/* 오버레이 배지 */}
                    <div className="absolute top-1.5 right-1.5 rounded bg-sky-600/80 px-1.5 py-0.5 text-[9px] font-bold text-white">AIS</div>
                  </div>
                  {/* 카드 하단 */}
                  <div className="bg-white px-2.5 py-2">
                    <p className="text-[11px] font-bold text-slate-800">VesselFinder</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 group-hover:text-sky-600 transition-colors">전세계 선박 보기 →</p>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-4 z-[1000] rounded-lg border border-slate-300 bg-white/96 px-3 py-2 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
          <p className="text-xs text-slate-700">
            <span className="mr-1 text-slate-500">{s.text}</span>
            선박 <span className="font-bold text-emerald-700">{visibleVessels.length}</span>척
            {showKoreanOnly ? " 표시 중" : " 추적 중"}
          </p>
        </div>
      </div>
    </div>
  );
}
