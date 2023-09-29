import fs from "fs"
import ReactMarkdown from "react-markdown"
import matter from "gray-matter"
import Head from "next/head"
import Image from "next/image"
import rehypeRaw from "rehype-raw"
import Box from "@mui/material/Box"
import { Chip, Grid } from "@mui/material"
import Link from "next/link"

export default function Blog({ frontmatter, markdown, isMobile }) {
  // Format the ISO date for display in the desired locale
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US")

  // Define the cleanAndLowercaseString function
  function cleanAndLowercaseString(inputString) {
    // Remove special characters, spaces, and "#" if found
    const cleanedString = inputString
      .replace(/[^a-zA-Z0-9]+/g, "")
      .toLowerCase()

    // Split the string by words and join them with hyphens
    const words = cleanedString.split(/\s+/)
    const transformedString = words.join("-")

    return transformedString
  }

  return (
    <div>
      <Head>
        <title>Demo Blog | {frontmatter.title}</title>
      </Head>
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{
          paddingLeft: !isMobile ? 40 : 5,
          paddingRight: !isMobile ? 40 : 5,
        }}
      >
        <h1 style={{ fontSize: "3em", margin: 0 }}>{frontmatter.title}</h1>
        <Box
          display={"flex"}
          alignContent={"left"}
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          <Chip
            label={frontmatter.categoria}
            clickable
            component={Link}
            href={`/categories/${frontmatter.categoria.toLowerCase()}`}
          />
        </Box>

        <span style={{ color: "#444", fontSize: "12px" }}>
          Updated: {formattedDate}
        </span>
        <Box sx={{ minHeight: "40px" }} />
        <div className="postimage-wrapper">
          <Image
            className="postimg"
            src={frontmatter.featuredimage}
            alt={frontmatter.title}
            fill
          />
        </div>

        <Grid
          container
          spacing={2}
          sx={{ marginTop: !isMobile ? 1 : 2}}
        >
          {frontmatter.tags?.map((tag) => (
            <Grid key={tag} item xs={3} md={1}>
              <Chip
                component={Link}
                href={`/tags/${cleanAndLowercaseString(tag)}`}
                label={tag}
                sx={{ marginRight: 1, marginBottom: !isMobile ? 0 : 2 }}
                clickable
              />
            </Grid>
          ))}
        </Grid>

        <Box display={"flex"} flexDirection={"column"} className="content">
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
        </Box>
      </Box>
    </div>
  )
}

// Modify the getStaticProps function
export async function getStaticProps({ params: { slug } }) {
  try {
    const fileContent = matter(fs.readFileSync(`./blog/${slug}.md`, "utf8"))
    const frontmatter = fileContent.data
    const markdown = fileContent.content

    // Format the date using the "es-MX" locale
    const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US")

    return {
      props: { frontmatter: { ...frontmatter, date: formattedDate }, markdown },
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

  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf("."))
    return { params: { slug: filename } }
  })

  return {
    paths,
    fallback: false, // This shows a 404 page if the page is not found
  }
}
