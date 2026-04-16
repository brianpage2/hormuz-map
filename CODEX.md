# CODEX Session Context

이 문서는 Codex 세션에서 확정한 내용, 조사 결과, 구현 상태, 다음 작업 포인트를 저장한다.
목적은 다음 세션에서 이 파일만 읽고 바로 작업을 재개할 수 있게 하는 것이다.

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
1. **작업 시작 전 확인**: 새 기능/파일을 추가하기 전에 `CLAUDE.md`(Claude Code 측)와 `CODEX.md`(Codex 측) 양쪽을 읽고, 동일하거나 겹치는 작업이 이미 진행 중인지 확인한다.
2. **주도권 명시**: 어떤 기능을 누가 주도하는지 PLANNING.md 또는 각 md 파일에 명시한다. 예: `[Claude Code 주도]`, `[Codex 주도]`.
3. **기존 작업 덮어쓰기 금지**: 상대 쪽이 만든 파일/패널/컴포넌트를 허락 없이 수정하거나 덮어쓰지 않는다.
4. **완료 후 기록**: 작업이 끝나면 해당 md 파일에 결과를 업데이트하여 상대 쪽이 현재 상태를 파악할 수 있게 한다.

작성 기준일: 2026-04-14
작업 위치: `d:\Claude-code\지도맵(호르무즈)`
병행 작업 주의: 현재 이 프로젝트는 Claude Code와 Codex가 동시에 만질 수 있으므로, 기존 파일을 되돌리기보다 현재 상태를 기준으로 누적 수정해야 한다.

## 1. 프로젝트 목표

- 한국어 기반 `호르무즈 해협 선박 지도` 사이트 구축
- 목표는 정밀 해운 운영 시스템이 아니라 `한국 트래픽 유입용 정보형 지도/콘텐츠 사이트`
- 기존 AdSense 승인 도메인의 `하위도메인`에 붙일 가능성이 높음
- 검색 유입을 위해 `호르무즈 + 한국 영향 + 한국 관련 선박` 조합이 중요함

## 2. 사용자 의도와 비즈니스 방향

- 사용자는 `트래픽 확보`가 우선 목표라고 명시했다
- AdSense 계정 자체는 이미 있으므로, 추가 승인 전략보다 `유입될 주제 선정`이 중요하다
- 따라서 사이트는 단순 지도보다 다음 구조가 유리하다
  - 메인: 호르무즈 실시간/준실시간 선박 지도
  - 부가: 한국 관련 선박 필터
  - 부가: 한국 항만/한국행 선박 중심 콘텐츠
  - 부가: 호르무즈가 한국 에너지/물류에 미치는 영향 설명형 페이지

## 3. 데이터 소스 조사 결과

### 3.1 무료/제한적 후보

- `AISStream`
  - 현재 가장 현실적인 무료 MVP 후보
  - WebSocket 기반
  - 공식 문서와 GitHub 예제 존재
  - 장점: 바운딩 박스 구독 가능
  - 한계: 베타, SLA 없음, 브라우저 직접 연결 권장하지 않음

- `AISHub`
  - 조건부 무료
  - 사실상 `자체 AIS raw feed 기여자`에게 유리함
  - 공개 무료로 바로 붙이는 용도는 불확실함

- `Global Fishing Watch`
  - 공공/연구 목적 API
  - 비실시간 분석/존재 확인 쪽
  - 실시간 선박 지도 1차 데이터 소스로는 부적합

### 3.2 상용 후보

- `MarineTraffic`
  - 웹 구독 플랜과 API가 분리되어 있음
  - `Basic/Essential/Enterprise` 웹 플랜을 사도 API 자동 포함 아님
  - API는 별도 계약/영업 문의형

- `VesselFinder`
  - API 제공은 맞음
  - 다만 웹 플랜과 API가 분리되어 있음
  - `호르무즈 전체 영역 선박 지도`에 필요한 것은 `LiveData / Vessels in Custom Area API`
  - 이건 credit 기반 일반 API가 아니라 `subscription basis`에 가까운 별도 상품

### 3.3 중요한 결론

- `선박지도 구축 자체`는 어렵지 않다
- 진짜 어려운 부분은 `무료로 안정적인 AIS 데이터를 확보하는 것`
- 따라서 현재 가장 현실적인 전략은 다음 둘 중 하나다
  - MVP: `AISStream`
  - 운영형: `VesselFinder LiveData` 또는 `MarineTraffic API`

## 4. VesselFinder 관련 확정 사항

### 4.1 웹 플랜과 API는 다르다

- 사용자가 본 `무료 / 기본 / 프리미엄 / 위성` 화면은 `웹사이트 사용 플랜`
- 이 플랜을 결제한다고 `AIS API`가 자동 제공되는 것은 아님
- `Container Tracking`은 별도 상품이며, Container API는 그 상품과 연결됨
- `호르무즈 같은 특정 영역 전체 선박 조회`는 `LiveData / Custom Area API`가 맞음

### 4.2 스크래핑 관련 판단

- `VesselFinder`는 robots/terms 기준으로 스크래핑 사용이 부적절하다고 판단함
- `/fleet` 같은 로그인 화면도 자동 수집에 안전한 소스로 간주하지 않음
- 기술적으로 HTML/브라우저 자동화 시도는 가능할 수 있어도 `운영용 데이터 소스`로는 비추천

### 4.3 로컬에 있던 키 점검 결과

- `.env.local`에 붙어 있던 `VesselFinder` 관련 두 개의 32자리 키를 공식 `status` 엔드포인트로 확인함
- 결과: 둘 다 `Invalid Userkey!`
- 해석:
  - 현재 키는 `AIS API userkey`가 아님
  - `Container Tracking API` 또는 다른 프로필용 키일 가능성 있음

### 4.4 결론

- 현재 확보된 `VesselFinder` 관련 키만으로는 `호르무즈 선박 지도용 AIS API`를 바로 붙일 수 없음
- 목적에 맞는 상품은 `LiveData / Custom Area API`

## 5. AISStream 테스트 결과

### 5.1 기술적 확인

- Python, Node, PowerShell 환경은 로컬에 있음
- `AISStream` WebSocket 엔드포인트 연결 자체는 가능했음

### 5.2 실제 테스트 중 관찰

- PowerShell `ClientWebSocket` 테스트는 연결 후 서버 close로 불안정했음
- Node `WebSocket` 테스트에서는 연결 및 subscription 전송은 성공
- 다만 호르무즈 bbox, 확장 bbox, 다른 좁은 구역 테스트에서 메시지 수신이 일관되게 확인되지는 않았음
- 결론:
  - 키 자체가 완전히 죽은 것은 아니라고 단정할 수 없지만
  - 현재 세션에서 `호르무즈에서 확실히 메시지가 온다`는 것까지는 검증하지 못함

### 5.3 중요한 구조적 문제

- 현재 `.env.local`의 `AISStream` 키는 `NEXT_PUBLIC_AISSTREAM_API_KEY`
- 즉 프론트 번들에 노출될 수 있는 구조
- 장기적으로는 서버 프록시나 서버 전용 환경변수로 옮기는 것이 맞음

## 6. 한국 선박 / 한국 관련 데이터 조사 결과

### 6.1 공공 API로 가능한 것

- `해양수산부_선박운항정보`
  - 전국 항만 입출항/운항 정보
  - 실무적으로 가장 중요

- `해양수산부_선박제원정보 서비스`
  - 선박 제원, 총톤수 등
  - 운항정보와 조합용

- `해양수산부_선박위치정보(연안AIS) 통계정보`
  - 한국 연안 AIS 집계 통계
  - 개별 실시간 좌표 API가 아니라 WMS/WFS 기반의 집계/시각화 성격

- 인천/여수광양/울산 항만공사 API
  - 항만 단위 상세 입항/입출항/선박 제원 정보

### 6.2 공공 API만으로 어려운 것

- 한국 근해 개별 선박의 무료 실시간 lat/lon API를 공식 공공 API로 확정 확인하지 못함
- 따라서 `실시간 개별 선박 지도`는 글로벌 AIS 소스와 조합하는 편이 현실적

### 6.3 한국 관련 선박 판단 전략

이번 Codex 세션에서는 외부 유료 API 없이 다음 기준으로 `한국 관련 선박`을 분류하는 구조를 구현했다.

- `MMSI prefix 440 / 441` -> 한국 국적 추정
- `destination` 문자열에 한국 항만명/코드가 포함됨 -> 한국행

이 전략은 완벽한 법적/상업적 국적 판정이 아니라 `트래픽 사이트용 실용 분류`다.

## 7. 이번 세션에서 실제로 수정한 파일

### 7.1 새 파일

- `src/lib/ais/korea.ts`
- `src/app/api/world-ports/route.ts`
- `src/components/map/WorldPortsPanel.tsx`

기능:
- 한국 MMSI prefix 판정
- 한국 항만명 alias 사전
- 목적지 문자열 정규화 및 한국 항만 매칭
- Vessel에 한국 관련 context 부여
- 울산항만공사 `세계주요항만` Open API 서버 프록시
- 국가/항만/기관/사이트 조건으로 검색 가능한 `세계 주요 항만 연락처` 패널

### 7.2 수정 파일

- `src/lib/ais/types.ts`
  - `isKoreanFlagged`
  - `isKoreanBound`
  - `isKoreanRelated`
  - `koreanDestination`
  필드 추가

- `src/hooks/useAISStream.ts`
  - AISStream 메시지를 기존 Vessel에 merge한 뒤
  - `enrichKoreanContext()`를 적용하도록 수정

- `src/components/map/MapSection.tsx`
  - 좌상단 `Korea Watch` 패널 추가
  - 한국 관련 선박 수, 국적 추정 수, 한국행 수 표시
  - `한국 관련만 보기` 토글 추가
  - 빠르게 확인 가능한 선박 리스트 추가
  - 하단 상태 박스 문구 반영

- `src/components/map/MapCore.tsx`
  - 한국 관련 선박 마커에 강조 accent 표시 추가

- `src/components/map/VesselPopup.tsx`
  - `한국 국적 추정`, `한국행 · 항만명` 배지 추가

- `src/app/globals.css`
  - 지도 팝업 스타일을 밝은 카드 + 어두운 글자로 변경

- `src/components/map/MapSection.tsx`
  - 우측 상단 패널 스택에 `세계 주요 항만` 패널 추가

- `.env.example`
  - `UPA_WORLD_PORTS_API_KEY` 변수 추가

### 7.3 환경변수 파일 정리

- `.env.local`
- `.env.example`

정리 내용:
- 프로필 페이지에서 복붙한 텍스트 제거
- 표준 `KEY=VALUE` 형식으로 정리
- 현재 변수 구조:
  - `NEXT_PUBLIC_AISSTREAM_API_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `VESSELFINDER_CONTAINER_API_KEY`
  - `VESSELFINDER_FLEET_API_KEY`
  - `VESSELFINDER_AIS_USERKEY`
  - `REVALIDATION_SECRET`

주의:
- 이 문서에는 민감값을 다시 적지 않음
- 실제 값은 `.env.local` 참조

## 8. UI/스타일 관련 확정 사항

- 사용자 요청에 따라 `흰색 글자가 잘 안 보인다`는 문제를 수정함
- 현재 다음 UI는 `밝은 카드 + 어두운 글자`로 바뀜
  - 좌상단 `Korea Watch` 패널
  - 좌하단 상태 박스
  - 선박 팝업

## 9. 현재 상태에서 남아 있는 한계

- `한국 관련 선박` 분류는 heuristic이다
  - `MMSI 440/441`
  - `destination 문자열`
  둘 다 오탐/누락 가능성이 있음

- `AISStream` 호르무즈 coverage는 이번 세션에서 확실히 검증하지 못했다
- 2026-04-15 추가 점검 결과, 현재 `.env.local`의 `NEXT_PUBLIC_AISSTREAM_API_KEY`로는
  Node/Python 양쪽 WebSocket 테스트에서 `전 세계 bbox` 기준으로도 10~45초 동안
  실수신 메시지가 0건이었다
  - 즉 `한국 선박이 0`이라기보다 `전체 AIS 스트림이 비어 있는 상태`일 가능성이 높다
  - 원인은 키 만료/권한 문제, AISStream 측 상태, 브라우저 직접 연결 구조 중 하나일 수 있다

- `NEXT_PUBLIC_AISSTREAM_API_KEY`는 구조상 노출 위험이 있다

- `VesselFinder`는 현재 가진 키로는 AIS API 연결 불가

## 10. 검증 결과

- `npx.cmd tsc --noEmit`
  - 통과

- 2026-04-15 파서/표시 보강
  - `src/lib/ais/aisstream.ts`
    - `MetaData`/`Metadata` 둘 다 수용
    - `PositionReport` 외에 Class B position message도 수용
    - 정적 메시지 병합 시 더 관대한 파싱으로 보강
  - `src/hooks/useAISStream.ts`
    - 좌표 없는 정적 메시지도 기존 선박과 merge 가능하게 수정
    - 서버 error payload 감지 및 마지막 수신 시각 기록 추가
  - `src/components/map/MapSection.tsx`
    - `한국 선박이 아직 없다`와 `전체 스트림이 비어 있다`를 구분해서 안내하도록 수정

- 2026-04-15 `세계 주요 항만` 기능 추가 [Codex 주도]
  - 울산항만공사 `WOMAHA` API를 `/api/world-ports`로 프록시
  - 응답이 `data`, `row`, `WOMAHA` 구조 중 어느 쪽이어도 읽도록 파서 작성
  - 지도 우측 상단에 국가/항만/기관/사이트 검색 패널 추가
  - API 키가 없으면 `sample` 키로 동작하도록 설계하고, 실제 운영 키는 `UPA_WORLD_PORTS_API_KEY` 사용

- `npm.cmd run build`
  - 코드 에러가 아니라 `Google Fonts (Noto Sans KR)` 네트워크 fetch 실패로 빌드 실패
  - 즉 타입 기준으로는 코드 문제 없음

## 11. 다음 세션에서 바로 할 일

우선순위 순서대로 정리한다.

### A. 데이터 안정화

1. `AISStream`을 프론트 직접 연결에서 `서버 프록시` 구조로 옮기기
2. 최소한 메모리 캐시 또는 `/api/vessels` 경유 구조로 바꾸기
3. 가능하면 `AISHub` 또는 공공 항만 API를 보조 데이터로 연결

### B. 한국 관련 기능 강화

1. 한국 항만 alias 사전 보강
2. `유조선/LNG/LPG/컨테이너선` 중심 요약 카드 추가
3. `한국행 선박` 별도 페이지 또는 섹션 확장

### C. SEO/트래픽 구조

1. `호르무즈 + 한국 영향` 설명형 페이지 작성
2. `한국행 유조선`, `울산행 선박`, `여수행 선박` 같은 랜딩 페이지 설계
3. `/호르무즈`, `/실시간-선박-추적`, `/에너지-안보` 등 콘텐츠 페이지 보강

### D. 상용 전환 판단

1. `VesselFinder LiveData / Custom Area API` 견적 문의 여부 판단
2. `MarineTraffic API` 대안과 비교

## 12. 다음 세션 시작용 요약

다음 세션에서는 아래 문장을 전제로 이어가면 된다.

- 이 프로젝트는 `호르무즈 해협 선박 지도 + 한국 관련 선박/콘텐츠` 사이트다
- 현재 지도는 `AISStream` 기반이고 데이터 안정성은 미확정이다
- `한국 관련 선박` heuristic 분류는 이미 구현되어 있다
- `VesselFinder` 웹 플랜/스크래핑은 운영용 해법이 아니다
- `VesselFinder`의 현재 로컬 키는 AIS API userkey로는 유효하지 않았다
- 환경변수 파일은 이미 표준 형태로 정리되어 있다
- 새 작업은 기존 구현을 덮지 말고, 그 위에 누적 개선하는 방식으로 진행해야 한다

## 13. 외부 소스 연동 가능 값 인벤토리

- 2026-04-15 `design/content/source-integration-field-inventory.md` 문서 추가 [Codex 주도]
- 대상 소스:
  - Maersk
  - MSC
  - CMA CGM
  - Hapag-Lloyd
  - COSCO
  - ONE
  - HMM
  - Evergreen
  - PIL
  - OilPriceAPI
  - S&P Global Market Intelligence
  - UKMTO
  - Kpler
  - MarineTraffic
  - Clarksons Research
  - Reuters
  - CNBC
- 문서 목적:
  - 각 소스별 `가져올 수 있는 값`
  - `접근 방식`
  - `사이트 적용 우선순위`
  - `공개 즉시 연동`, `계정/계약 필요`, `고비용 프리미엄` 구분
- 1차 구현 후보:
  - `UKMTO`
  - `OilPriceAPI`
  - `CNBC RSS`
  - `MarineTraffic`
