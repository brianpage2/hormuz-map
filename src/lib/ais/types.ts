export interface Vessel {
  mmsi: string;           // Maritime Mobile Service Identity
  name: string;           // 선박명
  flag: string;           // 국가 코드 (ISO 3166-1 alpha-2)
  vesselType: number;     // AIS 선박 타입 코드
  vesselTypeLabel: string; // 한국어 타입명
  lat: number;            // 위도
  lng: number;            // 경도
  speed: number;          // 속도 (노트)
  course: number;         // 진행 방향 (도, 0-360)
  heading: number;        // 선수 방향 (도, 0-360)
  status: number;         // AIS 항해 상태 코드
  statusLabel: string;    // 한국어 상태명
  destination: string;    // 목적지
  draught: number;        // 흘수 (미터)
  length: number;         // 선체 길이 (미터)
  timestamp: string;      // 마지막 업데이트 (ISO 8601)
  isKoreanFlagged?: boolean; // MMSI 기준 한국 국적 추정
  isKoreanBound?: boolean;   // 목적지가 한국 항만인지 여부
  isKoreanRelated?: boolean; // 한국 국적 추정 또는 한국 항만 목적지
  koreanDestination?: string; // 매칭된 한국 항만명
}

export interface VesselApiResponse {
  vessels: Vessel[];
  updatedAt: string;
  total: number;
}
