import fs from "fs"
import matter from "gray-matter"

const SITE_URL = "https://www.3minread.com"

function generateSiteMap(posts, categories, tags) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  ${categories
    .map(
      (category) => `
  <url>
    <loc>${SITE_URL}/categories/${category}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
  ${tags
    .map(
      (tag) => `
  <url>
    <loc>${SITE_URL}/tags/${tag}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    )
    .join("")}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`
}

function removeSpecialCharactersAndLowerCase(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

export async function getServerSideProps({ res }) {
  const files = fs.readdirSync("./blog").filter((f) => !f.startsWith("."))
  const categories = new Set()
  const tags = new Set()

  const posts = files.map((file) => {
    const content = matter(fs.readFileSync(`./blog/${file}`, "utf8"))
    const frontmatter = content.data
    const slug = file.slice(0, file.indexOf("."))

    if (frontmatter.categoria) {
      categories.add(frontmatter.categoria.toLowerCase())
    }
    if (frontmatter.tags) {
      frontmatter.tags.forEach((tag) => {
        tags.add(removeSpecialCharactersAndLowerCase(tag))
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

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {
  // This component will not render since getServerSideProps writes the response
}
