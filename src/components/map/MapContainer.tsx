"use client";

import dynamic from "next/dynamic";
import type { Vessel } from "@/lib/ais/types";

// Leaflet은 window 객체가 필요하므로 SSR 비활성화 필수
const MapCore = dynamic(() => import("./MapCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-400 text-sm">지도 로딩 중...</p>
      </div>
    </div>
  ),
});

interface MapContainerProps {
  vessels: Vessel[];
}

export default function MapContainer({ vessels }: MapContainerProps) {
  return <MapCore vessels={vessels} />;
}
