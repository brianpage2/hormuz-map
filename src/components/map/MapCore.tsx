"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Vessel } from "@/lib/ais/types";
import {
  HORMUZ_CENTER,
  DEFAULT_ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
  MAP_TILE_URL,
  MAP_TILE_REFERENCE_URL,
  MAP_TILE_ATTRIBUTION,
  VESSEL_TYPE_COLORS,
} from "@/lib/utils/constants";
import VesselPopup from "./VesselPopup";

// Leaflet 기본 아이콘 경로 수동 설정 (Next.js 번들링 이슈 방지)
function FixLeafletIcons() {
  const map = useMap();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, [map]);
  return null;
}

// 선박 진행 방향으로 회전된 SVG 아이콘 생성
function createVesselIcon(vessel: Vessel): L.DivIcon {
  const color = VESSEL_TYPE_COLORS[vessel.vesselTypeLabel] ?? "#6b7280";
  const rotation = vessel.heading ?? vessel.course ?? 0;
  const accent = vessel.isKoreanRelated ? "#f43f5e" : "transparent";

  // 밝은 지도 위에서 잘 보이도록: 흰 테두리 + 짙은 그림자
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"
      style="transform: rotate(${rotation}deg); transform-origin: center; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">
      <circle cx="14" cy="14" r="11" fill="none" stroke="${accent}" stroke-width="2"/>
      <circle cx="22" cy="6" r="4" fill="${accent}" stroke="white" stroke-width="1.5"/>
      <polygon points="14,2 22,24 14,19 6,24" fill="${color}" stroke="white" stroke-width="2"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "vessel-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

interface MapCoreProps {
  vessels: Vessel[];
}

export default function MapCore({ vessels }: MapCoreProps) {
  return (
    <MapContainer
      center={[HORMUZ_CENTER.lat, HORMUZ_CENTER.lng]}
      zoom={DEFAULT_ZOOM}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      className="w-full h-full"
      zoomControl={true}
    >
      <FixLeafletIcons />
      {/* ESRI Ocean 베이스 타일 — 파란 바다 + 지형 음영 육지 */}
      <TileLayer
        url={MAP_TILE_URL}
        attribution={MAP_TILE_ATTRIBUTION}
        maxZoom={MAX_ZOOM}
      />
      {/* ESRI Ocean 레퍼런스 타일 — 지명/국가명/항구 레이블 */}
      <TileLayer
        url={MAP_TILE_REFERENCE_URL}
        maxZoom={MAX_ZOOM}
        opacity={1}
      />
      {vessels.map((vessel) => (
        <Marker
          key={vessel.mmsi}
          position={[vessel.lat, vessel.lng]}
          icon={createVesselIcon(vessel)}
        >
          <Popup>
            <VesselPopup vessel={vessel} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
