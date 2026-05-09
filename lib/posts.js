import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Order matters: earlier directories win on slug collision.
// Manual posts in `blog/` take precedence over feed imports in `feed-blog/`.
const POST_DIRS = ["blog", "feed-blog"]

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
  for (const dir of POST_DIRS) {
    const candidate = path.join(dir, `${slug}.md`)
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

export function readPostBySlug(slug) {
  const filepath = getPostFilePath(slug)
  if (!filepath) return null
  const file = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(file)
  return { frontmatter: data, content, filepath }
}

export function getAllPostFiles() {
  const seen = new Set()
  const entries = []
  for (const dir of POST_DIRS) {
    for (const filename of readDirSafe(dir)) {
      const slug = slugFromFilename(filename)
      if (seen.has(slug)) continue
      seen.add(slug)
      entries.push({ slug, dir, filename, filepath: path.join(dir, filename) })
    }
  }
  return entries
}

export function getAllPosts() {
  return getAllPostFiles().map(({ slug, filepath }) => {
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
    }
  })
}

export function getAllSlugs() {
  return getAllPostFiles().map(({ slug }) => slug)
}
