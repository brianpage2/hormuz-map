import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "2026년 호르무즈 해협 원유 수송 현황 — VLCC 통과 빈도·항로 분석",
  description:
    "2026년 호르무즈 해협 원유 수송 현황. AIS 데이터 기반 VLCC 통과 빈도, 주요 산유국별 수출량, 한국행 유조선 현황을 분석합니다.",
  keywords: [
    "원유 수송 현황",
    "VLCC 호르무즈",
    "유조선 추적",
    "원유 운반선",
    "호르무즈 물동량",
    "중동 원유 수출",
  ],
  openGraph: {
    title: "2026년 호르무즈 해협 원유 수송 현황",
    description: "AIS 기반 VLCC 통과 빈도·산유국별 수출량·한국행 유조선 현황 분석.",
    type: "article",
    locale: "ko_KR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "2026년 호르무즈 해협 원유 수송 현황",
  description: "AIS 데이터 기반 2026년 호르무즈 해협 VLCC 통과 빈도와 원유 수송 현황 분석.",
  inLanguage: "ko",
  author: { "@type": "Organization", name: "호르무즈 해협 지도" },
  datePublished: "2026-04-05",
  dateModified: "2026-04-05",
  articleSection: "시장 분석",
};

export default function OilTransportPage() {
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
              <span className="text-gray-300">원유 수송 현황</span>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-brand-900/50 text-brand-400 border border-brand-800 rounded px-2 py-0.5">시장 분석</span>
              <span className="text-xs text-gray-500">2026년 4월 5일</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-500">읽기 6분</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              2026년 호르무즈 해협<br />
              <span className="text-brand-400">원유 수송 현황</span> 분석
            </h1>

            <article className="space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">전체 물동량 개요</h2>
                <p>
                  2025년 기준 호르무즈 해협을 통과한 원유 및 석유제품의 일평균 물동량은 약 1,760만 배럴입니다.
                  이는 전 세계 해상 원유 교역량의 약 20%에 해당하는 규모로,
                  2015년(1,600만 배럴)에 비해 약 10% 증가했습니다.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {[
                    { label: "일평균 통과량", value: "1,760만 배럴" },
                    { label: "일평균 VLCC", value: "약 15~20척" },
                    { label: "LNG 선박", value: "약 3~5척/일" },
                    { label: "총 통과 선박", value: "50척+/일" },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                      <p className="text-brand-400 text-sm font-bold">{item.value}</p>
                      <p className="text-gray-500 text-xs mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">산유국별 수출 비중</h2>
                <p>
                  호르무즈 해협을 통해 원유를 수출하는 주요 국가는 사우디아라비아, 이라크,
                  UAE, 쿠웨이트, 이란, 카타르입니다. 사우디아라비아의 아람코가 가장 큰 비중을 차지합니다.
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    { country: "🇸🇦 사우디아라비아", share: 35, barrels: "약 620만 배럴/일" },
                    { country: "🇮🇶 이라크", share: 22, barrels: "약 390만 배럴/일" },
                    { country: "🇦🇪 UAE", share: 15, barrels: "약 260만 배럴/일" },
                    { country: "🇰🇼 쿠웨이트", share: 10, barrels: "약 175만 배럴/일" },
                    { country: "🇮🇷 이란", share: 8, barrels: "약 140만 배럴/일" },
                    { country: "🇶🇦 카타르 (LNG)", share: 10, barrels: "약 175만 배럴/일 상당" },
                  ].map((item) => (
                    <div key={item.country}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{item.country}</span>
                        <span className="text-gray-400">{item.barrels}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-600 rounded-full"
                          style={{ width: `${item.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">주요 수입국과 항로</h2>
                <p>
                  호르무즈 해협을 통과한 원유의 최대 수입국은 중국(약 40%), 인도(약 20%),
                  일본(약 10%), 한국(약 8%), 미국·유럽(나머지)입니다.
                  아시아 국가들이 전체의 약 75% 이상을 차지해, 호르무즈 해협은 사실상
                  '아시아 에너지 동맥'이라 불립니다.
                </p>
                <p className="mt-3">
                  한국행 VLCC의 주요 항로는 호르무즈 해협 → 오만만 → 아라비아해 →
                  인도양 → 말라카 해협 → 남중국해 → 한국(울산·여수·인천)으로,
                  편도 항해에 약 20~25일이 소요됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">AIS 데이터로 본 선박 패턴</h2>
                <p>
                  이 사이트의 실시간 지도에서 관찰할 수 있는 흥미로운 패턴이 있습니다.
                  VLCC는 주로 페르시아만에서 출발해 오만 쪽 남부 수로(TSS)를 따라 출항합니다.
                  반대로 빈 선박(밸러스트)은 북부 이란 쪽 수로를 따라 입항합니다.
                  LNG 운반선은 카타르 라스라판 항에서 출발해 해협 중앙부를 통과합니다.
                </p>
                <p className="mt-3">
                  <Link href="/" className="text-brand-400 hover:underline">실시간 지도</Link>에서
                  이 패턴을 직접 확인해보세요. 낮과 밤에 따른 통행 밀도 차이,
                  주말과 평일의 물동량 변화도 흥미로운 관찰 포인트입니다.
                </p>
              </section>

            </article>

            <div className="mt-10 pt-8 border-t border-gray-800 flex items-center justify-between">
              <Link href="/shipping-news/hormuz-blockade-risk" className="text-sm text-gray-400 hover:text-white transition-colors">
                ← 이전 기사
              </Link>
              <Link href="/shipping-news/ais-vessel-tracking" className="text-sm text-brand-400 hover:underline">
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
