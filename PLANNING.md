# 호르무즈 해협 실시간 선박 추적 지도 — 기획문서

> 최종 업데이트: 2026-04-15  
> 목표: 한국어 해운 정보 포털. 호르무즈 해협 실시간 선박 + 공공데이터를 연계해 한국에서 유일한 호르무즈 전문 정보 사이트 구축.

---

## 1. 현재 구현 현황

### 완료
| 기능 | 설명 | 상태 |
|------|------|------|
| 실시간 AIS 지도 | aisstream.io WebSocket → React-Leaflet 지도 표시 | ⚠️ 구현 완료, 현재 실수신 재검증 필요 |
| 한국 관련 선박 패널 | MMSI 기반 한국 국적 추정 + 한국행 선박 필터 | ✅ |
| 위험해역 통항보고 패널 | 해수부 공공데이터 → 호르무즈 선박 목록 + 선종별 통계 | ✅ |
| SEO 콘텐츠 페이지 | 호르무즈, 해협 정보, 에너지 안보, 해운 뉴스 등 6종 | ✅ |
| 개인정보처리방침 | AdSense 신청 필수 페이지 | ✅ |
| sitemap / robots | 자동 생성 | ✅ |

---

## 2. 데이터 소스 현황

### 현재 연결된 API

| API | 제공 기관 | 데이터 | 갱신 | 상태 |
|-----|-----------|--------|------|------|
| aisstream.io WebSocket | aisstream.io (무료) | 호르무즈+페르시아만 실시간 선박 위치 | 실시간 (~30초) | ⚠️ 구현됨, 현재 키/실수신 상태 미확정 |
| 위험해역통항보고 v1 | 해양수산부 (공공데이터포털) | 개별 선박 통항보고 (2013~2023, 17,757건) | 수시 업데이트 | ✅ 연결됨 |
| 위험해역통항보고 v3 | 해양수산부 (공공데이터포털) | 선종별 누적 통계 (호르무즈 포함) | 수시 업데이트 | ✅ 연결됨 |
| World Bank API | World Bank (무료, 인증 불필요) | 한국 에너지 수입 의존도 (EG.IMP.CONS.ZS, 15년치) | 연간 | ✅ 연결됨 |
| Open-Meteo 기상 | Open-Meteo (무료, 인증 불필요) | 호르무즈 기온·풍속·풍향·습도 | 15분 | ✅ 연결됨 |
| Open-Meteo 해양 | Open-Meteo (무료, 인증 불필요) | 호르무즈 파고·파주기·파향 | 15분 | ✅ 연결됨 |

### 탐색 중인 API (공공데이터포털)

| API 후보 | 제공 기관 | 기대 데이터 | 우선순위 | 비고 |
|----------|-----------|------------|----------|------|
| 해양안전정보 선박 위치 | 해양수산부 GICOMS | 실시간 선박 위치 (AIS 기반) | ⭐⭐⭐ | 접근 방법 탐색 필요 |
| 입출항 신고 정보 | 해양수산부 | 선박 출발·도착 정보 | ⭐⭐ | 국내 항만 한정 가능성 있음 |
| 해상 기상 정보 | 기상청 | 호르무즈 인근 기상 | ⭐⭐ | 기상청 API 신청 필요 |
| 원유 수입 현황 | 한국석유공사 | 중동 원유 수입량 추이 | ⭐⭐ | 에너지 안보 콘텐츠에 활용 |
| 해운 운임 지수 | 한국해운거래소 | BDI / BDTI 운임 지수 | ⭐ | 프리미엄 콘텐츠 소재 |

---

## 3. 실시간 선박 API 확보 전략

### 현재 상황
- **aisstream.io** (무료): 프론트 연동 구현은 되어 있음. 다만 2026-04-15 Codex 점검 기준 현재 `.env.local` 키로
  Node/Python WebSocket 테스트를 했을 때 전 세계 bbox에서도 실수신 메시지가 0건이었다.
  즉 "호르무즈에서 한국 선박이 없다" 이전에 "전체 스트림이 비어 있다"는 가능성을 먼저 봐야 한다.
- **공공데이터포털 위험해역통항보고**: 2013~2023 통항 이력 데이터 (실시간 아님).

### 실시간 데이터 확보 우선 탐색 대상

#### A. 해양수산부 GICOMS (해상교통정보서비스)
- 국내 연안 선박 실시간 AIS 제공
- 호르무즈 커버리지 불확실 → 청해부대 해역 정보 포함 가능성 탐색
- **액션**: `data.go.kr`에서 "GICOMS", "선박 위치", "AIS" 키워드 검색 후 신청

#### B. VesselFinder API (현재 보유 키 있음)
- `.env.local`에 이미 키 존재 (`VESSELFINDER_CONTAINER_API_KEY`, `VESSELFINDER_FLEET_API_KEY`)
- 컨테이너 추적 + 함대 상세정보 API → 특정 선박 모니터링 가능
- **액션**: VesselFinder API 문서 확인 후 호르무즈 해역 선박 조회 구현

#### C. MarineTraffic / AISHub 무료 티어
- MarineTraffic API: 상업용이나 무료 쿼리 제공
- AISHub: 데이터 공유 방식으로 무료 이용 가능

### 실시간 API 확보 실패 시 대안

| 대안 | 설명 |
|------|------|
| 현재 aisstream.io 유지 | 코드 기반은 유지하되 키 상태 확인 또는 서버 프록시 전환 전까지는 데이터 안정성을 확정하지 않음 |
| 위험해역 통항보고 이력 시각화 | 공공데이터로 "최근 X일 이내 통항 선박" 타임라인 표시 |
| 원유 수송 스케줄 추정 | 산유국 수출 스케줄 + 항해 일수로 예상 선박 도착일 계산 |
| 주요 선사 선대 정보 | 현대글로비스, SK해운, 한국해운 등 선대 정보 스크래핑 |

---

## 4. 다음 개발 우선순위

### Phase 3-A: 추가 공공데이터 연계 (진행 중)
- [ ] AISStream 키 상태 재확인 또는 서버 프록시(`/api/vessels`) 전환
- [ ] VesselFinder API 연동 (`.env.local`에 키 이미 있음) → 특정 한국 선박 실시간 추적
- [ ] 기상청 해상 기상 API 연동 → 호르무즈 해역 기상 표시
- [ ] 한국석유공사 원유 수입 통계 API 탐색

### Phase 3-B: 지도 고도화
- [ ] 위험해역 통항보고 → 지도 위 호르무즈 해협 영역에 누적 통항 횟수 오버레이
- [ ] 통항보고 선박 클릭 시 AIS 실시간 위치 연동 (IMO 번호 기반)
- [ ] 선박 마커 클러스터링 (밀집 구역 성능 개선)

### Phase 3-C: 콘텐츠 확장
- [ ] 뉴스 페이지 MDX 기사 추가 (주 1~2건)
- [ ] 원유 수입 통계 차트 페이지 `/에너지-안보` 강화
- [ ] 호르무즈 통항 선박 실시간 카운터 홈페이지 추가

### Phase 4: AdSense 수익화
- [ ] 콘텐츠 페이지 10개 이상 완성 후 AdSense 신청
- [ ] AdSenseUnit 컴포넌트 구현 (CLS 방지 min-height 필수)
- [ ] Core Web Vitals 최적화 (LCP < 2.5s)

---

## 5. 환경 변수 목록

| 변수명 | 용도 | 위치 |
|--------|------|------|
| `NEXT_PUBLIC_AISSTREAM_API_KEY` | aisstream.io WebSocket 실시간 AIS | .env.local |
| `TRANSIT_REPORT_API_KEY` | 해수부 위험해역통항보고 API | .env.local |
| `VESSELFINDER_CONTAINER_API_KEY` | VesselFinder 컨테이너 추적 | .env.local |
| `VESSELFINDER_FLEET_API_KEY` | VesselFinder 함대 정보 | .env.local |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense | .env.local (미설정) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | .env.local (미설정) |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | .env.local |

---

## 6. 기술 스택 및 아키텍처

```
사용자 브라우저
  │
  ├── React-Leaflet 지도 (Client Component)
  │     └── aisstream.io WebSocket 직접 연결
  │
  ├── Korea Watch 패널 (Client, MMSI 필터링)
  │
  └── 위험해역 통항보고 패널 (Client → Server API Route)
        └── /api/transit-report → 해수부 공공데이터포털

Next.js 서버 (Vercel icn1 서울)
  ├── /api/transit-report (1시간 캐시)
  ├── /api/vessels (계획, AIS 서버 프록시 후보)
  └── SEO 페이지들 (force-dynamic, SSR)
```

---

## 7. 공공데이터포털 신청 현황

| 서비스 | 신청 일자 | 상태 | API 키 |
|--------|-----------|------|--------|
| 해양수산부_위험해역통항보고 | 2026-04-15 | ✅ 승인 | TRANSIT_REPORT_API_KEY |
| (추가 예정) 기상청 해상 기상 | - | 미신청 | - |
| (추가 예정) 한국석유공사 원유 | - | 미신청 | - |
