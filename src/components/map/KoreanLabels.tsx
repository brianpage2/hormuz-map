"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// 호르무즈 해협 주변 주요 지명 — 한국어
const KOREAN_PLACE_LABELS = [
  // 해협/만 이름
  { lat: 26.58, lng: 56.35, text: "호르무즈 해협", type: "strait", zoom: 6 },
  { lat: 27.5,  lng: 52.0,  text: "페르시아만", type: "sea", zoom: 5 },
  { lat: 23.5,  lng: 58.5,  text: "오만만", type: "sea", zoom: 5 },
  { lat: 24.0,  lng: 53.5,  text: "아라비아해", type: "sea", zoom: 4 },

  // 주요 항구/도시
  { lat: 27.18, lng: 56.27, text: "반다르아바스", type: "port", zoom: 7 },
  { lat: 25.20, lng: 55.27, text: "두바이", type: "city", zoom: 7 },
  { lat: 24.47, lng: 54.37, text: "아부다비", type: "city", zoom: 7 },
  { lat: 23.58, lng: 58.41, text: "무스카트", type: "city", zoom: 7 },
  { lat: 29.37, lng: 48.00, text: "쿠웨이트", type: "city", zoom: 7 },
  { lat: 26.21, lng: 50.59, text: "바레인", type: "city", zoom: 7 },
  { lat: 25.28, lng: 51.32, text: "도하", type: "city", zoom: 7 },
  { lat: 27.98, lng: 50.32, text: "담맘", type: "city", zoom: 7 },
  { lat: 26.92, lng: 49.62, text: "라스타누라", type: "port", zoom: 8 },

  // 국가명
  { lat: 32.0,  lng: 53.0,  text: "이란", type: "country", zoom: 5 },
  { lat: 23.0,  lng: 57.5,  text: "오만", type: "country", zoom: 5 },
  { lat: 24.0,  lng: 45.0,  text: "사우디아라비아", type: "country", zoom: 4 },
  { lat: 25.2,  lng: 55.3,  text: "UAE", type: "country", zoom: 6 },

  // 섬
  { lat: 26.54, lng: 55.03, text: "케샴섬", type: "island", zoom: 8 },
  { lat: 26.08, lng: 54.62, text: "라르크섬", type: "island", zoom: 9 },
];

const TYPE_STYLES: Record<string, { bg: string; text: string; size: string; border: string }> = {
  strait:  { bg: "rgba(255,255,255,0.88)", text: "#0c4a6e", size: "13px", border: "#0284c7" },
  sea:     { bg: "rgba(255,255,255,0.0)",  text: "#1e3a5f", size: "12px", border: "transparent" },
  port:    { bg: "rgba(255,255,255,0.82)", text: "#1e293b", size: "11px", border: "#94a3b8" },
  city:    { bg: "rgba(255,255,255,0.82)", text: "#1e293b", size: "11px", border: "#94a3b8" },
  country: { bg: "rgba(255,255,255,0.0)",  text: "#374151", size: "12px", border: "transparent" },
  island:  { bg: "rgba(255,255,255,0.78)", text: "#164e63", size: "10px", border: "#7dd3fc" },
};

function createLabelIcon(text: string, type: string) {
  const s = TYPE_STYLES[type] ?? TYPE_STYLES.city;
  const html = `
    <div style="
      background: ${s.bg};
      color: ${s.text};
      font-size: ${s.size};
      font-weight: ${type === "strait" || type === "country" ? "700" : "500"};
      font-family: 'Noto Sans KR', sans-serif;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid ${s.border};
      white-space: nowrap;
      pointer-events: none;
      letter-spacing: -0.3px;
      text-shadow: 0 1px 2px rgba(255,255,255,0.8);
      backdrop-filter: blur(2px);
    ">${text}</div>
  `;
  return L.divIcon({ html, className: "korean-label-wrapper", iconAnchor: [0, 0] });
}

export default function KoreanLabels() {
  const map = useMap();

  useEffect(() => {
    const markers: L.Marker[] = [];

    function updateLabels() {
      const zoom = map.getZoom();
      markers.forEach((m) => map.removeLayer(m));
      markers.length = 0;

      KOREAN_PLACE_LABELS.forEach((place) => {
        if (zoom >= place.zoom) {
          const marker = L.marker([place.lat, place.lng], {
            icon: createLabelIcon(place.text, place.type),
            interactive: false,
            zIndexOffset: -100,
          });
          marker.addTo(map);
          markers.push(marker);
        }
      });
    }

    updateLabels();
    map.on("zoomend", updateLabels);

    return () => {
      map.off("zoomend", updateLabels);
      markers.forEach((m) => map.removeLayer(m));
    };
  }, [map]);

  return null;
}
