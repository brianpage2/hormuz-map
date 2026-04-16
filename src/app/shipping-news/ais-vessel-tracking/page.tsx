import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AIS 선박 추적의 원리 — 위성 AIS vs 지상 기지국 차이점 완전 이해",
  description:
    "AIS 선박 추적이 작동하는 원리, 위성 AIS와 지상 기지국의 차이, 사각지대 발생 이유, aisstream.io 같은 글로벌 네트워크가 어떻게 이를 보완하는지 설명합니다.",
  keywords: [
    "AIS 원리",
    "AIS 선박 추적 원리",
    "위성 AIS",
    "S-AIS",
    "지상 AIS",
    "선박 추적 원리",
    "aisstream",
    "선박자동식별장치",
  ],
  openGraph: {
    title: "AIS 선박 추적의 원리 — 위성 vs 지상 기지국 완전 이해",
    description: "AIS 작동 원리, 위성 vs 지상 기지국 차이, 사각지대 발생 이유와 해결책.",
    type: "article",
    locale: "ko_KR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AIS 선박 추적의 원리 — 위성 AIS vs 지상 기지국",
  description: "AIS 작동 원리와 위성 AIS, 지상 기지국의 차이, 사각지대 해결책 설명.",
  inLanguage: "ko",
  author: { "@type": "Organization", name: "호르무즈 해협 지도" },
  datePublished: "2026-03-28",
  dateModified: "2026-03-28",
  articleSection: "기술",
};

export default function AISPrinciplePage() {
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
              <span className="text-gray-300">AIS 선박추적 원리</span>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-brand-900/50 text-brand-400 border border-brand-800 rounded px-2 py-0.5">기술</span>
              <span className="text-xs text-gray-500">2026년 3월 28일</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-500">읽기 7분</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              AIS 선박 추적의 원리<br />
              <span className="text-brand-400">위성 AIS vs 지상 기지국</span> 차이점
            </h1>

            <article className="space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">AIS 기본 작동 원리</h2>
                <p>
                  AIS(Automatic Identification System)는 VHF 무선 주파수를 이용해 선박 정보를
                  주변에 자동으로 브로드캐스트하는 시스템입니다. 국제해사기구(IMO) SOLAS 협약에 따라
                  총 톤수 300톤 이상의 국제 항해 선박과 모든 여객선에 설치가 의무화되어 있습니다.
                </p>
                <p className="mt-3">
                  각 선박의 AIS 트랜스폰더는 두 개의 VHF 채널(161.975 MHz, 162.025 MHz)을
                  교대로 사용해 2~10초(속도에 따라 다름) 간격으로 다음 정보를 자동 송출합니다:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    "MMSI 번호 (선박 고유 식별자)",
                    "위도·경도 (GPS 기반, 수십 미터 정밀도)",
                    "속도 (대수속력, SOG)",
                    "침로 (COG 및 선수방위 HDG)",
                    "선박명, 호출 부호",
                    "선박 유형, 선박 크기 (길이·폭)",
                    "목적지, 예상 도착 시각 (ETA)",
                    "흘수 (드래프트)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-400">
                      <span className="text-brand-400 mt-0.5 text-xs">▶</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">지상 기지국 AIS (T-AIS)</h2>
                <p>
                  T-AIS(Terrestrial AIS)는 해안에 설치된 기지국이 선박의 AIS 신호를 수신하는 방식입니다.
                  VHF 전파의 특성상 수신 반경은 약 40~60 해리(70~110km)로 제한됩니다.
                  항구 주변, 좁은 해협, 연안 해역에서는 기지국 밀도가 높아 거의 완벽한 커버리지를 제공합니다.
                </p>
                <p className="mt-3">
                  호르무즈 해협은 이란, 오만, UAE 측에 다수의 AIS 기지국이 설치되어 있어
                  T-AIS 커버리지가 비교적 양호합니다. 그러나 기지국에서 먼 외해(오만해, 아라비아해)로
                  나가면 커버리지 공백이 발생합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">위성 AIS (S-AIS)</h2>
                <p>
                  S-AIS(Satellite AIS)는 저궤도(LEO) 위성이 선박의 AIS 신호를 직접 수신하는 방식입니다.
                  SpireGlobal, exactEarth, exactAIS 등의 회사가 수십~수백 개의 나노위성을 운용하며
                  이론적으로 전 세계 어느 해역이든 커버합니다.
                </p>
                <p className="mt-3">
                  그러나 S-AIS에도 한계가 있습니다. 밀집 해역에서는 여러 선박의 AIS 신호가
                  동시에 위성에 도달해 간섭(collision)이 발생하고, 신호 해독률이 낮아집니다.
                  호르무즈처럼 선박 밀도가 높은 해협에서는 이 문제가 두드러집니다.
                  또한 위성 통과 간격(약 90분)으로 인해 실시간성이 T-AIS보다 떨어질 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">aisstream.io의 복합 접근법</h2>
                <p>
                  이 사이트가 사용하는 <strong className="text-white">aisstream.io</strong>는
                  전 세계 수천 개의 지상 기지국과 위성 AIS 데이터를 통합해 WebSocket API로
                  제공하는 글로벌 AIS 네트워크 서비스입니다. 호르무즈 해협 해역은 지상 기지국
                  커버리지와 위성 커버리지가 중복 적용되어 높은 신뢰도의 실시간 데이터를 제공합니다.
                </p>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "지상 기지국 (T-AIS)",
                      pros: ["낮은 지연 시간 (2~10초)", "연안 밀집 해역 정밀도 높음"],
                      cons: ["수신 반경 40~60 해리 제한", "외해 커버리지 없음"],
                    },
                    {
                      title: "위성 AIS (S-AIS)",
                      pros: ["전 세계 어디든 커버", "외해 선박 추적 가능"],
                      cons: ["밀집 해역 신호 간섭", "갱신 주기 길 수 있음 (수십 분)"],
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-white font-semibold text-sm mb-3">{item.title}</p>
                      <div className="space-y-2">
                        {item.pros.map((pro) => (
                          <p key={pro} className="text-xs text-green-400 flex items-start gap-1">
                            <span>✓</span> {pro}
                          </p>
                        ))}
                        {item.cons.map((con) => (
                          <p key={con} className="text-xs text-red-400 flex items-start gap-1">
                            <span>✗</span> {con}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">AIS 사각지대와 선박 위치 조작</h2>
                <p>
                  AIS를 의도적으로 끄거나 허위 위치를 송출하는 행위를 'AIS 스푸핑(spoofing)'이라 합니다.
                  대북 제재 위반 선박, 이란산 원유 밀수 유조선, 해적 선박 등이 적발을 피하기 위해
                  AIS를 조작하는 사례가 보고됩니다. 분석기관들은 AIS 데이터와 위성 이미지를
                  교차 검증해 이런 '다크 선박(dark vessel)'을 추적합니다.
                </p>
                <p className="mt-3">
                  이 사이트는 AIS 데이터를 있는 그대로 표시하며, 스푸핑 탐지 기능은 제공하지 않습니다.
                  참고 목적으로만 활용하시기 바랍니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">직접 확인해보기</h2>
                <p>
                  <Link href="/" className="text-brand-400 hover:underline">실시간 지도</Link>에서
                  직접 AIS 데이터를 확인해보세요. 선박 아이콘을 클릭하면 해당 선박의 MMSI,
                  속도, 침로, 목적지 등 AIS에서 수신한 실제 데이터를 한국어로 볼 수 있습니다.
                </p>
              </section>

            </article>

            <div className="mt-10 pt-8 border-t border-gray-800 flex items-center justify-between">
              <Link href="/shipping-news/crude-oil-transport" className="text-sm text-gray-400 hover:text-white transition-colors">
                ← 이전 기사
              </Link>
              <Link href="/shipping-news" className="text-sm text-brand-400 hover:underline">
                목록으로 →
              </Link>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
