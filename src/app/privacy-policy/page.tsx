import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 호르무즈 해협 실시간 선박 추적 지도",
  description: "호르무즈 해협 실시간 선박 추적 지도 서비스의 개인정보처리방침입니다.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-14">
        <div className="max-w-3xl mx-auto px-4 py-12">

          <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
            <Link href="/" className="hover:text-gray-300 transition-colors">홈</Link>
            <span>/</span>
            <span className="text-gray-300">개인정보처리방침</span>
          </nav>

          <h1 className="text-2xl font-bold text-white mb-2">개인정보처리방침</h1>
          <p className="text-gray-500 text-sm mb-10">최종 업데이트: 2026년 4월 15일</p>

          <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

            <section>
              <h2 className="text-base font-semibold text-white mb-3">1. 개요</h2>
              <p>
                호르무즈 해협 실시간 선박 추적 지도(이하 서비스)는 이용자의 개인정보를 소중히 여기며,
                개인정보 보호법 및 관련 법령을 준수합니다. 본 방침은 서비스가 수집하는 정보의 종류,
                이용 방법, 보호 조치 등을 설명합니다.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">2. 수집하는 정보</h2>
              <p className="mb-3">서비스는 다음과 같은 정보를 수집할 수 있습니다:</p>
              <ul className="space-y-2">
                {[
                  { title: "자동 수집 정보", desc: "방문 페이지, 브라우저 유형, 운영체제, IP 주소(익명화), 접속 시간. 서비스 개선 및 통계 분석에 활용됩니다." },
                  { title: "쿠키 및 유사 기술", desc: "Google Analytics 및 광고 서비스(Google AdSense)가 쿠키를 사용합니다. 브라우저 설정에서 쿠키를 거부할 수 있으나 일부 기능이 제한될 수 있습니다." },
                  { title: "사용자 제공 정보", desc: "현재 이 서비스는 회원 가입, 로그인, 댓글 등 사용자가 직접 입력하는 기능을 제공하지 않습니다." },
                ].map((item) => (
                  <li key={item.title} className="bg-gray-800 rounded-lg p-4 border border-gray-700 list-none">
                    <p className="text-white font-medium mb-1">{item.title}</p>
                    <p className="text-gray-400">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">3. 정보 이용 목적</h2>
              <ul className="space-y-1.5">
                {[
                  "서비스 제공 및 유지, 개선",
                  "방문자 통계 분석 및 콘텐츠 최적화",
                  "광고 게재 및 광고 성과 측정",
                  "법적 의무 이행",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-400">
                    <span className="text-gray-600 mt-0.5">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">4. 제3자 서비스</h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Google Analytics",
                    desc: "방문자 통계 수집. Google의 개인정보처리방침이 적용됩니다.",
                  },
                  {
                    name: "aisstream.io",
                    desc: "실시간 AIS 선박 데이터를 제공합니다. 선박 위치 데이터만 처리하며 이용자 개인정보를 수집하지 않습니다.",
                  },
                ].map((item) => (
                  <div key={item.name} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <p className="text-white font-medium text-sm mb-1">{item.name}</p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">5. 쿠키 관리</h2>
              <p>
                대부분의 브라우저는 쿠키를 수락하도록 기본 설정되어 있습니다.
                브라우저 설정에서 쿠키를 거부하거나 삭제할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">6. 데이터 보관</h2>
              <p>
                자동 수집 데이터(Analytics)는 Google의 보관 정책에 따라 최대 26개월간 보관됩니다.
                서버 접속 로그는 최대 90일간 보관 후 파기됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">7. 이용자 권리</h2>
              <p>
                이용자는 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요청할 권리가 있습니다.
                요청이나 문의사항은 아래 연락처로 보내주십시오.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">8. 아동의 개인정보</h2>
              <p>
                이 서비스는 만 14세 미만 아동을 대상으로 개인정보를 수집하거나 처리하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">9. 방침 변경</h2>
              <p>
                본 개인정보처리방침은 관련 법령 또는 서비스 변경 시 업데이트될 수 있습니다.
                변경 시 본 페이지에 게시하며, 중요한 변경의 경우 별도 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-3">10. 문의</h2>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400">개인정보 관련 문의는 아래로 연락해 주세요.</p>
                <p className="text-gray-400 mt-2">서비스명: 호르무즈 해협 실시간 선박 추적 지도</p>
                <p className="text-gray-400 mt-1">이메일: brianpage.kr@gmail.com</p>
              </div>
            </section>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-800">
            <Link href="/" className="text-sm text-brand-400 hover:underline">홈으로 돌아가기</Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
