import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const SITE_URL = "https://hormuz.codedanswer.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "호르무즈 실시간 선박 확인 | 호르무즈 해협 선박 실시간 확인 사이트",
    template: "%s | 호르무즈 실시간 선박 확인",
  },
  description:
    "호르무즈 실시간 선박 확인 · 호르무즈 실시간 선박 확인 사이트 · 호르무즈 해협 선박 실시간 확인. AIS 데이터로 유조선·컨테이너선 현재 위치를 추적합니다.",
  keywords: [
    "호르무즈 실시간 선박 확인",
    "호르무즈 실시간 선박 확인 사이트",
    "호르무즈 해협 선박 실시간 확인",
    "호르무즈",
    "호르무즈 해협",
    "실시간 선박 추적",
    "선박 위치",
    "AIS",
    "유조선",
    "해운",
    "페르시아만",
    "중동 해운",
    "에너지 안보",
  ],
  authors: [{ name: "호르무즈 해협 지도" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "호르무즈 해협 실시간 선박 추적 지도",
    title: "호르무즈 실시간 선박 확인 | 호르무즈 해협 선박 실시간 확인",
    description:
      "호르무즈 실시간 선박 확인 사이트. 호르무즈 해협 선박 실시간 확인 — AIS 데이터로 유조선·컨테이너선 현재 위치 추적.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "호르무즈 실시간 선박 확인",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "호르무즈 실시간 선박 확인 | 호르무즈 해협 선박 실시간 확인",
    description:
      "호르무즈 실시간 선박 확인 사이트. AIS 데이터로 유조선·컨테이너선 현재 위치 추적.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  verification: {
    google: "kH_f_H40AB2eRmZe0M1mgAm-8lVP331tL20dAwtbvEk",
    other: {
      "naver-site-verification": "e144a779a15bd8a66ef6854cce6160e542e5177b",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className={`${notoSansKR.variable} font-sans antialiased bg-gray-900 text-gray-100`}>
        <ScrollToTop />
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6449761611054213"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
