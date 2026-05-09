#!/usr/bin/env node
/**
 * Imports posts from a Soro RSS feed into ./feed-blog as Markdown files
 * with the same frontmatter shape as ./blog posts.
 *
 * Usage:
 *   pnpm import:soro                  # uses default SORO_FEED_URL
 *   SORO_FEED_URL=<url> pnpm import:soro
 *   pnpm import:soro --overwrite      # rewrites existing feed-blog/*.md files
 *   pnpm import:soro --limit=20       # only import N most recent items
 */

const fs = require("fs")
const path = require("path")
const Parser = require("rss-parser")
const TurndownService = require("turndown")
const matter = require("gray-matter")

const DEFAULT_FEED_URL =
  "https://app.trysoro.com/api/rss/0d823807-6606-4f31-a874-68c07faaff55"

const FEED_URL = process.env.SORO_FEED_URL || DEFAULT_FEED_URL
const FEED_DIR = path.join(process.cwd(), "feed-blog")
const BLOG_DIR = path.join(process.cwd(), "blog")
const DEFAULT_CATEGORY = "News"
const MAX_BODY_SECTIONS = 5

const args = process.argv.slice(2)
const OVERWRITE = args.includes("--overwrite")
const LIMIT = (() => {
  const flag = args.find((a) => a.startsWith("--limit="))
  return flag ? parseInt(flag.split("=")[1], 10) : null
})()

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

function existingSlugs() {
  const seen = new Set()
  for (const dir of [BLOG_DIR, FEED_DIR]) {
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(".") || !f.endsWith(".md")) continue
      seen.add(f.slice(0, -3))
    }
  }
  return seen
}

function pickFeaturedImage(item, htmlBody) {
  if (item.enclosure && item.enclosure.url) return item.enclosure.url
  if (item["media:content"] && item["media:content"].$ && item["media:content"].$.url) {
    return item["media:content"].$.url
  }
  if (item["media:thumbnail"] && item["media:thumbnail"].$ && item["media:thumbnail"].$.url) {
    return item["media:thumbnail"].$.url
  }
  if (htmlBody) {
    const m = htmlBody.match(/<img[^>]+src=["']([^"']+)["']/i)
    if (m) return m[1]
  }
  return ""
}

function pickCategory(item) {
  if (Array.isArray(item.categories) && item.categories.length > 0) {
    const c = item.categories[0]
    return typeof c === "string" ? c : c?.name || c?._ || DEFAULT_CATEGORY
  }
  return DEFAULT_CATEGORY
}

function pickTags(item) {
  if (!Array.isArray(item.categories)) return []
  return item.categories
    .map((c) => (typeof c === "string" ? c : c?.name || c?._))
    .filter(Boolean)
}

function shortDescription(item, htmlBody) {
  const source = item.contentSnippet || item.summary || ""
  if (source) return source.replace(/\s+/g, " ").trim().slice(0, 280)
  if (htmlBody) {
    const text = htmlBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    return text.slice(0, 280)
  }
  return ""
}

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "*",
  emDelimiter: "_",
})

function splitBodyIntoSections(html) {
  if (!html) return Array(MAX_BODY_SECTIONS).fill("")
  const parts = html.split(/(?=<h2[\s>])/i).filter((p) => p.trim().length > 0)
  const sections = parts.length > 0 ? parts : [html]

  const markdownSections = sections.map((s) => turndown.turndown(s).trim())

  const out = Array(MAX_BODY_SECTIONS).fill("")
  for (let i = 0; i < markdownSections.length; i++) {
    const slot = Math.min(i, MAX_BODY_SECTIONS - 1)
    out[slot] = out[slot]
      ? `${out[slot]}\n\n${markdownSections[i]}`
      : markdownSections[i]
  }
  return out
}

function buildFrontmatter(item, htmlBody) {
  const tags = pickTags(item)
  const fm = {
    title: item.title || "Untitled",
    date: item.isoDate || item.pubDate || new Date().toISOString(),
    featuredimage: pickFeaturedImage(item, htmlBody),
    categoria: pickCategory(item),
    deals: "No",
    tags: tags.length ? tags : undefined,
    "short-description": shortDescription(item, htmlBody),
  }
  const body = splitBodyIntoSections(htmlBody)
  for (let i = 0; i < MAX_BODY_SECTIONS; i++) {
    fm[`mk${i + 1}`] = body[i] || ""
  }
  return fm
}

async function main() {
  if (!fs.existsSync(FEED_DIR)) fs.mkdirSync(FEED_DIR, { recursive: true })

  console.log(`Fetching feed: ${FEED_URL}`)
  const parser = new Parser({
    customFields: {
      item: [
        ["content:encoded", "contentEncoded"],
        ["media:content", "media:content"],
        ["media:thumbnail", "media:thumbnail"],
      ],
    },
  })

  let feed
  try {
    feed = await parser.parseURL(FEED_URL)
  } catch (err) {
    console.error("Failed to fetch/parse feed:", err.message)
    if (err.message && err.message.includes("403")) {
      console.error(
        "Hint: the Soro feed appears disabled. Enable it in the Soro dashboard and retry."
      )
    }
    process.exit(1)
  }

  let items = feed.items || []
  if (LIMIT) items = items.slice(0, LIMIT)
  console.log(`Feed: "${feed.title}" — ${items.length} items`)

  const taken = existingSlugs()
  let written = 0
  let skipped = 0

  for (const item of items) {
    const baseSlug = slugify(item.title || item.guid || String(Date.now()))
    if (!baseSlug) {
      console.warn(`  - skip: empty slug for "${item.title}"`)
      skipped++
      continue
    }

    const existsInBlog = fs.existsSync(path.join(BLOG_DIR, `${baseSlug}.md`))
    const existsInFeed = fs.existsSync(path.join(FEED_DIR, `${baseSlug}.md`))

    if (existsInBlog) {
      console.log(`  - skip (blog wins): ${baseSlug}`)
      skipped++
      continue
    }
    if (existsInFeed && !OVERWRITE) {
      console.log(`  - skip (already imported): ${baseSlug}`)
      skipped++
      continue
    }

    const html = item.contentEncoded || item.content || item.summary || ""
    const fm = buildFrontmatter(item, html)
    const fileText = matter.stringify("", fm)
    const dest = path.join(FEED_DIR, `${baseSlug}.md`)
    fs.writeFileSync(dest, fileText, "utf8")
    taken.add(baseSlug)
    written++
    console.log(`  + ${baseSlug}`)
  }

  console.log(`\nDone. ${written} written, ${skipped} skipped.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
