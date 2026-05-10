import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Order matters: earlier directories win on slug collision.
// Manual posts in `blog/` take precedence over feed imports in `feed-blog/`.
// `source` is the short name kept stable across the codebase; `absPath` is
// resolved against process.cwd() so file reads work both at build time and
// inside serverless functions (where the runtime cwd isn't the project root).
const POST_DIRS = [
  { source: "blog", absPath: path.join(process.cwd(), "blog") },
  { source: "feed-blog", absPath: path.join(process.cwd(), "feed-blog") },
]

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir).filter((f) => !f.startsWith("."))
  } catch (err) {
    if (err.code === "ENOENT") return []
    throw err
  }
}

function slugFromFilename(filename) {
  const dot = filename.indexOf(".")
  return dot === -1 ? filename : filename.slice(0, dot)
}

function toIsoDate(value) {
  if (!value) return ""
  const d = value instanceof Date ? value : new Date(value)
  return isNaN(d.getTime()) ? "" : d.toISOString()
}

export function getPostFilePath(slug) {
  for (const { absPath } of POST_DIRS) {
    const candidate = path.join(absPath, `${slug}.md`)
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

export function readPostBySlug(slug) {
  for (const { source, absPath } of POST_DIRS) {
    const filepath = path.join(absPath, `${slug}.md`)
    if (!fs.existsSync(filepath)) continue
    const file = fs.readFileSync(filepath, "utf8")
    const { data, content } = matter(file)
    return { frontmatter: data, content, filepath, source }
  }
  return null
}

export function getAllPostFiles() {
  const seen = new Set()
  const entries = []
  for (const { source, absPath } of POST_DIRS) {
    for (const filename of readDirSafe(absPath)) {
      const slug = slugFromFilename(filename)
      if (seen.has(slug)) continue
      seen.add(slug)
      entries.push({
        slug,
        dir: source,
        filename,
        filepath: path.join(absPath, filename),
      })
    }
  }
  return entries
}

export function getAllPosts() {
  return getAllPostFiles().map(({ slug, filepath, dir }) => {
    const { data } = matter(fs.readFileSync(filepath, "utf8"))
    const isoDate = toIsoDate(data.date)
    return {
      ...data,
      slug,
      date: isoDate,
      formattedDate: isoDate
        ? new Date(isoDate).toLocaleDateString("en-US")
        : "",
      shortDescription: data["short-description"] || "",
      source: dir,
    }
  })
}

// Lean projection for list/index pages — excludes mk1–mk5 bodies.
// Cuts the JSON payload from ~3 MB to ~50 KB on the homepage.
export function getAllPostsList() {
  return getAllPostFiles().map(({ slug, filepath, dir }) => {
    const { data } = matter(fs.readFileSync(filepath, "utf8"))
    const isoDate = toIsoDate(data.date)
    return {
      slug,
      title: data.title || "",
      date: isoDate,
      formattedDate: isoDate
        ? new Date(isoDate).toLocaleDateString("en-US")
        : "",
      featuredimage: data.featuredimage || "",
      categoria: data.categoria || "",
      deals: data.deals || "No",
      tags: data.tags || [],
      shortDescription: data["short-description"] || "",
      source: dir,
    }
  })
}

export function getAllSlugs() {
  return getAllPostFiles().map(({ slug }) => slug)
}
