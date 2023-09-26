import fs from "fs"
import ReactMarkdown from "react-markdown"
import matter from "gray-matter"
import Head from "next/head"
import Image from "next/image"
import rehypeRaw from "rehype-raw"
import Box from "@mui/material/Box"
import { Chip } from "@mui/material"

export default function Blog({ frontmatter, markdown, isMobile }) {
  // Format the ISO date for display in the desired locale
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("es-MX")

  return (
    <div>
      <Head>
        <title>Demo Blog | {frontmatter.title}</title>
      </Head>
      <Box sx={{ paddingLeft: !isMobile ? 20: 5, paddingRight: !isMobile ? 20: 5 }}>
        <h1>{frontmatter.title}</h1>
        <span>{formattedDate}</span>
        <div className="featuredimage-wrapper">
          <Image
            className="featuredimg"
            src={frontmatter.featuredimage}
            alt={frontmatter.title}
            fill
          />
        </div>
        {frontmatter.tags?.map((tag) => (
          <Chip key={tag} label={tag} sx={{ color: "#fff" }} clickable />
        ))}

        <hr />
        <div className="content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk1}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk2}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk3}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk4}
          </ReactMarkdown>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {frontmatter.mk5}
          </ReactMarkdown>
        </div>
      </Box>
    </div>
  )
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const fileContent = matter(fs.readFileSync(`./blog/${slug}.md`, "utf8"))
    const frontmatter = fileContent.data
    const markdown = fileContent.content

    // Convert the Date object to a string in ISO 8601 format
    const dateString = frontmatter.date.toISOString()

    return {
      props: { frontmatter: { ...frontmatter, date: dateString }, markdown },
    }
  } catch (error) {
    console.error("Error reading file or parsing frontmatter:", error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./blog")

  // Getting the filenames excluding .md extension
  // and returning an array containing slug (the filename) as params for every route
  // It looks like this
  // paths = [
  //   { params: { slug: 'my-first-blog' }},
  //   { params: { slug: 'how-to-train-a-dragon' }},
  //   { params: { slug: 'how-to-catch-a-pokemon' }},
  // ]
  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf("."))
    return { params: { slug: filename } }
  })

  return {
    paths,
    fallback: false, // This shows a 404 page if the page is not found
  }
}
