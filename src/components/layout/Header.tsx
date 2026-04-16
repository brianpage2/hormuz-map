import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl">🚢</span>
          <span className="font-bold text-white text-base">
            호르무즈 <span className="text-brand-400">해협</span>
          </span>
          <span className="hidden sm:inline text-gray-500 text-sm">실시간 선박 추적</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            지도
          </Link>
          <Link
            href="/hormuz"
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            호르무즈란?
          </Link>
          <Link
            href="/shipping-news"
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            해운 뉴스
          </Link>
          <Link
            href="/vessel-tracking"
            className="hidden md:block px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            사용 방법
          </Link>
        </nav>
      </div>
    </header>
  );
}
