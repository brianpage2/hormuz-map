import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "한국 에너지 안보와 호르무즈 해협 — 원유 의존도·대응 전략",
  description:
    "한국이 왜 호르무즈 해협에 의존할 수밖에 없는지, 원유 수입 구조, 에너지 안보 위협 요인, 정부 대응 전략까지 자세히 알아봅니다.",
  keywords: [
    "한국 에너지 안보",
    "호르무즈 에너지",
    "한국 원유 수입",
    "중동 원유 의존도",
    "에너지 안보 전략",
    "원유 비축",
    "청해부대",
  ],
  openGraph: {
    title: "한국 에너지 안보와 호르무즈 해협",
    description: "한국 원유 수입 구조, 호르무즈 의존도, 에너지 안보 전략 완전 분석.",
    type: "article",
    locale: "ko_KR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "한국 에너지 안보와 호르무즈 해협 — 원유 의존도·대응 전략",
  description: "한국의 원유 수입 구조와 호르무즈 해협 의존도, 에너지 안보 전략 분석.",
  inLanguage: "ko",
  author: { "@type": "Organization", name: "호르무즈 해협 지도" },
  datePublished: "2026-04-15",
  dateModified: "2026-04-15",
};

const importSources = [
  { country: "사우디아라비아", share: "28%", flag: "🇸🇦" },
  { country: "이라크", share: "16%", flag: "🇮🇶" },
  { country: "UAE", share: "10%", flag: "🇦🇪" },
  { country: "쿠웨이트", share: "9%", flag: "🇰🇼" },
  { country: "카타르 (LNG)", share: "7%", flag: "🇶🇦" },
  { country: "러시아", share: "7%", flag: "🇷🇺" },
  { country: "미국", share: "6%", flag: "🇺🇸" },
  { country: "기타", share: "17%", flag: "🌍" },
];

export default function EnergySecurityPage() {
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

            <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
              <Link href="/" className="hover:text-gray-300 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-gray-300">에너지 안보</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              한국 에너지 안보와
              <br />
              <span className="text-brand-400">호르무즈 해협</span>
            </h1>
            <p className="text-gray-400 text-sm mb-8">최종 업데이트: 2026년 4월</p>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { label: "중동 원유 의존도", value: "약 70%" },
                { label: "호르무즈 경유 원유", value: "약 60%+" },
                { label: "전략 비축유 (IEA)", value: "90일분+" },
                { label: "세계 원유 수입 순위", value: "5위권" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                  <p className="text-brand-400 text-lg font-bold">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <article className="space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">한국의 원유 수입 구조</h2>
                <p>
                  한국은 국내 원유 생산이 거의 없어 소비량의 99% 이상을 수입에 의존합니다.
                  2024년 기준 한국의 원유 수입량은 약 9억 2천만 배럴로 세계 5위 수준입니다.
                  이 중 약 70%가 중동 산유국에서 수입되며, 사우디아라비아가 최대 공급국입니다.
                </p>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {importSources.map((src) => (
                    <div key={src.country} className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
                      <p className="text-xl mb-1">{src.flag}</p>
                      <p className="text-white font-bold text-sm">{src.share}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{src.country}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  ※ 위 수치는 2023~2024년 평균 추정치입니다. 국제 정세에 따라 변동될 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">호르무즈 해협과 한국 경제</h2>
                <p>
                  사우디아라비아, 이라크, 쿠웨이트, UAE에서 수입하는 원유는 모두 호르무즈 해협을
                  통과해야 합니다. 카타르산 LNG도 대부분 이 해협을 경유합니다.
                  결과적으로 한국이 수입하는 에너지의 60% 이상이 호르무즈 해협 통과에 의존합니다.
                </p>
                <p className="mt-3">
                  한국의 정유 산업은 원유 수입이 중단될 경우 2~3개월 내에 가동을 멈춰야 합니다.
                  이는 석유화학, 플라스틱, 합성섬유, 항공, 운수 등 한국 주력 산업 전반에
                  연쇄 타격을 줍니다. 2022년 러시아-우크라이나 전쟁으로 인한 에너지 공급 충격이
                  세계 경제에 미친 영향을 감안하면, 호르무즈 봉쇄의 파급 효과는 훨씬 크다고
                  전문가들은 경고합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">한국의 에너지 안보 대응 전략</h2>

                <div className="space-y-4 mt-4">
                  {[
                    {
                      title: "전략 비축유 확보",
                      desc: "한국은 IEA(국제에너지기구) 기준에 따라 90일분 이상의 전략 비축유를 유지합니다. 한국석유공사는 전국 지하 비축기지에 약 9,000만 배럴 이상을 저장합니다.",
                    },
                    {
                      title: "수입 다변화 추진",
                      desc: "미국산 셰일오일, 아프리카(앙골라·나이지리아), 중앙아시아(카자흐스탄) 등으로 수입선을 확대하고 있습니다. 다만 가격 경쟁력 면에서 중동산 원유가 여전히 유리합니다.",
                    },
                    {
                      title: "청해부대 파견",
                      desc: "한국 해군은 2009년부터 청해부대를 아덴만에 파견하고 있으며, 2020년부터는 호르무즈 해협 인근 해역까지 작전 구역을 확대했습니다. 자국 상선 보호가 주요 임무입니다.",
                    },
                    {
                      title: "재생에너지 전환",
                      desc: "태양광·풍력 등 재생에너지 보급 확대로 화석연료 의존도를 장기적으로 낮추는 전략을 추진 중입니다. 원자력 발전 확대도 에너지 안보 차원에서 재검토되고 있습니다.",
                    },
                    {
                      title: "한·중·일 협력",
                      desc: "호르무즈 해협에 공통으로 의존하는 한국·중국·일본은 에너지 비상 시 상호 지원을 위한 협력 채널을 운영합니다. IEA 집단 대응 메커니즘도 활용합니다.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <p className="text-white font-semibold text-sm mb-2">{item.title}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">실시간으로 모니터링하기</h2>
                <p>
                  이 사이트에서 제공하는{" "}
                  <Link href="/" className="text-brand-400 hover:underline">실시간 선박 추적 지도</Link>를 통해
                  지금 이 순간 호르무즈 해협을 통과하는 한국행 유조선들의 위치를 확인할 수 있습니다.
                  실제로 얼마나 많은 선박이 한국 에너지 공급망을 담당하고 있는지를 눈으로 확인하면
                  에너지 안보의 중요성을 실감할 수 있습니다.
                </p>
              </section>

            </article>

            <section className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">관련 페이지</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/hormuz", label: "호르무즈란?", desc: "해협의 지정학적 중요성" },
                  { href: "/hormuz-strait", label: "해협 정보", desc: "지리·역사·항로 상세 정보" },
                  { href: "/shipping-news", label: "해운 뉴스", desc: "최신 에너지·해운 소식" },
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
