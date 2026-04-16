export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "한국케미호 나포 사건 — 이란의 호르무즈 한국 선박 억류",
  description:
    "2021년 1월 이란 혁명수비대가 호르무즈 해협에서 한국 유조선 MT 한국케미호를 나포한 사건의 전말을 정리합니다. 배경, 경위, 석방 과정, 한국 정부 대응을 알아보세요.",
  keywords: [
    "한국케미호", "한국케미호 나포", "이란 한국 선박 나포", "호르무즈 나포",
    "MT한국케미호", "이란 억류", "한국 선박 이란",
  ],
  openGraph: {
    title: "한국케미호 나포 사건 — 이란의 호르무즈 한국 선박 억류",
    description: "2021년 MT 한국케미호 이란 나포 사건 전말 — 배경, 경위, 석방, 한국 대응.",
    type: "article",
    locale: "ko_KR",
  },
};

export default function KoreanChemePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-14">
        <article className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-2 text-gray-500 text-xs">호르무즈 해협 사건·사고</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            한국케미호 나포 사건
          </h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            2021년 1월 4일, 한국 국적 유조선 MT 한국케미호가 호르무즈 해협 공해상에서 이란 혁명수비대(IRGC) 해군에 의해
            나포되었습니다. 선원 20명(한국인 5명, 미얀마인 11명, 인도네시아인 2명, 베트남인 2명)이 이란 반다르아바스 항에
            억류되는 사태가 벌어졌습니다.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">사건 경위</h2>
            <div className="space-y-3">
              {[
                { date: "2021.01.04", event: "이란 혁명수비대, 호르무즈 해협 공해상에서 MT 한국케미호 나포. 이란 측은 해양 환경 오염을 명분으로 제시." },
                { date: "2021.01.04", event: "대한민국 국방부, 청해부대 최영함을 호르무즈 해협 인근으로 출동 명령." },
                { date: "2021.01.05", event: "한국 외교부 이란 대사 초치, 외교 항의 및 선원 석방 요청." },
                { date: "2021.01.10", event: "한국 정부 특사 이란 파견, 이란 외무부 차관 등과 면담." },
                { date: "2021.04.09", event: "선원 전원 석방. 선박은 이란에 잔류." },
                { date: "2021.04.09", event: "MT 한국케미호 억류 해제, 정상 운항 복귀." },
              ].map((item) => (
                <div key={item.date + item.event} className="flex gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <span className="text-red-400 text-xs font-mono shrink-0 mt-0.5">{item.date}</span>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">나포 배경</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              이란은 공식적으로 해양 오염을 나포 이유로 밝혔으나, 실제로는 당시 한국의 이란 자산 동결(약 70억 달러)과
              관련된 정치적 압박 수단으로 분석됩니다. 이란은 미국의 대이란 제재에 협조한 한국에 대한 불만을 지속적으로
              표명해왔습니다.
            </p>
            <p className="text-gray-400 leading-relaxed">
              이 사건은 호르무즈 해협이 단순한 해운 통로가 아니라 지정학적 긴장이 직접 한국 상선에 영향을 미치는
              취약 지점임을 보여주었습니다.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">시사점</h2>
            <div className="bg-gray-800 rounded-xl p-5 border border-red-900">
              <p className="text-gray-300 text-sm leading-relaxed">
                한국케미호 사건은 호르무즈 해협의 안보 취약성을 다시 한번 부각시켰습니다.
                원유 수입의 약 70%를 중동에서 조달하는 한국으로서는 호르무즈 해협의 안정이
                국가 경제와 직결됩니다. 이 사건 이후 한국 정부는 청해부대의 작전 범위를 확대하고
                외교적 수단을 다각화하는 계기로 삼았습니다.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">관련 페이지</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/hormuz-blockade", label: "호르무즈 봉쇄 2026 현황" },
                { href: "/cheonghae-unit", label: "청해부대 호르무즈 파병" },
                { href: "/energy-security", label: "한국 에너지 안보 분석" },
                { href: "/", label: "실시간 선박 추적 지도" },
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
        </article>
      </main>
      <Footer />
    </div>
  );
}
