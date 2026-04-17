import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "호르무즈 해협이란? — 위치·중요성·봉쇄 위험 완전 정리",
  description:
    "호르무즈 해협의 위치, 지정학적 중요성, 통과 원유량, 봉쇄 시나리오까지 한국어로 완전 정리. 세계 원유 20%가 통과하는 호르무즈 해협이 한국 에너지에 미치는 영향을 알아보세요.",
  keywords: [
    "호르무즈",
    "호르무즈 해협",
    "호르무즈 해협 위치",
    "호르무즈 해협 중요성",
    "호르무즈 해협 봉쇄",
    "페르시아만",
    "원유 수송",
    "에너지 안보",
    "중동 해운",
  ],
  openGraph: {
    title: "호르무즈 해협이란? — 위치·중요성·봉쇄 위험 완전 정리",
    description:
      "세계 원유 20%가 통과하는 호르무즈 해협. 위치·지정학·봉쇄 위험까지 한국어로 완전 정리.",
    type: "article",
    locale: "ko_KR",
    images: [{ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hormuz_strait.jpg/1200px-Hormuz_strait.jpg", width: 1200, height: 800, alt: "호르무즈 해협 위성 사진" }],
  },
};

const faqItems = [
  {
    q: "호르무즈 해협은 어디에 있나요?",
    a: "호르무즈 해협은 이란과 오만 사이에 위치하며, 페르시아만과 오만만(아라비아해)을 연결합니다. 최협부 너비는 약 39km로, 선박이 통행할 수 있는 수로는 각 방향으로 약 3km에 불과합니다.",
  },
  {
    q: "호르무즈 해협을 통과하는 원유는 얼마나 되나요?",
    a: "하루 약 1,700만~2,000만 배럴의 원유와 원유 제품이 호르무즈 해협을 통과합니다. 이는 전 세계 해상 원유 교역량의 약 20%, LNG 교역량의 약 25%에 해당합니다.",
  },
  {
    q: "호르무즈 해협이 봉쇄되면 어떻게 되나요?",
    a: "호르무즈 해협이 봉쇄되면 전 세계 원유 공급이 급감하고 유가가 폭등합니다. 한국은 원유 수입의 약 70%를 중동에서 조달하므로, 봉쇄 시 에너지 수급에 심각한 영향을 받습니다. 대체 경로(사우디 동서 파이프라인, UAE 파이프라인)가 있지만 용량이 제한적입니다.",
  },
  {
    q: "호르무즈 해협을 관할하는 나라는 어디인가요?",
    a: "호르무즈 해협은 이란과 오만의 영해에 걸쳐 있습니다. 국제해양법(UNCLOS)에 따라 국제 해협으로 지정되어 있어 평시에는 모든 선박의 통과권이 보장됩니다.",
  },
  {
    q: "한국은 호르무즈 해협에서 선박을 운영하나요?",
    a: "네. 한국 해군은 2020년부터 청해부대를 호르무즈 해협 인근 해역에 파견해 자국 선박의 안전 항행을 지원하고 있습니다. 또한 한국 국적 유조선 수십 척이 이 해협을 통해 정기적으로 원유를 수송합니다.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "호르무즈 해협이란? — 위치·중요성·봉쇄 위험 완전 정리",
      description:
        "호르무즈 해협의 위치, 지정학적 중요성, 통과 원유량, 봉쇄 시나리오까지 한국어로 완전 정리.",
      inLanguage: "ko",
      author: { "@type": "Organization", name: "호르무즈 해협 지도" },
      datePublished: "2026-04-15",
      dateModified: "2026-04-15",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://hormuz.codedanswer.com" },
        { "@type": "ListItem", position: 2, name: "호르무즈란?", item: "https://hormuz.codedanswer.com/hormuz" },
      ],
    },
  ],
};

export default function HormuzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 pt-14">
          <div className="max-w-4xl mx-auto px-4 py-12">

            {/* 브레드크럼 */}
            <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
              <Link href="/" className="hover:text-gray-300 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-gray-300">호르무즈란?</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              호르무즈 해협이란?<br />
              <span className="text-brand-400">위치·중요성·봉쇄 위험</span> 완전 정리
            </h1>
            <p className="text-gray-400 text-sm mb-8">최종 업데이트: 2026년 4월</p>

            {/* 요약 카드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { label: "최협부 너비", value: "39 km" },
                { label: "세계 원유 통과", value: "약 20%" },
                { label: "세계 LNG 통과", value: "약 25%" },
                { label: "일일 통과 선박", value: "약 50척+" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                  <p className="text-brand-400 text-xl font-bold">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* 본문 */}
            <article className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">호르무즈 해협의 위치</h2>
                <p>
                  호르무즈 해협(Strait of Hormuz)은 이란 남부 해안과 아라비아반도 동쪽 끝(오만 무산담 반도) 사이에
                  위치한 좁은 해협입니다. 페르시아만과 오만만(아라비아해)을 연결하며, 지리적으로는
                  북위 26°~27°, 동경 56°~57° 부근에 해당합니다.
                </p>
                <p className="mt-3">
                  해협의 전체 길이는 약 160km이며 최협부 너비는 약 39km에 불과합니다.
                  그러나 수심이 얕고 암초가 많아 대형 유조선이 통행할 수 있는 실질적인 수로는
                  각 방향(입항·출항) 3km, 완충 구역 3km를 합쳐 총 9km 폭에 불과합니다.
                  이 극도로 좁은 통로로 세계 최대급 유조선(VLCC)들이 하루에도 수십 척씩 오고 갑니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">왜 이렇게 중요한가</h2>
                <p>
                  호르무즈 해협은 사우디아라비아, 이란, 이라크, 쿠웨이트, 아랍에미리트(UAE), 카타르 등
                  세계 최대 산유국들이 밀집한 페르시아만의 유일한 출구입니다. 이 지역의 석유는
                  파이프라인만으로는 수출이 불가능하며, 거의 전량 해상으로 운반되어야 합니다.
                </p>
                <p className="mt-3">
                  미국 에너지정보청(EIA)에 따르면 2023년 기준 하루 약 1,760만 배럴의 원유·석유제품이
                  호르무즈 해협을 통과했습니다. 이는 전 세계 해상 원유 교역량의 약 20%에 달합니다.
                  카타르 LNG 수출의 약 90% 역시 이 해협을 통해 아시아와 유럽으로 향합니다.
                </p>
                <p className="mt-3">
                  중국, 일본, 한국, 인도 등 아시아 주요 에너지 소비국들이 이 해협에 절대적으로 의존합니다.
                  특히 한국은 원유 수입의 약 70%를 중동에서 조달하므로, 호르무즈 해협은
                  한국 산업 전체의 생명줄과 같습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">지정학적 긴장과 봉쇄 위험</h2>
                <p>
                  호르무즈 해협 북쪽 해안을 따라 이란의 영해가 이어집니다. 이란은 과거 수차례
                  "서방의 제재에 대응해 해협을 봉쇄할 수 있다"고 위협한 바 있습니다.
                  2019년에는 영국 유조선 스테나 임페로(Stena Impero)를 나포하고 미국 드론을 격추하는 등
                  실제 충돌이 발생해 국제 유가가 급등하기도 했습니다.
                </p>
                <p className="mt-3">
                  이란혁명수비대(IRGC) 해군은 호르무즈 해협 인근 해역에 상시 존재하며,
                  소형 고속정 편대와 대함 미사일을 배치하고 있습니다. 미국 5함대는
                  바레인을 모항으로 해협 안보를 감시하며, 한국·영국·프랑스 등의 해군도 연합 해상작전에 참여합니다.
                </p>
                <p className="mt-3">
                  대체 경로로는 사우디아라비아의 동서 파이프라인(하루 약 500만 배럴 용량)과
                  UAE 아부다비~후자이라 파이프라인(하루 약 150만 배럴)이 있지만,
                  두 경로를 합쳐도 현재 통과량의 40%에도 못 미칩니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">한국과 호르무즈 해협</h2>
                <p>
                  한국은 세계 5위권의 원유 수입국으로, 사우디아라비아, 이라크, 쿠웨이트, UAE에서
                  수입하는 원유의 대부분이 호르무즈 해협을 통과합니다. 2023년 기준 한국의 원유 수입량
                  약 9억 배럴 중 약 6억 배럴 이상이 이 해협을 거쳤습니다.
                </p>
                <p className="mt-3">
                  2020년 한국 정부는 청해부대의 작전 구역을 확대해 호르무즈 해협 인근까지 포함시켰습니다.
                  이는 이란의 한국 선박 억류 위협에 대응하고 자국민과 선박을 보호하기 위한 조치였습니다.
                  실제로 2021년 1월, 이란혁명수비대가 한국 유조선 한국케미호를 나포하여
                  한·이란 관계가 급격히 악화된 바 있습니다.
                </p>
                <p className="mt-3">
                  이 사이트의 실시간 선박 추적 지도에서 지금 이 순간 호르무즈 해협을 통과하는
                  선박들의 위치를 확인할 수 있습니다.{" "}
                  <Link href="/" className="text-brand-400 hover:underline">실시간 지도 바로가기 →</Link>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">호르무즈 해협의 주요 통과 선종</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 not-prose">
                  {[
                    {
                      name: "초대형 원유 운반선 (VLCC)",
                      desc: "30만 DWT 이상 규모로 중동 원유를 한·중·일 등 동아시아로 수송. 호르무즈 통과 선박 중 가장 경제적 비중이 큰 선종.",
                      color: "text-yellow-400",
                    },
                    {
                      name: "LNG 운반선",
                      desc: "카타르·UAE·오만산 LNG를 아시아 전역으로 수송. 극저온(-163°C) 탱크를 탑재한 특수 선박.",
                      color: "text-cyan-400",
                    },
                    {
                      name: "컨테이너선",
                      desc: "두바이·아부다비 등 중동 허브항과 아시아·유럽을 연결. 전자제품·섬유·소비재 등을 수송.",
                      color: "text-blue-400",
                    },
                    {
                      name: "벌크선",
                      desc: "중동산 화학제품, 곡물, 시멘트 등을 운반. VLCC보다 소형이나 통과 빈도가 높음.",
                      color: "text-green-400",
                    },
                  ].map((ship) => (
                    <div key={ship.name} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className={`font-semibold text-sm mb-1 ${ship.color}`}>{ship.name}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{ship.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

            </article>

            {/* FAQ */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-white mb-6">자주 묻는 질문 (FAQ)</h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <details
                    key={item.q}
                    className="bg-gray-800 rounded-lg border border-gray-700 group"
                  >
                    <summary className="px-5 py-4 cursor-pointer text-sm font-medium text-white flex items-center justify-between gap-2 list-none">
                      {item.q}
                      <span className="text-gray-500 text-xs shrink-0 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 관련 페이지 링크 */}
            <section className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">관련 페이지</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/hormuz-strait", label: "호르무즈 해협 상세 정보", desc: "역사·지리·항로 정보" },
                  { href: "/energy-security", label: "한국 에너지 안보", desc: "중동 의존도·대응 전략" },
                  { href: "/vessel-tracking", label: "실시간 선박 추적", desc: "AIS 지도 사용 방법" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors group"
                  >
                    <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">{link.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
