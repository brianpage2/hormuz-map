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
    additionalSitemaps: [],
    transformRobotsTxt: async (_, robotsTxt) => {
      return robotsTxt + "\n#DaumWebMasterTool:7043c88b54e2949b64c3db0af938f9e289d2e365e9783220b903daea9c28c7e1:sX5P2rLT+4My4l7jrk4xWw==\n";
    },
  },
};
