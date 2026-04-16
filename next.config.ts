import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Leaflet은 React Strict Mode의 이중 마운트와 충돌함 — 개발/프로덕션 모두 비활성화
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.basemaps.cartocdn.com",
      },
    ],
  },
};

export default nextConfig;
