import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MapSection from "@/components/map/MapSection";
import AdSenseUnit from "@/components/AdSenseUnit";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hormuz.codedanswer.com/#website",
      url: "https://hormuz.codedanswer.com",
      name: "호르무즈 해협 실시간 선박 추적 지도",
      description: "AIS 데이터로 호르무즈 해협을 통과하는 유조선·화물선 실시간 위치를 한국어로 제공",
      inLanguage: "ko",
    },
    {
      "@type": "WebPage",
      "@id": "https://hormuz.codedanswer.com/#webpage",
      url: "https://hormuz.codedanswer.com",
      name: "호르무즈 해협 실시간 선박 추적 지도",
      description: "호르무즈 해협 실시간 선박 위치 추적 지도. AIS 데이터로 유조선, 컨테이너선, 화물선의 현재 위치를 확인하세요.",
      inLanguage: "ko",
      isPartOf: { "@id": "https://hormuz.codedanswer.com/#website" },
    },
  ],
};

export const metadata: Metadata = {
  title: "호르무즈 해협 실시간 선박 추적 지도",
  description:
    "호르무즈 해협 실시간 선박 위치 추적 지도. AIS 데이터로 유조선, 컨테이너선, 화물선의 현재 위치를 확인하세요. 한국 에너지 안보에 중요한 중동 해운 정보를 제공합니다.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />

      {/* 지도 섹션 — 고정 높이, 헤더 높이 오프셋 */}
      <main className="flex-1 pt-14">
        <section className="relative w-full" style={{ height: "calc(100vh - 56px)" }}>
          <MapSection />
        </section>

        {/* SSR 렌더링 콘텐츠 (SEO용) — 지도 아래 */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            호르무즈 해협 실시간 선박 추적 지도
          </h1>
          <p className="text-gray-400 leading-relaxed mb-6">
            호르무즈 해협(Strait of Hormuz)은 페르시아만과 오만만을 연결하는 세계에서 가장 중요한 해운 통로입니다.
            이 사이트는 AIS(선박 자동 식별 시스템) 데이터를 활용해 호르무즈 해협을 통과하는 유조선, 화물선,
            컨테이너선의 실시간 위치를 한국어로 제공합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-brand-400 text-2xl font-bold">세계 원유 20%</p>
              <p className="text-gray-400 text-sm mt-1">호르무즈 통과 비율</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-brand-400 text-2xl font-bold">약 39km</p>
              <p className="text-gray-400 text-sm mt-1">최협부 너비</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-brand-400 text-2xl font-bold">한국 원유 70%</p>
              <p className="text-gray-400 text-sm mt-1">중동 수입 의존도</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3">지도 사용 방법</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">▶</span>
                선박 아이콘을 클릭하면 선박명, 국적, 속도, 목적지 등 상세 정보를 확인할 수 있습니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">▶</span>
                아이콘의 방향은 선박의 실제 진행 방향을 나타냅니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">▶</span>
                황색 아이콘은 유조선, 청록색은 화물선, 파란색은 컨테이너선입니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">▶</span>
                데이터는 30초마다 자동으로 갱신됩니다.
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-3">호르무즈 해협이란?</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              호르무즈 해협은 이란과 오만 사이에 위치하며, 최협부 너비는 약 39km입니다.
              전 세계 원유 수출의 약 20%, LNG 수출의 약 25%가 이 해협을 통과합니다.
              한국은 원유 수입의 약 70%를 중동에서 조달하며, 호르무즈 해협은 한국 에너지 안보의
              핵심 통로입니다.{" "}
              <a href="/hormuz" className="text-brand-400 hover:underline">
                호르무즈 해협 자세히 알아보기 →
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* 모바일 전용 광고 — 콘텐츠 최하단 */}
      <div className="block md:hidden px-4 pb-6">
        <AdSenseUnit />
      </div>

      <Footer />
    </div>
    </>
  );
}
