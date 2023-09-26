// pages/categories/[category].js

import fs from "fs"
import path from "path"
import React from "react"
import matter from "gray-matter"

export default function CategoryPage({ matchingFiles }) {
  return (
    <div>
      <h1>Posts in this Category:</h1>
      {matchingFiles && matchingFiles.length > 0 ? (
        <ul>
          {matchingFiles.map((file, index) => (
            <li key={index}>{file.frontmatter.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts for this category</p>
      )}
    </div>
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

      if (
        frontmatter.categoria &&
        frontmatter.categoria.toLowerCase() === categorySlug
      ) {
        matchingFiles.push({
          frontmatter: { ...frontmatter, date: frontmatter.date.toISOString() },
          markdown: fileContent.content,
        })
      }
    }

    return {
      props: { matchingFiles },
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
