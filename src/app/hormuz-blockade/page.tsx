export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "호르무즈 해협 봉쇄 2026 — 한국 경제·원유 영향 완전 분석",
  description:
    "2026년 호르무즈 해협 봉쇄 상황과 한국 경제에 미치는 영향을 분석합니다. 원유 공급 차질, 유가 전망, 한국 선박 현황, 정부 대응 전략을 알아보세요.",
  keywords: [
    "호르무즈 봉쇄", "호르무즈 해협 봉쇄", "호르무즈 봉쇄 한국", "2026 호르무즈",
    "원유 공급 차질", "유가 전망", "한국 에너지 위기", "이란 호르무즈",
  ],
  openGraph: {
    title: "호르무즈 해협 봉쇄 2026 — 한국 경제·원유 영향",
    description: "2026년 호르무즈 봉쇄 상황과 한국 원유 수급, 유가, 경제 영향 완전 분석.",
    type: "article",
    locale: "ko_KR",
  },
};

export default function HormuzBlockadePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-14">
        <article className="max-w-3xl mx-auto px-4 py-12">

          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">긴급</span>
            <span className="text-gray-500 text-xs">2026년 호르무즈 상황</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            호르무즈 해협 봉쇄 2026 —<br />한국 경제·원유 영향 완전 분석
          </h1>

          <p className="text-gray-400 leading-relaxed mb-8">
            2026년 호르무즈 해협을 둘러싼 긴장이 고조되면서 한국의 에너지 안보가 직접적인 위협에 직면했습니다.
            한국이 수입하는 원유의 약 70%가 중동에서 오고, 그 대부분이 호르무즈 해협을 통과합니다.
            이 페이지에서는 현재 상황과 한국 경제에 미치는 영향을 분석합니다.
          </p>

          {/* 핵심 수치 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { value: "70%", label: "한국 원유의 중동 의존도" },
              { value: "20%", label: "세계 원유 중 호르무즈 통과" },
              { value: "26척", label: "호르무즈 대기 한국 선박 (2026.04 기준)" },
              { value: "173명", label: "해당 선박 한국인 선원" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                <p className="text-red-400 text-xl font-bold">{item.value}</p>
                <p className="text-gray-500 text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">호르무즈 봉쇄란 무엇인가</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              호르무즈 해협은 이란과 오만 사이에 위치한 폭 약 39km의 좁은 바닷길로, 전 세계 원유 해상 수송량의 약 20%,
              LNG 수출의 약 25%가 통과하는 세계 최대의 에너지 수송로입니다.
            </p>
            <p className="text-gray-400 leading-relaxed">
              이란은 미국이나 이스라엘과의 군사적 충돌 시 호르무즈 해협을 봉쇄하겠다고 반복적으로 위협해왔습니다.
              해협 봉쇄 시 국제 원유 가격은 즉각적으로 급등하고, 중동 원유에 의존하는 한국·일본·중국 등 동아시아 국가들이
              가장 큰 타격을 받게 됩니다.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">한국 경제에 미치는 영향</h2>
            <div className="space-y-4">
              {[
                {
                  title: "원유 공급 차질",
                  desc: "한국은 원유 수입의 약 70%를 중동에서 조달합니다. 호르무즈 해협이 봉쇄되면 즉각적인 공급 차질이 발생하고, 정유·화학·운송 등 전 산업에 영향을 미칩니다.",
                },
                {
                  title: "유가 급등",
                  desc: "봉쇄가 장기화될 경우 국제 유가가 배럴당 100달러 이상으로 치솟을 수 있으며, 이는 물가 상승과 경기 침체로 이어집니다.",
                },
                {
                  title: "제조업 생산비 증가",
                  desc: "봉쇄가 3개월 이상 지속될 경우 한국 제조업 평균 생산비가 약 12% 상승할 것으로 추산됩니다. 반도체·자동차·조선 등 주요 산업이 직격탄을 맞습니다.",
                },
                {
                  title: "반도체 공급망 위협",
                  desc: "카타르산 헬륨은 반도체 생산 냉각 공정에 필수적입니다. 호르무즈 봉쇄로 카타르발 LNG·헬륨 공급이 차단되면 삼성전자·SK하이닉스 생산에 차질이 빚어질 수 있습니다.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">한국 정부 대응 전략</h2>
            <div className="space-y-3">
              {[
                { title: "전략 비축유 활용", desc: "한국은 IEA 기준 90일분 이상의 전략 비축유를 보유하고 있습니다. 한국석유공사 전국 지하 비축기지에 약 9,000만 배럴 이상이 저장되어 있습니다." },
                { title: "원유 수입 다변화", desc: "카자흐스탄, 미국산 셰일오일, 아프리카(앙골라·나이지리아) 등으로 수입선을 긴급 다변화하고 있습니다." },
                { title: "청해부대 대응", desc: "한국 해군 청해부대가 호르무즈 해협 인근 해역에서 한국 상선 보호 임무를 수행합니다." },
                { title: "외교적 해결 모색", desc: "이란과의 외교 채널을 통해 한국 선박의 안전 통항 보장을 지속 협의합니다." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <span className="text-red-400 mt-0.5 shrink-0">▶</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">관련 페이지</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/", label: "실시간 선박 추적 지도" },
                { href: "/energy-security", label: "한국 에너지 안보 분석" },
                { href: "/cheonghae-unit", label: "청해부대 호르무즈 파병" },
                { href: "/hankuk-chemi", label: "한국케미호 나포 사건" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 border border-gray-700 transition"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </section>

          <p className="text-gray-600 text-xs">
            본 페이지의 수치는 공개된 정부 발표 및 언론 보도를 기반으로 작성되었습니다.
            실시간 상황은 변동될 수 있습니다.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
