import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "실시간 선박 추적 — AIS 지도 사용 방법 완전 가이드",
  description:
    "호르무즈 해협 실시간 선박 추적 지도 사용법. AIS란 무엇인지, 선박 색상 의미, 팝업 정보 읽는 법까지 쉽게 설명합니다. 지금 유조선·화물선 위치를 확인하세요.",
  keywords: [
    "실시간 선박 추적",
    "AIS 선박 추적",
    "선박 위치 조회",
    "유조선 위치",
    "선박 추적 방법",
    "AIS란",
    "호르무즈 선박",
  ],
  openGraph: {
    title: "실시간 선박 추적 — AIS 지도 사용 방법 완전 가이드",
    description: "AIS 실시간 선박 추적 지도 사용법. 선박 색상·팝업 정보 읽는 법 완전 가이드.",
    type: "article",
    locale: "ko_KR",
    images: [{ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hormuz_strait.jpg/1200px-Hormuz_strait.jpg", width: 1200, height: 800, alt: "호르무즈 해협 실시간 선박 추적 지도" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "호르무즈 해협 실시간 선박 추적 지도 사용 방법",
  description: "AIS 기반 실시간 선박 추적 지도를 사용해 호르무즈 해협 통과 선박을 모니터링하는 방법",
  inLanguage: "ko",
  step: [
    { "@type": "HowToStep", name: "지도 열기", text: "홈페이지에서 실시간 지도를 엽니다." },
    { "@type": "HowToStep", name: "선박 아이콘 확인", text: "색상으로 선종(유조선·화물선·컨테이너선)을 구분합니다." },
    { "@type": "HowToStep", name: "선박 클릭", text: "선박 아이콘을 클릭해 이름, 국적, 속도, 목적지를 확인합니다." },
    { "@type": "HowToStep", name: "데이터 갱신 확인", text: "데이터는 30초마다 자동 갱신됩니다." },
  ],
};

const vesselTypes = [
  { color: "bg-yellow-400", label: "황색 (유조선)", desc: "VLCC, 원유 운반선, LNG 운반선. 중동 원유를 아시아로 수송하는 선박." },
  { color: "bg-cyan-400", label: "청록색 (화물선)", desc: "일반화물선, 벌크선, 화학제품 운반선 등 다양한 화물을 취급하는 선박." },
  { color: "bg-blue-400", label: "파란색 (컨테이너선)", desc: "컨테이너를 적재해 소비재, 전자제품 등을 운반하는 정기선." },
  { color: "bg-gray-400", label: "회색 (기타)", desc: "여객선, 예인선, 해군함정, 크루즈선, 분류 불명 선박 등." },
];

export default function RealTimeTrackingPage() {
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
              <span className="text-gray-300">실시간 선박 추적</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              실시간 선박 추적
              <br />
              <span className="text-brand-400">AIS 지도 사용 방법</span> 완전 가이드
            </h1>
            <p className="text-gray-400 text-sm mb-8">최종 업데이트: 2026년 4월</p>

            {/* 바로 지도로 */}
            <div className="bg-brand-900/30 border border-brand-700/50 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-medium text-sm">지금 바로 실시간 지도 확인하기</p>
                <p className="text-gray-400 text-xs mt-1">호르무즈 해협을 통과하는 선박들을 AIS 데이터로 실시간 추적합니다.</p>
              </div>
              <Link
                href="/"
                className="shrink-0 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                실시간 지도 열기 →
              </Link>
            </div>

            <article className="space-y-8 text-gray-300 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">AIS란 무엇인가요?</h2>
                <p>
                  AIS(Automatic Identification System, 선박자동식별장치)는 선박 간 충돌 방지와
                  해상 교통 관제를 위해 국제해사기구(IMO)가 의무화한 시스템입니다.
                  300톤 이상의 국제 항해 선박과 모든 여객선에 설치가 의무화되어 있습니다.
                </p>
                <p className="mt-3">
                  AIS 트랜스폰더는 VHF 무선 주파수(161.975 MHz, 162.025 MHz)를 통해
                  선박의 위치(GPS), 속도, 침로(방향), 선박 이름, MMSI 번호, 선종, 출발지·목적지 등의
                  정보를 약 2~10초 간격으로 주변 선박과 연안 기지국에 자동으로 송출합니다.
                </p>
                <p className="mt-3">
                  이 사이트는 <strong className="text-white">aisstream.io</strong>의 글로벌 AIS 네트워크를
                  통해 수신된 실시간 데이터를 지도에 표시합니다. 위성 AIS와 지상 기지국을 복합 활용하므로
                  호르무즈 해협의 거의 모든 선박을 커버합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">선박 아이콘 색상 의미</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {vesselTypes.map((v) => (
                    <div key={v.label} className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex gap-3">
                      <div className={`w-3 h-3 rounded-full ${v.color} mt-0.5 shrink-0`} />
                      <div>
                        <p className="text-sm font-medium text-white mb-1">{v.label}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  아이콘의 삼각형 방향이 선박의 실제 진행 방향을 나타냅니다.
                  빠른 속도로 이동 중인 선박은 아이콘이 더 진하게 표시됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">팝업 정보 읽는 법</h2>
                <p>
                  지도에서 선박 아이콘을 클릭하면 한국어 팝업이 나타납니다. 팝업에는 다음 정보가 포함됩니다:
                </p>
                <div className="mt-4 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {[
                    { field: "선박명", desc: "AIS에 등록된 공식 선박 이름" },
                    { field: "국적", desc: "선박 등록 국가 (깃발 국가)" },
                    { field: "선종", desc: "유조선, 화물선, 컨테이너선, LNG선 등" },
                    { field: "속도", desc: "현재 대수속력 (노트, 1노트 ≈ 1.85 km/h)" },
                    { field: "침로", desc: "현재 진행 방향 (0~359°, 북쪽=0°)" },
                    { field: "목적지", desc: "선장이 입력한 목적 항구명 (미입력일 수 있음)" },
                    { field: "위치", desc: "현재 위도·경도 (소수점 4자리 정밀도)" },
                    { field: "갱신시각", desc: "마지막 AIS 신호 수신 시각" },
                  ].map((row, i) => (
                    <div key={row.field} className={`flex gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}`}>
                      <span className="text-brand-400 font-medium w-16 shrink-0">{row.field}</span>
                      <span className="text-gray-400">{row.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">데이터 갱신 및 정확성</h2>
                <p>
                  AIS 데이터는 약 30초~2분 간격으로 갱신됩니다. 선박의 위치는 GPS 기반이므로
                  수십 미터 수준의 정밀도를 가집니다. 다만 다음 상황에서 데이터가 누락될 수 있습니다:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    "선박이 AIS를 의도적으로 끈 경우 (일부 군함, 의심 선박)",
                    "위성 커버리지 사각지대를 통과 중인 경우",
                    "기기 오작동 또는 통신 장애",
                    "대형 선박 뒤에 가려진 소형 선박의 전파 간섭",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-400">
                      <span className="text-gray-600 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-400 bg-gray-800 rounded-lg p-4 border border-gray-700">
                  이 지도는 정보 제공 목적으로만 사용하세요. 실제 항법이나 선박 충돌 회피에 사용하지 마세요.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">지도 조작 방법</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {[
                    { action: "확대/축소", how: "마우스 휠 스크롤 또는 +/- 버튼" },
                    { action: "지도 이동", how: "마우스 드래그 또는 터치 스와이프" },
                    { action: "선박 정보", how: "선박 아이콘 클릭" },
                    { action: "팝업 닫기", how: "팝업 외부 클릭 또는 ✕ 버튼" },
                    { action: "모바일 확대", how: "두 손가락 핀치 줌" },
                    { action: "전체화면", how: "지도 우측 상단 전체화면 버튼" },
                  ].map((item) => (
                    <div key={item.action} className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex gap-3 text-sm">
                      <span className="text-brand-400 font-medium w-24 shrink-0">{item.action}</span>
                      <span className="text-gray-400">{item.how}</span>
                    </div>
                  ))}
                </div>
              </section>

            </article>

            <section className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">관련 페이지</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/", label: "실시간 지도", desc: "지금 바로 선박 위치 확인" },
                  { href: "/hormuz", label: "호르무즈란?", desc: "해협의 중요성 이해하기" },
                  { href: "/shipping-news", label: "해운 뉴스", desc: "최신 호르무즈 해운 소식" },
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
