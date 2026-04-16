import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hormuz.codedanswer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/hormuz`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hormuz-strait`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vessel-tracking`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/energy-security`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/shipping-news`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shipping-news/hormuz-blockade-위험`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/shipping-news/crude-oil-transport`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/shipping-news/ais-vessel-tracking`,
      lastModified: new Date("2026-03-28"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
