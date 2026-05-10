/** @type {import('next').NextConfig} */
const path = require("path")

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Bundle blog markdown directories with the SSR sitemap function.
  // The tracer can't infer these from fs.readdirSync(variable) calls.
  outputFileTracingIncludes: {
    "/sitemap.xml": [
      path.join(__dirname, "blog", "**", "*.md"),
      path.join(__dirname, "feed-blog", "**", "*.md"),
    ],
  },
}
