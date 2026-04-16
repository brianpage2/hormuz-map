# 호르무즈 해협 실시간 선박 추적 지도

## ⚠️ 데이터 표시 원칙 (절대 규칙)

**패널·UI에 표시하는 모든 수치·통계는 반드시 공공데이터 API 또는 공식 API에서 직접 가져온 값이어야 한다.**

- 절대 금지: 수치를 직접 작성하거나 추정값을 "약 XX%" 형태로 하드코딩하는 것
- 절대 금지: API 응답에 없는 파생 통계를 임의로 계산해 사실인 것처럼 표시하는 것
- 허용: API 응답값을 그대로 표시하거나, API 값에서 직접 산술 계산한 값 (예: `100 - 수입의존도 = 자급률`)
- API에서 데이터를 못 가져오면 해당 항목을 표시하지 않는다

위반 시 사용자 신뢰를 잃는다. 데이터 출처가 불확실하면 표시하지 않는다.

---

## ⚠️ Claude Code ↔ Codex 협업 규칙 (필수)

이 프로젝트는 **Claude Code**와 **Codex** 양쪽에서 동시에 기능을 추가할 수 있다.
충돌을 방지하기 위해 기능 추가 전 반드시 아래 절차를 따른다.

### 규칙
1. **작업 시작 전 확인**: 새 기능/파일을 추가하기 전에 `CODEX.md`(Codex 측)와 `CLAUDE.md`(Claude Code 측) 양쪽을 읽고, 동일하거나 겹치는 작업이 이미 진행 중인지 확인한다.
2. **주도권 명시**: 어떤 기능을 누가 주도하는지 PLANNING.md 또는 각 md 파일에 명시한다. 예: `[Claude Code 주도]`, `[Codex 주도]`.
3. **기존 작업 덮어쓰기 금지**: 상대 쪽이 만든 파일/패널/컴포넌트를 허락 없이 수정하거나 덮어쓰지 않는다.
4. **완료 후 기록**: 작업이 끝나면 해당 md 파일에 결과를 업데이트하여 상대 쪽이 현재 상태를 파악할 수 있게 한다.

---

## 프로젝트 목표

- 한국어 해운 지도 사이트 (레퍼런스: https://marinetraffic.live/)
- "호르무즈" 키워드 SEO 최적화로 한국 트래픽 유입
- 기존 AdSense 승인 도메인의 **하위도메인** 연결로 수익 창출
- GitHub → Vercel 자동 배포

---

## 확정된 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| Framework | **Next.js 16 App Router (TypeScript)** | SSR/ISR SEO 최적, Vercel 무설정 배포 |
| Map 라이브러리 | **React-Leaflet 4** | SSR 비활성화 필수 (`dynamic + ssr:false`) |
| 지도 타일 | **ESRI Ocean Basemap** | 파란 바다 + 지형 음영 육지, 무료 |
| 한국어 지명 | **KoreanLabels.tsx (커스텀 오버레이)** | 호르무즈/페르시아만/주요 항구 한국어 표기 |
| AIS 실시간 데이터 | **aisstream.io WebSocket** (무료) | 실시간 선박 위치 스트리밍 구현, 현재 실수신 상태 재검증 필요 |
| Styling | **Tailwind CSS v3** | 다크 테마 기본 |
| Font | **Noto Sans KR** (Google Fonts) | 한국어 렌더링 최적화 |
| 상태관리 | **useAISStream hook (WebSocket)** | 실시간 스트리밍 |
| 배포 | **Vercel icn1 (서울)** | 한국 사용자 TTFB 최소화 |
| SEO | **next-sitemap + generateMetadata** | Next.js 네이티브 |
| 뉴스 콘텐츠 | **MDX** | `content/news/*.mdx` 파일로 관리 |

---

## 환경 변수 (.env.local — .gitignore됨, 절대 커밋 금지)

```
# aisstream.io 실시간 AIS WebSocket (무료, https://aisstream.io/)
NEXT_PUBLIC_AISSTREAM_API_KEY=<.env.local 참조>

# Google 서비스
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 사이트 URL (Vercel 배포 후 실제 도메인으로 교체)
NEXT_PUBLIC_SITE_URL=https://map.yourdomain.com

# ISR 재검증 웹훅
REVALIDATION_SECRET=
```

---

## 핵심 개발 원칙

### Leaflet 필수 패턴
```typescript
// MapContainer는 반드시 dynamic import + ssr: false
// Leaflet은 window 객체를 사용하므로 SSR에서 실행하면 에러
const MapCore = dynamic(() => import('./MapCore'), { ssr: false })
```

### reactStrictMode 비활성화
```typescript
// next.config.ts — React Strict Mode의 이중 마운트가 Leaflet과 충돌
const nextConfig = { reactStrictMode: false }
```

### AdSense + Core Web Vitals 보호
- 광고 슬롯에 반드시 `min-height` 명시 → CLS 방지
- AdSense 스크립트: `strategy="afterInteractive"` → LCP 차단 방지
- 지도 컨트롤에서 **150px 이상** 떨어진 위치에만 광고 배치
- `IntersectionObserver`로 광고 지연 로딩

### SEO 필수
- 모든 콘텐츠 페이지는 Server Component (SSR/ISR)
- 각 페이지 고유한 `generateMetadata()` 적용
- JSON-LD 스키마 (Article, FAQPage, WebSite) 포함
- 한국어 URL 슬러그 사용 (`/호르무즈`, `/실시간-선박-추적`)

---

## 주요 파일 구조

```
src/
├── app/
│   ├── layout.tsx                  ← lang="ko", Noto Sans KR, 기본 메타데이터
│   ├── page.tsx                    ← 홈 (지도 + SSR 한국어 콘텐츠)
│   ├── globals.css                 ← Leaflet 오버라이드 + 한국어 레이블 CSS
│   ├── sitemap.ts / robots.ts      ← 자동 생성
│   ├── 호르무즈/page.tsx           ← 핵심 SEO 페이지 (2,000자+) ← 미완성
│   ├── 호르무즈-해협/page.tsx      ← 미완성
│   ├── 실시간-선박-추적/page.tsx   ← 미완성
│   ├── 에너지-안보/page.tsx        ← 미완성
│   ├── 해운-뉴스/                  ← 미완성
│   ├── 개인정보처리방침/page.tsx   ← AdSense 필수 (미완성)
│   ├── api/vessels/route.ts        ← 선박 데이터 API (계획, 현재 미구현)
│   └── api/world-ports/route.ts    ← 세계 주요 항만 연락처 API 프록시
├── components/
│   ├── map/
│   │   ├── MapContainer.tsx        ← dynamic() SSR 비활성화 래퍼
│   │   ├── MapCore.tsx             ← Leaflet 맵 + ESRI Ocean 타일
│   │   ├── MapSection.tsx          ← useAISStream 연결, 상태 표시
│   │   ├── VesselPopup.tsx         ← 선박 클릭 시 한국어 팝업
│   │   ├── KoreanLabels.tsx        ← 한국어 지명 오버레이 (줌 연동)
│   │   └── WorldPortsPanel.tsx     ← 세계 주요 항만 연락처 검색 패널
│   └── layout/
│       ├── Header.tsx              ← 한국어 네비게이션
│       └── Footer.tsx              ← 저작권, 링크
├── lib/
│   ├── ais/
│   │   ├── types.ts                ← Vessel, VesselApiResponse 타입
│   │   └── aisstream.ts            ← aisstream.io WebSocket 파서
│   └── utils/
│       └── constants.ts            ← 호르무즈 좌표, 타일 URL, 색상
└── hooks/
    └── useAISStream.ts             ← aisstream.io WebSocket 실시간
```

---

## AIS 데이터 소스

| 항목 | 내용 |
|------|------|
| 서비스 | [aisstream.io](https://aisstream.io/) |
| GitHub | [github.com/aisstream/example](https://github.com/aisstream/example) |
| 가격 | 무료 |
| 방식 | WebSocket `wss://stream.aisstream.io/v0/stream` |
| 구독 영역 | 호르무즈+페르시아만 바운딩 박스 `[[22.0, 50.0], [29.0, 62.0]]` |
| API 키 없을 때 | 연결 오류 상태 표시 |

> 2026-04-15 점검 메모: Codex 기준 현재 `.env.local`의 AISStream 키로 Node/Python WebSocket 테스트를 했을 때
> 전 세계 bbox에서도 실수신 메시지가 0건이었다. 즉 "한국 선박이 안 잡힌다" 이전에
> "전체 AIS 스트림이 비어 있다"는 가능성을 먼저 봐야 한다.
> 브라우저 직접 연결도 장기적으로는 비권장이고 서버 프록시(`/api/vessels`) 전환이 필요하다.

---

## 개발 진행 상황

### Phase 1 완료 (지도 기능)
- [x] Next.js 16 프로젝트 초기화
- [x] React-Leaflet + ESRI Ocean 타일
- [x] 한국어 지명 오버레이 (KoreanLabels)
- [x] aisstream.io WebSocket 연동 구현
- [x] 한국어 헤더/푸터
- [x] vercel.json (icn1 서울 리전)
- [x] next-sitemap 자동 생성

현재 주의:
- AISStream 연결 코드는 있으나 실제 수신 상태는 2026-04-15 기준 재검증이 필요함
- `Korea Watch`가 0으로 보이면 한국 선박이 없는 것보다 전체 스트림이 비어 있는 상태일 수 있음
- 다음 우선 작업은 `서버 프록시(/api/vessels)` 전환 또는 AISStream 키/권한 재확인
- `세계 주요 항만` 패널이 추가되었고, 실제 운영 키는 `UPA_WORLD_PORTS_API_KEY`로 연결해야 함

### Phase 2 (한국어 SEO 콘텐츠) — 다음 단계
- [ ] `/호르무즈` 핵심 SEO 페이지 (2,000자+, FAQ, JSON-LD)
- [ ] `/호르무즈-해협` 정보 페이지
- [ ] `/실시간-선박-추적` 기능 소개 페이지
- [ ] `/에너지-안보` 정보 페이지
- [ ] `/해운-뉴스` + MDX 기사 3개 이상
- [ ] `/개인정보처리방침` (AdSense 필수)
- [ ] Google Search Console 제출

### Phase 3 (AdSense)
- [ ] AdSense 신청 (콘텐츠 10페이지+ 완료 후)
- [ ] AdSenseUnit 컴포넌트 (CLS 방지)
- [ ] 광고 배치

### Phase 4 (최적화)
- [ ] Core Web Vitals LCP < 2.5s
- [ ] 선박 마커 클러스터링
- [ ] Lighthouse CI

---

## 배포 설정

- **GitHub 저장소명**: `hormuz-map`
- **브랜치 전략**: `main` → Vercel 프로덕션 자동 배포
- **도메인**: 기존 AdSense 승인 도메인의 하위도메인 연결 예정
- **Vercel 리전**: `icn1` (서울)

---

## 타겟 키워드

- **Tier 1**: 호르무즈, 호르무즈 해협, 호르무즈 해협 지도
- **Tier 2**: 실시간 선박 추적, 선박 위치 추적, AIS 선박 추적, 유조선 위치
- **Tier 3**: 호르무즈 해협 봉쇄, 중동 해운, 한국 에너지 안보, 원유 운송 선박
