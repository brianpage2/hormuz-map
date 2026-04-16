"use client";

import type { Vessel } from "@/lib/ais/types";
import { COUNTRY_FLAGS, VESSEL_TYPE_COLORS } from "@/lib/utils/constants";

interface VesselPopupProps {
  vessel: Vessel;
}

export default function VesselPopup({ vessel }: VesselPopupProps) {
  const flag = COUNTRY_FLAGS[vessel.flag] ?? "🏳️";
  const typeColor = VESSEL_TYPE_COLORS[vessel.vesselTypeLabel] ?? VESSEL_TYPE_COLORS["기타"];

  return (
    <div className="min-w-[220px] text-sm">
      {/* 선박명 + 국기 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{flag}</span>
        <div>
          <p className="font-bold text-slate-900 text-base leading-tight">{vessel.name}</p>
          <p className="text-slate-500 text-xs">MMSI: {vessel.mmsi}</p>
        </div>
      </div>

      {/* 타입 뱃지 */}
      <span
        className="inline-block px-2 py-0.5 rounded text-xs font-medium mb-3"
        style={{ backgroundColor: typeColor + "33", color: typeColor, border: `1px solid ${typeColor}66` }}
      >
        {vessel.vesselTypeLabel}
      </span>

      {vessel.isKoreanRelated && (
        <div className="flex flex-wrap gap-1 mb-3">
          {vessel.isKoreanFlagged && (
            <span className="inline-flex items-center rounded border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
              한국 국적 추정
            </span>
          )}
          {vessel.isKoreanBound && (
            <span className="inline-flex items-center rounded border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
              한국행{vessel.koreanDestination ? ` · ${vessel.koreanDestination}` : ""}
            </span>
          )}
        </div>
      )}

      {/* 상세 정보 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-slate-500">속도</span>
        <span className="text-slate-900">{vessel.speed} 노트</span>

        <span className="text-slate-500">방향</span>
        <span className="text-slate-900">{vessel.course}°</span>

        <span className="text-slate-500">상태</span>
        <span className="text-slate-900">{vessel.statusLabel}</span>

        <span className="text-slate-500">목적지</span>
        <span className="text-slate-900 truncate">{vessel.destination || "—"}</span>

        <span className="text-slate-500">선체 길이</span>
        <span className="text-slate-900">{vessel.length}m</span>

        <span className="text-slate-500">흘수</span>
        <span className="text-slate-900">{vessel.draught}m</span>
      </div>

      {/* 위치 */}
      <div className="mt-2 border-t border-slate-200 pt-2 text-slate-500 text-xs">
        {vessel.lat.toFixed(4)}°N, {vessel.lng.toFixed(4)}°E
      </div>
    </div>
  );
}
