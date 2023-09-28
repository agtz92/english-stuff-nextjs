import fs from "fs"
import matter from "gray-matter"
import Link from "next/link"
import Head from "next/head"
import { Box, Grid } from "@mui/material"
import LargeCard from "@/components/LargeCard"
import { sitename } from "../components/siteData"

export default function Home({ blogs, isMobile }) {
  // Sort the blogs by date in descending order
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date))
  const firstTwo = sortedBlogs.slice(0, 2);
  const nextSix = sortedBlogs.slice(2, 8);
  const theRest = sortedBlogs.slice(8);
  return (
    <Box
      sx={{ marginLeft: !isMobile ? 20 : 5, marginRight: !isMobile ? 20 : 5 }}
    >
      <Head>
        <title>{sitename}</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container>
            {firstTwo.map((blog) => (
              <Grid key={blog.slug} item xs={12} md={12}>
                <Link href={`/${blog.slug}`}>
                  <LargeCard post={blog} height="500px" />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container>
            {nextSix.map((blog) => (
              <Grid key={blog.slug} item xs={12} md={12}>
                <Link href={`/${blog.slug}`}>
                  <LargeCard post={blog} height="500px" />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>

      <Grid container spacing={2}>
        {sortedBlogs.map((blog) => (
          <Grid key={blog.slug} item xs={12} md={3}>
            <Link href={`/${blog.slug}`}>
              <LargeCard post={blog} height="600px" />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export async function getStaticProps() {
  try {
    // List of files in the "blogs" folder, excluding ".DS_Store"
    const filesInBlogs = fs
      .readdirSync("./blog")
      .filter((filename) => !filename.startsWith(".DS_Store"))

    // Get the front matter and slug (the filename without .md) of all files
    const blogs = filesInBlogs.map((filename) => {
      const file = fs.readFileSync(`./blog/${filename}`, "utf8")
      const matterData = matter(file)

      // Check if matterData.data.date exists before calling toISOString()
      const isoDate = matterData.data.date
        ? new Date(matterData.data.date).toISOString()
        : ""

      // Format the ISO date for display in the desired locale
      const formattedDate = matterData.data.date
        ? new Date(matterData.data.date).toLocaleDateString("en-US")
        : ""

      // Ensure shortDescription is defined for each blog
      const shortDescription = matterData.data["short-description"] || ""

      return {
        ...matterData.data,
        slug: filename.slice(0, filename.indexOf(".")),
        date: isoDate, // Keep the ISO date
        formattedDate: formattedDate, // Formatted date
        shortDescription: shortDescription, // Ensure shortDescription is defined
      }
    })

    return {
      props: {
        blogs,
      },
    }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return {
      notFound: true,
    }
  }
}
