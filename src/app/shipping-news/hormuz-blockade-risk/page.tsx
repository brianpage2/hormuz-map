import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "호르무즈 해협 봉쇄 위험 — 이란 위협의 현실성과 대응 시나리오",
  description:
    "이란의 호르무즈 해협 봉쇄 위협 현실성 분석. 봉쇄 발생 시 세계 원유 공급, 유가, 한국 경제에 미치는 영향과 대응 시나리오를 살펴봅니다.",
  keywords: [
    "호르무즈 봉쇄",
    "호르무즈 해협 봉쇄",
    "이란 위협",
    "원유 공급 충격",
    "에너지 위기",
    "호르무즈 위기",
  ],
  openGraph: {
    title: "호르무즈 해협 봉쇄 위험 — 이란 위협과 대응 시나리오",
    description: "이란의 호르무즈 봉쇄 위협 현실성과 봉쇄 시 경제 충격 분석.",
    type: "article",
    locale: "ko_KR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "호르무즈 해협 봉쇄 위험 — 이란 위협의 현실성과 대응 시나리오",
  description: "이란의 호르무즈 봉쇄 위협 현실성과 봉쇄 시 세계 에너지 시장 충격 분석.",
  inLanguage: "ko",
  author: { "@type": "Organization", name: "호르무즈 해협 지도" },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  articleSection: "지정학",
};

export default function BlocakadeRiskPage() {
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
              <Link href="/shipping-news" className="hover:text-gray-300 transition-colors">해운 뉴스</Link>
              <span>/</span>
              <span className="text-gray-300">호르무즈 봉쇄 위험</span>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-brand-900/50 text-brand-400 border border-brand-800 rounded px-2 py-0.5">지정학</span>
              <span className="text-xs text-gray-500">2026년 4월 10일</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-500">읽기 8분</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              호르무즈 해협 봉쇄 위험<br />
              <span className="text-brand-400">이란 위협의 현실성</span>과 대응 시나리오
            </h1>

            <article className="space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">이란의 봉쇄 위협 역사</h2>
                <p>
                  이란은 1980년대 이란-이라크 전쟁 시기부터 주기적으로 호르무즈 해협 봉쇄를 위협해왔습니다.
                  가장 구체적인 위협은 2011~2012년 서방의 핵 제재가 강화되던 시기에 나왔으며,
                  이란 혁명수비대 사령관들은 "필요하다면 하루아침에 해협을 봉쇄할 수 있다"고 공언했습니다.
                </p>
                <p className="mt-3">
                  2019년에는 긴장이 실질적인 사건으로 이어졌습니다. 이란 혁명수비대는
                  영국 국적 유조선 스테나 임페로(Stena Impero)를 나포했고,
                  미국 정보 드론 RQ-4를 격추했습니다. 유가는 단기간에 15% 이상 급등했으며,
                  미국은 걸프 해역 안전 확보를 위한 다국적 해상 작전(파수꾼 작전)을 발족했습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">봉쇄의 현실적 가능성</h2>
                <p>
                  이란이 실제로 호르무즈 해협을 완전히 봉쇄하기는 매우 어렵습니다.
                  첫째, 이란 자신도 석유 수출의 상당 부분을 이 해협을 통해 하기 때문에 경제적 자해 행위가 됩니다.
                  둘째, 미국 5함대와 영국 해군이 상시 존재하며 봉쇄 시도에 즉각 대응할 수 있습니다.
                </p>
                <p className="mt-3">
                  그러나 전문가들이 더 우려하는 시나리오는 완전 봉쇄가 아닌 <strong className="text-white">선택적 괴롭힘(harassment)</strong>입니다.
                  이란 혁명수비대의 소형 고속정 편대가 특정 국적 선박을 추적하거나 항로를 방해하면,
                  보험료와 해운 비용이 급등하고 실질적으로 해협 통과가 위축될 수 있습니다.
                  이는 완전 봉쇄 없이도 상당한 경제적 압박을 가할 수 있는 전술입니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">봉쇄 시 경제 충격 시나리오</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {[
                    {
                      label: "단기 (1~2주)",
                      items: ["국제 유가 30~50% 급등", "항공료·해운 운임 폭등", "아시아 증시 급락"],
                      color: "border-yellow-700",
                    },
                    {
                      label: "중기 (1~3개월)",
                      items: ["한국 정유사 가동 감축", "전략 비축유 방출 시작", "IEA 긴급 공동 대응"],
                      color: "border-orange-700",
                    },
                    {
                      label: "장기 (3개월+)",
                      items: ["국내 에너지 배급제 가능성", "수출 산업 생산 차질", "글로벌 경기 침체 위험"],
                      color: "border-red-700",
                    },
                  ].map((scenario) => (
                    <div key={scenario.label} className={`bg-gray-800 rounded-lg p-4 border ${scenario.color}`}>
                      <p className="text-white font-semibold text-sm mb-3">{scenario.label}</p>
                      <ul className="space-y-2">
                        {scenario.items.map((item) => (
                          <li key={item} className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-gray-600 mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">한국의 대응 체계</h2>
                <p>
                  한국 정부는 산업통상자원부 주도 하에 에너지 수급 위기 대응 매뉴얼을 보유하고 있습니다.
                  위기 단계별로 전략 비축유 방출, IEA 집단 대응 참여, 수요 감축 명령 등을
                  순차적으로 발동하게 됩니다. 한국석유공사의 비축 기지는 경북 울주, 충남 서산,
                  전남 여수 등 전국 분산 배치되어 있습니다.
                </p>
                <p className="mt-3">
                  군사적으로는 청해부대가 호르무즈 인근 해역에서 자국 상선을 호위하는 역할을 맡습니다.
                  또한 미국이 주도하는 다국적 해상 안보 임무(CMF)에 한국 해군도 참여해
                  해협 안전 보장에 기여하고 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">실시간 현황 모니터링</h2>
                <p>
                  이 사이트의{" "}
                  <Link href="/" className="text-brand-400 hover:underline">실시간 선박 추적 지도</Link>에서
                  호르무즈 해협을 통과하는 선박의 현재 상황을 AIS 데이터로 확인할 수 있습니다.
                  긴장 상황이 고조될 때 선박 통행량 변화나 항로 우회 패턴을 관찰하는 데 도움이 됩니다.
                </p>
              </section>

            </article>

            <div className="mt-10 pt-8 border-t border-gray-800 flex items-center justify-between">
              <Link href="/shipping-news" className="text-sm text-gray-400 hover:text-white transition-colors">
                ← 해운 뉴스 목록
              </Link>
              <Link href="/shipping-news/crude-oil-transport" className="text-sm text-brand-400 hover:underline">
                다음 기사 →
              </Link>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
