# 호르무즈 해협 실시간 선박 추적 지도

한국어 해운 지도 사이트. "호르무즈" 키워드 SEO 최적화로 한국 트래픽 유입 및 AdSense 수익 창출.

## 기술 스택

- **Framework**: Next.js 14 App Router (TypeScript)
- **Map**: React-Leaflet + CartoDB Dark Matter
- **Styling**: Tailwind CSS v3
- **배포**: Vercel (서울 icn1 리전)

## 로컬 개발

```bash
# 패키지 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 값 입력

# 개발 서버 실행
npm run dev
```

## 배포

GitHub `main` 브랜치에 push하면 Vercel에 자동 배포됩니다.

## 폴더 구조

```
├── design/          ← 디자인 기획 파일 (와이어프레임, 콘텐츠, 브랜드)
├── content/news/    ← MDX 뉴스 기사
├── public/          ← 정적 파일 (OG 이미지, 아이콘 등)
└── src/
    ├── app/         ← Next.js App Router 페이지
    ├── components/  ← React 컴포넌트
    ├── lib/         ← 유틸리티, AIS 클라이언트, SEO 헬퍼
    └── hooks/       ← SWR 커스텀 훅
```

## 라이선스

Private
