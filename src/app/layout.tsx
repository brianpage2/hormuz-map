import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "호르무즈 해협 실시간 선박 추적 지도 | 한국 해운 정보",
    template: "%s | 호르무즈 해협 선박 추적",
  },
  description:
    "호르무즈 해협 실시간 선박 위치 추적 지도. AIS 데이터로 유조선, 컨테이너선, 화물선의 현재 위치를 확인하세요. 한국 에너지 안보에 중요한 중동 해운 정보를 제공합니다.",
  keywords: [
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
    title: "호르무즈 해협 실시간 선박 추적 지도",
    description:
      "호르무즈 해협 실시간 선박 위치 추적. AIS 데이터로 유조선·컨테이너선 현재 위치 확인.",
  },
  twitter: {
    card: "summary_large_image",
    title: "호르무즈 해협 실시간 선박 추적 지도",
    description:
      "호르무즈 해협 실시간 선박 위치 추적. AIS 데이터로 유조선·컨테이너선 현재 위치 확인.",
  },
  verification: {
    google: "kH_f_H40AB2eRmZe0M1mgAm-8lVP331tL20dAwtbvEk",
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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6449761611054213"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased bg-gray-900 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
