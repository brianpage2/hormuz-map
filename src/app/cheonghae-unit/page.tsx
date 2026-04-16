export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "청해부대 호르무즈 파병 — 한국 해군 중동 활동 완전 정리",
  description:
    "청해부대의 호르무즈 해협 파병 배경, 임무, 활동 내역을 정리합니다. 2009년부터 아덴만에 파병된 청해부대가 2020년 호르무즈 해협까지 작전 구역을 확대한 경위를 알아보세요.",
  keywords: [
    "청해부대", "청해부대 호르무즈", "청해부대 파병", "한국 해군 중동",
    "호르무즈 파병", "아덴만 청해부대", "한국 상선 보호",
  ],
  openGraph: {
    title: "청해부대 호르무즈 파병 — 한국 해군 중동 활동",
    description: "청해부대 파병 배경, 임무, 호르무즈 해협 작전 구역 확대 경위 완전 정리.",
    type: "article",
    locale: "ko_KR",
  },
};

export default function CheonghaeUnitPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-14">
        <article className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-2 text-gray-500 text-xs">한국 해운 안보</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            청해부대 호르무즈 파병
          </h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            청해부대(淸海部隊, Cheonghae Unit)는 2009년부터 소말리아 아덴만 해역에 파병된 대한민국 해군 부대입니다.
            2020년부터 작전 구역이 호르무즈 해협 인근까지 확대되어 중동 해역에서 한국 상선을 보호하고 있습니다.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">청해부대 개요</h2>
            <div className="space-y-4">
              {[
                { title: "창설 배경", desc: "소말리아 해적으로 인해 아덴만을 통과하는 한국 상선 피해가 급증하자, 대한민국 국회는 2009년 해군 파병을 승인했습니다. 청해부대는 같은 해 3월 처음 아덴만에 출동했습니다." },
                { title: "부대 구성", desc: "구축함 1척과 특수전대원, 해군 항공대 헬기 등으로 구성됩니다. 4~6개월 단위로 교대 파병됩니다." },
                { title: "호르무즈 작전 구역 확대", desc: "2020년 1월 한국 정부는 청해부대의 작전 구역을 아덴만에서 호르무즈 해협 인근 해역까지 확대했습니다. 이란의 한국 선박 억류 위협에 대응한 조치입니다." },
                { title: "주요 임무", desc: "한국 상선의 안전 항행 지원, 해상 인명 구조, 역내 국가 해군과의 협력, 해적 행위 억제 활동을 담당합니다." },
              ].map((item) => (
                <div key={item.title} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">한국케미호 사건과 청해부대</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              2021년 1월 이란 혁명수비대가 호르무즈 해협 공해상에서 한국 유조선 MT 한국케미호를 나포했습니다.
              대한민국 국방부는 즉시 청해부대 최영함을 호르무즈 해협 인근으로 출동시켜 협상 과정을 지원했습니다.
            </p>
            <Link href="/hankuk-chemi" className="text-red-400 hover:underline text-sm">
              한국케미호 나포 사건 자세히 보기 →
            </Link>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">관련 페이지</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/hormuz-blockade", label: "호르무즈 봉쇄 2026 현황" },
                { href: "/hankuk-chemi", label: "한국케미호 나포 사건" },
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
