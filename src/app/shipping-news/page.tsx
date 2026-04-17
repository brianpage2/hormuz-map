import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "해운 뉴스 — 호르무즈 해협·중동 해운 최신 소식",
  description:
    "호르무즈 해협과 중동 해운의 최신 뉴스. AIS 선박 추적, 원유 수송 현황, 지정학적 긴장, 해운 시장 동향을 한국어로 전합니다.",
  keywords: [
    "해운 뉴스",
    "호르무즈 뉴스",
    "중동 해운 뉴스",
    "유조선 뉴스",
    "원유 수송",
    "AIS 선박 추적",
    "해운 시장",
  ],
  openGraph: {
    title: "해운 뉴스 — 호르무즈 해협·중동 해운 최신 소식",
    description: "호르무즈 해협과 중동 해운 최신 뉴스를 한국어로 전합니다.",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hormuz_strait.jpg/1200px-Hormuz_strait.jpg", width: 1200, height: 800, alt: "호르무즈 해협 위성 사진" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "호르무즈 해협 해운 뉴스",
  description: "호르무즈 해협과 중동 해운 최신 뉴스",
  inLanguage: "ko",
  url: "https://hormuz.codedanswer.com/shipping-news",
};

const articles = [
  {
    slug: "hormuz-blockade-risk",
    title: "호르무즈 해협 봉쇄 위험 — 이란 위협의 현실성과 대응 시나리오",
    excerpt:
      "이란이 반복적으로 경고해온 호르무즈 해협 봉쇄 위협. 실제 봉쇄 가능성은 얼마나 되며, 봉쇄 시 세계 에너지 시장과 한국 경제에 어떤 충격이 발생하는지 분석합니다.",
    date: "2026-04-10",
    readTime: "8분",
    category: "지정학",
  },
  {
    slug: "crude-oil-transport",
    title: "2026년 호르무즈 해협 원유 수송 현황 — 주요 통과 선박과 항로 분석",
    excerpt:
      "2026년 현재 호르무즈 해협을 통과하는 원유 물동량과 주요 선박 현황을 AIS 데이터 기반으로 분석합니다. VLCC 통과 빈도, 주요 산유국별 수출 현황을 살펴봅니다.",
    date: "2026-04-05",
    readTime: "6분",
    category: "시장 분석",
  },
  {
    slug: "ais-vessel-tracking",
    title: "AIS 선박 추적의 원리 — 위성 AIS와 지상 기지국의 차이",
    excerpt:
      "AIS(선박자동식별장치)가 어떻게 작동하는지, 위성 AIS와 지상 기지국의 차이, 사각지대가 발생하는 이유와 aisstream.io 같은 글로벌 네트워크가 이를 해결하는 방법을 설명합니다.",
    date: "2026-03-28",
    readTime: "7분",
    category: "기술",
  },
];

export default function NewsPage() {
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
              <span className="text-gray-300">해운 뉴스</span>
            </nav>

            <h1 className="text-3xl font-bold text-white mb-2">해운 뉴스</h1>
            <p className="text-gray-400 text-sm mb-10">
              호르무즈 해협과 중동 해운의 최신 소식을 한국어로 전합니다.
            </p>

            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/shipping-news/${article.slug}`}
                  className="block bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-brand-900/50 text-brand-400 border border-brand-800 rounded px-2 py-0.5">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">읽기 {article.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed">{article.excerpt}</p>
                  <p className="text-xs text-brand-400 mt-3">자세히 읽기 →</p>
                </Link>
              ))}
            </div>

            {/* 구글 뉴스 바로가기 */}
            <section className="mt-10">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">최신 뉴스 바로가기</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "https://news.google.com/search?q=%ED%98%B8%EB%A5%B4%EB%AC%B4%EC%A6%88+%ED%95%B4%ED%98%91&hl=ko&gl=KR&ceid=KR:ko",
                    label: "Google 뉴스 — 호르무즈 해협",
                    desc: "구글 뉴스에서 최신 호르무즈 관련 기사 보기",
                    icon: "📰",
                  },
                  {
                    href: "https://news.google.com/search?q=%ED%98%B8%EB%A5%B4%EB%AC%B4%EC%A6%88+%EB%B4%89%EC%87%84+%ED%95%9C%EA%B5%AD&hl=ko&gl=KR&ceid=KR:ko",
                    label: "Google 뉴스 — 호르무즈 봉쇄 한국",
                    desc: "한국 관련 호르무즈 봉쇄 최신 기사 보기",
                    icon: "🇰🇷",
                  },
                  {
                    href: "https://news.google.com/search?q=%EC%B2%AD%ED%95%B4%EB%B6%80%EB%8C%80+%ED%98%B8%EB%A5%B4%EB%AC%B4%EC%A6%88&hl=ko&gl=KR&ceid=KR:ko",
                    label: "Google 뉴스 — 청해부대",
                    desc: "청해부대 최신 활동 뉴스 보기",
                    icon: "⚓",
                  },
                  {
                    href: "https://news.google.com/search?q=%EC%9B%90%EC%9C%A0+%EC%9C%A0%EA%B0%80+%ED%98%B8%EB%A5%B4%EB%AC%B4%EC%A6%88&hl=ko&gl=KR&ceid=KR:ko",
                    label: "Google 뉴스 — 원유·유가",
                    desc: "원유 수급 및 유가 관련 최신 기사 보기",
                    icon: "🛢️",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl p-4 border border-gray-700 transition group"
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">관련 페이지</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/", label: "실시간 지도", desc: "지금 바로 선박 위치 확인" },
                  { href: "/hormuz", label: "호르무즈란?", desc: "해협의 중요성 이해하기" },
                  { href: "/energy-security", label: "에너지 안보", desc: "한국의 에너지 안보 전략" },
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
