// 호르무즈 해협 중심 좌표
export const HORMUZ_CENTER = {
  lat: 26.58,
  lng: 56.50,
} as const;

// 기본 줌 레벨
export const DEFAULT_ZOOM = 7;
export const MIN_ZOOM = 4;
export const MAX_ZOOM = 18;

// ESRI Ocean 타일 — 파란 바다 + 지형 음영 육지, 해운 지도 표준
export const MAP_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}";
// ESRI Ocean Reference 오버레이 — 지명/항만/해협 레이블 추가
export const MAP_TILE_REFERENCE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}";
export const MAP_TILE_ATTRIBUTION =
  'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

// 선박 타입 코드 → 한국어 라벨
export const VESSEL_TYPE_LABELS: Record<number, string> = {
  70: "화물선",
  71: "화물선",
  72: "화물선",
  73: "화물선",
  74: "화물선",
  75: "화물선",
  79: "화물선",
  80: "유조선",
  81: "유조선",
  82: "유조선",
  83: "유조선",
  84: "유조선",
  85: "유조선",
  89: "유조선",
  30: "어선",
  31: "예인선",
  35: "군함",
  36: "군함",
  37: "군함",
  50: "도선선",
  51: "수색구조선",
  52: "예인선",
  60: "여객선",
  69: "여객선",
  90: "특수선",
  99: "기타",
};

// 선박 타입별 색상 (teal 계열 기본, 특수 타입은 구분색)
export const VESSEL_TYPE_COLORS: Record<string, string> = {
  유조선: "#f59e0b",    // 황색 — 위험물 운반
  화물선: "#2dd4bf",    // teal — 일반 화물
  컨테이너선: "#60a5fa", // 파랑
  여객선: "#a78bfa",    // 보라
  군함: "#ef4444",      // 빨강
  어선: "#86efac",      // 연두
  기타: "#6b7280",      // 회색
};

// 국가 코드 → 국기 이모지
export const COUNTRY_FLAGS: Record<string, string> = {
  IR: "🇮🇷",
  OM: "🇴🇲",
  AE: "🇦🇪",
  SA: "🇸🇦",
  KW: "🇰🇼",
  QA: "🇶🇦",
  BH: "🇧🇭",
  KR: "🇰🇷",
  CN: "🇨🇳",
  JP: "🇯🇵",
  SG: "🇸🇬",
  PH: "🇵🇭",
  MH: "🇲🇭",
  PA: "🇵🇦",
  LR: "🇱🇷",
  BS: "🇧🇸",
};

// SWR polling 간격 (ms)
export const VESSEL_POLL_INTERVAL = 30_000;
