import { getAllPostFiles } from "@/lib/posts"
import fs from "fs"
import matter from "gray-matter"

const SITE_URL = "https://www.3minread.com"

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function encodePathSegment(segment) {
  return segment.split("/").map(encodeURIComponent).join("/")
}

function buildUrl(path) {
  return escapeXml(`${SITE_URL}${path}`)
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [`    <loc>${loc}</loc>`]
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`)
  if (priority) parts.push(`    <priority>${priority}</priority>`)
  return `  <url>\n${parts.join("\n")}\n  </url>`
}

function generateSiteMap(posts, categories, tags) {
  const entries = [
    urlEntry({
      loc: buildUrl(""),
      changefreq: "daily",
      priority: "1.0",
    }),
    urlEntry({
      loc: buildUrl("/privacy"),
      changefreq: "yearly",
      priority: "0.3",
    }),
    ...categories.map((category) =>
      urlEntry({
        loc: buildUrl(`/categories/${encodePathSegment(category)}`),
        changefreq: "weekly",
        priority: "0.7",
      })
    ),
    ...tags.map((tag) =>
      urlEntry({
        loc: buildUrl(`/tags/${encodePathSegment(tag)}`),
        changefreq: "weekly",
        priority: "0.5",
      })
    ),
    ...posts.map((post) =>
      urlEntry({
        loc: buildUrl(`/${encodePathSegment(post.slug)}`),
        lastmod: post.date,
        changefreq: "monthly",
        priority: "0.8",
      })
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`
}

function removeSpecialCharactersAndLowerCase(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

export async function getServerSideProps({ res }) {
  const categories = new Set()
  const tags = new Set()

  const posts = getAllPostFiles().map(({ slug, filepath }) => {
    const { data: frontmatter } = matter(fs.readFileSync(filepath, "utf8"))

    if (frontmatter.categoria) {
      categories.add(frontmatter.categoria.toLowerCase())
    }
    if (frontmatter.tags) {
      frontmatter.tags.forEach((tag) => {
        const tagSlug = removeSpecialCharactersAndLowerCase(tag)
        if (tagSlug) tags.add(tagSlug)
      })
    }

    const date = frontmatter.date
      ? new Date(frontmatter.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]

    return { slug, date }
  })

  const sitemap = generateSiteMap(
    posts,
    Array.from(categories),
    Array.from(tags)
  )

  res.setHeader("Content-Type", "application/xml; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
  )
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {
  // This component will not render since getServerSideProps writes the response
}
