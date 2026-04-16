# AIS 데이터 소스 및 API 키 관리

## 1. aisstream.io (현재 사용 중)

| 항목 | 내용 |
|------|------|
| 사이트 | https://aisstream.io |
| 대시보드 | https://aisstream.io/apikeys |
| 방식 | WebSocket |
| 엔드포인트 | `wss://stream.aisstream.io/v0/stream` |
| 가격 | 무료 |
| 글로벌 커버리지 | O |
| 실시간 | O |
| API 키 | `c5485688119e820a9d95ebd2d8bd1c0e6ba331e0` |
| 발급일 | 2026-04-13 |
| 상태 | 연결은 되나 호르무즈 지역 데이터 수신 안 됨 (무료 티어 제한 추정) |

### 구독 메시지 형식
```json
{
  "APIKey": "c5485688119e820a9d95ebd2d8bd1c0e6ba331e0",
  "BoundingBoxes": [[[22.0, 50.0], [29.0, 62.0]]]
}
```

### 바운딩 박스 (호르무즈+페르시아만)
- 남서: 위도 22.0, 경도 50.0
- 북동: 위도 29.0, 경도 62.0

---

## 2. AISHub.net (사용 불가)

| 항목 | 내용 |
|------|------|
| 사이트 | https://www.aishub.net |
| API 문서 | https://www.aishub.net/api |
| 방식 | REST (HTTP GET) |
| 엔드포인트 | `https://data.aishub.net/ws.php` |
| 가격 | 무료 (조건부) |
| **조건** | **자체 AIS 수신 장비 운영 필수 → 사용 불가** |
| API 키 | 없음 |

---

## 3. 추후 시도할 소스 목록

| 소스 | URL | 방식 | 비고 |
|------|-----|------|------|
| MarineTraffic | https://www.marinetraffic.com/en/p/api-services | REST | 유료 |
| VesselFinder | https://www.vesselfinder.com/api | REST | 유료 |
| myshiptracking | https://www.myshiptracking.com | - | 조사 필요 |
| FleetMon | https://www.fleetmon.com/services/apis | REST | 조사 필요 |
