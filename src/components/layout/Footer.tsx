import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* 사이트 소개 */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-white mb-2">호르무즈 해협 지도</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              AIS 데이터 기반 실시간 선박 위치 추적 서비스.
              호르무즈 해협을 통과하는 유조선·화물선을 한눈에 확인하세요.
            </p>
          </div>

          {/* 주요 페이지 */}
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">서비스</p>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">실시간 지도</Link></li>
              <li><Link href="/hormuz" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">호르무즈 해협</Link></li>
              <li><Link href="/vessel-tracking" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">선박 추적 방법</Link></li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">정보</p>
            <ul className="space-y-2">
              <li><Link href="/hormuz-blockade" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">호르무즈 봉쇄</Link></li>
              <li><Link href="/energy-security" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">에너지 안보</Link></li>
              <li><Link href="/cheonghae-unit" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">청해부대</Link></li>
              <li><Link href="/hankuk-chemi" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">한국케미호 사건</Link></li>
              <li><Link href="/shipping-news" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">해운 뉴스</Link></li>
              <li><Link href="/hormuz-strait" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">해협 정보</Link></li>
            </ul>
          </div>

          {/* 법적 */}
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">법적 고지</p>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">개인정보처리방침</Link></li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2026 호르무즈 해협 실시간 선박 추적 지도. AIS 데이터는 참고용이며 실제 항법에 사용하지 마세요.
          </p>
          <p className="text-gray-700 text-xs">
            지도 데이터: © <a href="https://www.openstreetmap.org/copyright" className="hover:text-gray-500 transition-colors" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions" className="hover:text-gray-500 transition-colors" target="_blank" rel="noopener noreferrer">CARTO</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
