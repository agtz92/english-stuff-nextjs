import ReactMarkdown from "react-markdown"
import Head from "next/head"
import Image from "next/image"
import rehypeRaw from "rehype-raw"
import Box from "@mui/material/Box"
import { Chip, Grid } from "@mui/material"
import Link from "next/link"
import { sitename } from "../components/siteData"
import SEOBlog from "@/components/SEOBlog"
import { readPostBySlug, getAllSlugs } from "@/lib/posts"

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
      <SEOBlog post={frontmatter} />
      <Box display={"flex"} flexDirection={"column"} className="margins5">
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
        <Box justifyContent={"center"} display={"flex"}>
          <div className="postimage-wrapper">
            <Image
              className="postimg"
              src={frontmatter.featuredimage}
              alt={frontmatter.title}
              fill
              placeholder="blur"
              blurDataURL="../public/assets/blur.jpg"
            />
          </div>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {frontmatter.tags?.map((tag) => (
            <Grid key={tag} item xs={3} sm={3} md={1.5}>
              <Chip
                component={Link}
                href={`/tags/${cleanAndLowercaseString(tag)}`}
                label={tag}
                sx={{
                  marginRight: 1,
                  marginBottom: 2,
                  width: "100%",
                }}
                clickable
              />
            </Grid>
          ))}
        </Grid>

        <Box display={"flex"} flexDirection={"column"} className="content">
          <Box sx={{ minHeight: "20px" }} />
          {frontmatter.shortDescription}
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

export async function getStaticProps({ params: { slug } }) {
  try {
    const post = readPostBySlug(slug)
    if (!post) return { notFound: true }

    const { frontmatter, content } = post
    const formattedDate = frontmatter.date
      ? new Date(frontmatter.date).toLocaleDateString("en-US")
      : ""
    const shortDescription = frontmatter["short-description"] || ""

    return {
      props: {
        frontmatter: {
          ...frontmatter,
          date: formattedDate,
          shortDescription,
        },
        markdown: content,
      },
    }
  } catch (error) {
    console.error("Error reading file or parsing frontmatter:", error)
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  const paths = getAllSlugs().map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: "blocking",
  }
}
