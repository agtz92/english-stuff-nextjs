import fs from "fs"
import path from "path"
import React from "react"
import matter from "gray-matter"
import { Box, Grid } from "@mui/material"
import Link from "next/link"
import Head from "next/head"
import LargeCard from "@/components/LargeCard"
import { sitename } from "@/components/siteData"

export default function CategoryPage({ matchingFiles, category, isMobile }) {
  // Sort the blogs by date in descending order
  const sortedBlogs = matchingFiles?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  return (
    <Box
      sx={{ marginLeft: !isMobile ? 20 : 5, marginRight: !isMobile ? 20 : 5 }}
    >
      <Head>
        <title>{sitename} | {category}</title>
      </Head>
      <h1 style={{ textAlign: "center", fontWeight: 600 }}>
        {category.toUpperCase()}
      </h1>

      <Grid container spacing={2}>
        {sortedBlogs?.map((file, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Link href={`/${file.slug}`}>
              <LargeCard post={file} height={'600px'}/>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export async function getStaticProps({ params: { category } }) {
  try {
    const categorySlug = category.toLowerCase()
    const files = fs.readdirSync("./blog")
    const matchingFiles = []

    for (const file of files) {
      const fileContent = matter(
        fs.readFileSync(path.join("./blog", file), "utf8")
      )
      const frontmatter = fileContent.data
      const shortDescription = frontmatter["short-description"] || ""

      if (
        frontmatter.categoria &&
        frontmatter.categoria.toLowerCase() === categorySlug
      ) {
        const slug = file.slice(0, file.indexOf("."))
        matchingFiles.push({
          slug,
          category: frontmatter.categoria,
          categoria: frontmatter.categoria,
          title: frontmatter.title,
          date: frontmatter.date.toISOString(),
          featuredimage: frontmatter.featuredimage,
          markdown: fileContent.content,
          shortDescription,
        })
      }
    }

    return {
      props: { matchingFiles, category: category },
    }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const files = fs.readdirSync("./blog")
  const categories = new Set()

  for (const file of files) {
    const fileContent = matter(
      fs.readFileSync(path.join("./blog", file), "utf8")
    )
    const frontmatter = fileContent.data

    if (frontmatter.categoria) {
      categories.add(frontmatter.categoria.toLowerCase())
    }
  }

  const paths = Array.from(categories).map((category) => ({
    params: { category },
  }))

  return {
    paths,
    fallback: true, // Allow for custom handling of 404-like cases
  }
}
