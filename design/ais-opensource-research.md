# GitHub 선박 AIS 오픈소스 조사 (2026-04-14)

## 즉시 활용 가능한 핵심 프로젝트

### 1. BridgeView AIS ⭐ 최우선 추천
- **GitHub**: https://github.com/tmcknight/bridgeview-ais
- **스택**: React + TypeScript + Vite + MapLibre GL + React-Map-GL
- **특징**:
  - aisstream.io 무료 WebSocket 연동
  - WebSocket 프록시 서버 (보안/인증/Rate Limiting)
  - Dark/Light 모드
  - 3D 지도 지원
  - 상세 선박 정보 패널

### 2. Maritime Vessel Tracking
- **GitHub**: https://github.com/josna-14/Maritime_Vessel_Tracking
- **스택**: React + Django REST + Leaflet.js + WebSocket
- **특징**:
  - 300+ 선박 동시 추적
  - 포트 혼잡도 분석
  - 지오펜싱 안전 경고
  - 역사적 항로 재생 (Timeline Slider)
  - 선박 클러스터링
  - JWT 인증
  - 5초마다 위치 업데이트

### 3. Shadow Fleet Tracker Light
- **GitHub**: https://github.com/FormerLab/shadow-fleet-tracker-light
- **스택**: SQL + 지도 시각화
- **특징**:
  - 1,200+ 선박 추적
  - aisstream.io 무료 API 활용
  - 해저 케이블 근접성 경고
  - 로컬 실행 (클라우드 없음)
  - 2026년 3월 기준 활발히 유지

### 4. AISdb (분석용)
- **GitHub**: https://github.com/AISViz/AISdb
- **스택**: Python + SQLite/PostgreSQL
- **특징**:
  - 대용량 AIS 데이터 저장/분석
  - GeoJSON 내보내기
  - Jupyter Notebook 튜토리얼
  - `pip install aisdb`

### 5. AisTrack (덴마크 해양청)
- **GitHub**: https://github.com/dma-ais/AisTrack
- **스택**: Java
- **라이선스**: Apache 2.0
- **특징**: 공식 해양청 지원, 프로덕션급 안정성

---

## 무료 AIS 데이터 소스

| 소스 | 형식 | 비용 | 비고 |
|------|------|------|------|
| **aisstream.io** | WebSocket JSON | 무료 | 현재 사용 중, 글로벌, 가장 활발 |
| **AISHub** | REST JSON/XML | 무료 | 글로벌 |
| **Marine Cadastre** | CSV/GeoParquet | 무료 | 미국 해역, 히스토리 데이터 (2009~) |
| **Norwegian Coastal** | AIS | 무료 | 노르웨이 해역 한정 |

---

## 라이브러리/도구

| 프로젝트 | 언어 | 라이선스 | 용도 |
|---------|------|---------|------|
| FATHOM5/ais | Go | MIT | AIS CSV 대용량 처리 |
| AISUtils (tbsalling) | Java | - | AIS 메시지 파싱 |
| aisstream message models | TS | MIT | 메시지 타입 정의 |
| GeoGate | Java/JS | - | GPS/AIS 통합 서버 |

---

## 참고 링크
- https://aisstream.io/documentation
- https://github.com/aisstream
- https://open-ais.org/
