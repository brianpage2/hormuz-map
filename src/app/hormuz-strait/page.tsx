import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "호르무즈 해협 정보 — 지리·역사·항로 상세 가이드",
  description:
    "호르무즈 해협의 지리적 특성, 역사, 주요 항구, 통과 항로, 해저 지형을 상세히 소개합니다. AIS 실시간 지도와 함께 호르무즈 해협을 깊이 이해하세요.",
  keywords: [
    "호르무즈 해협",
    "호르무즈 해협 지도",
    "호르무즈 해협 항로",
    "페르시아만 항구",
    "호르무즈 해협 역사",
    "오만만",
    "반다르 아바스",
  ],
  openGraph: {
    title: "호르무즈 해협 정보 — 지리·역사·항로 상세 가이드",
    description: "호르무즈 해협의 지리, 역사, 주요 항구, 통과 항로 상세 가이드.",
    type: "article",
    locale: "ko_KR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "호르무즈 해협 정보 — 지리·역사·항로 상세 가이드",
  description: "호르무즈 해협의 지리적 특성, 역사, 주요 항구, 통과 항로, 해저 지형 상세 소개.",
  inLanguage: "ko",
  author: { "@type": "Organization", name: "호르무즈 해협 지도" },
  datePublished: "2026-04-15",
  dateModified: "2026-04-15",
};

const ports = [
  { name: "반다르 아바스 (이란)", desc: "이란 최대 항구. 호르무즈 해협 북쪽 입구에 위치. 석유화학 제품 수출 거점.", country: "🇮🇷" },
  { name: "자발리 알리 (UAE)", desc: "두바이 인근 세계 최대 인공항만 중 하나. 중동 최대 환적 허브.", country: "🇦🇪" },
  { name: "라스타누라 (사우디)", desc: "세계 최대 원유 수출 터미널. 아람코 주요 수출 거점.", country: "🇸🇦" },
  { name: "무산담 (오만)", desc: "호르무즈 해협 남쪽 돌출 반도. 오만 해상경비대 기지 위치.", country: "🇴🇲" },
  { name: "다스 섬 (UAE)", desc: "아부다비 국영석유회사(ADNOC) 원유 수출 터미널.", country: "🇦🇪" },
  { name: "하르크 섬 (이란)", desc: "이란 최대 원유 수출 해상 터미널. 생산량의 대부분 이곳에서 선적.", country: "🇮🇷" },
];

export default function HormuzStraitPage() {
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
              <span className="text-gray-300">호르무즈 해협 정보</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              호르무즈 해협 상세 정보
              <br />
              <span className="text-brand-400">지리·역사·항로</span> 완전 가이드
            </h1>
            <p className="text-gray-400 text-sm mb-8">최종 업데이트: 2026년 4월</p>

            {/* 지리 기본 정보 */}
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mb-10">
              <h2 className="text-base font-semibold text-white mb-4">기본 지리 정보</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { label: "위치", value: "이란·오만 사이" },
                  { label: "전체 길이", value: "약 160 km" },
                  { label: "최협부 너비", value: "약 39 km" },
                  { label: "통행 수로 너비", value: "각 방향 3 km" },
                  { label: "최대 수심", value: "약 80 m" },
                  { label: "조류 속도", value: "최대 4 노트" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-white font-medium mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <article className="space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">지리적 특성과 항로</h2>
                <p>
                  호르무즈 해협은 단순한 좁은 바다가 아닙니다. 해협 내에는 수많은 섬과 암초, 얕은 해역이
                  존재해 항법이 까다롭습니다. 주항로(TSS, Traffic Separation Scheme)는 국제해사기구(IMO)가
                  지정한 두 개의 수로로 나뉩니다. 입항(페르시아만 진입) 수로는 오만 쪽 남부에,
                  출항(오만만 진출) 수로는 이란 쪽 북부에 위치합니다.
                </p>
                <p className="mt-3">
                  이 수로들은 각 방향으로 약 3km 폭이며, 수로 사이에 3km의 완충 구역이 있습니다.
                  대형 VLCC는 이 수로를 엄격히 준수해야 하며, 소형 선박과 혼재하는 경우 충돌 위험이 높습니다.
                  해협 내 조류는 최대 4노트에 달해 선박 조종에 주의가 필요합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">역사적 배경</h2>
                <p>
                  호르무즈라는 이름은 13~16세기 이 해협을 지배했던 호르무즈 왕국에서 유래합니다.
                  당시 호르무즈 섬(현재 이란령)은 인도·아라비아·페르시아를 잇는 무역의 요충지였습니다.
                  1507년 포르투갈의 아폰수 드 알부케르케가 호르무즈를 점령하며 유럽 세력이 처음으로
                  이 해협을 통제했습니다. 이후 영국의 영향권 아래 들어갔다가 20세기 중반 이후
                  이란과 오만이 해협 주권을 행사하게 됩니다.
                </p>
                <p className="mt-3">
                  1970~80년대 걸프전쟁(이란-이라크 전쟁) 기간 동안 양국은 상대방 선박을 공격하는
                  "유조선 전쟁"을 벌였으며, 이 시기 호르무즈 해협의 군사적 중요성이 세계에 부각되었습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">주변 주요 항구</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {ports.map((port) => (
                    <div key={port.name} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-sm font-medium text-white mb-1">
                        {port.country} {port.name}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">{port.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">해저 지형과 환경</h2>
                <p>
                  호르무즈 해협의 해저는 비교적 얕습니다. 평균 수심은 50~60m이며 최대 수심은 약 80m입니다.
                  해협 내 그레이터 텀브·레서 텀브·아부무사 섬(이란·UAE 영유권 분쟁 중)이 주요 지형지물입니다.
                  특히 아부무사 섬은 이란혁명수비대의 군사 기지가 위치해 있어 지정학적 민감 지역입니다.
                </p>
                <p className="mt-3">
                  수온은 계절에 따라 20~34°C 사이를 오가며, 여름철(6~9월) 북인도양 몬순의 영향으로
                  높은 파고와 강한 바람이 발생해 항법 난도가 높아집니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">실시간 선박 모니터링</h2>
                <p>
                  이 사이트의{" "}
                  <Link href="/" className="text-brand-400 hover:underline">실시간 지도</Link>에서
                  지금 이 순간 호르무즈 해협을 통과하는 선박들의 위치, 속도, 목적지를 AIS 데이터로
                  확인할 수 있습니다. 유조선(황색), 화물선(청록), 컨테이너선(청색)을 구분해서 표시합니다.
                </p>
              </section>

            </article>

            <section className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">관련 페이지</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/hormuz", label: "호르무즈란?", desc: "기초부터 쉽게 이해하기" },
                  { href: "/energy-security", label: "한국 에너지 안보", desc: "호르무즈와 한국의 관계" },
                  { href: "/vessel-tracking", label: "실시간 선박 추적", desc: "AIS 지도 사용법" },
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
