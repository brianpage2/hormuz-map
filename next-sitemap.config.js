/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://hormuz.codedanswer.com",
  generateRobotsTxt: true,
  changefreq: "hourly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/호르무즈"),
    await config.transform(config, "/호르무즈-해협"),
    await config.transform(config, "/실시간-선박-추적"),
    await config.transform(config, "/에너지-안보"),
    await config.transform(config, "/해운-뉴스"),
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/"] },
    ],
  },
};
