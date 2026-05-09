import React, { useState, useEffect } from "react"
import Link from "next/link"
import LargeCard from "@/components/LargeCard"
import { Box, Grid, Pagination, Stack } from "@mui/material"
import Head from "next/head"
import { sitename, sitedomain } from "@/components/siteData"
import { getAllPosts } from "@/lib/posts"

function removeSpecialCharactersAndLowerCase(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
}

function TagPage({ matchingFiles, tag }) {
  const sortedBlogs = matchingFiles?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const blogsToDisplay = sortedBlogs?.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [tag])

  const title = sitename + " | #" + tag

  return (
    <Box className="margins" sx={{ pb: 6 }}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Articles tagged with #${tag} on ${sitename}. Quick, engaging reads you can finish in 3 minutes.`}
        />
        <link rel="canonical" href={`${sitedomain}/tags/${tag}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`Articles tagged with #${tag} on ${sitename}.`}
        />
        <meta property="og:url" content={`${sitedomain}/tags/${tag}`} />
        <meta property="og:site_name" content={sitename} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={`Articles tagged with #${tag} on ${sitename}.`}
        />
      </Head>

      <div className="page-header">
        <h1>#{tag}</h1>
        <p>
          {sortedBlogs.length} article{sortedBlogs.length !== 1 ? "s" : ""}
        </p>
      </div>

      <Grid container spacing={2.5}>
        {blogsToDisplay?.map((file, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Link href={`/${file.slug}`}>
              <LargeCard post={file} />
            </Link>
          </Grid>
        ))}
      </Grid>

      {sortedBlogs.length > itemsPerPage && (
        <Stack
          spacing={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ mt: 6 }}
        >
          <Pagination
            count={Math.ceil(sortedBlogs.length / itemsPerPage)}
            size="large"
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Stack>
      )}
    </Box>
  )
}

export async function getStaticPaths() {
  const tags = new Set()
  for (const post of getAllPosts()) {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        tags.add(removeSpecialCharactersAndLowerCase(tag))
      })
    }
  }

  const paths = Array.from(tags).map((tagSlug) => ({
    params: { tag: tagSlug },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps({ params: { tag } }) {
  const tagSlug = removeSpecialCharactersAndLowerCase(tag)
  const matchingFiles = getAllPosts()
    .filter(
      (post) =>
        post.tags &&
        post.tags.some(
          (t) => removeSpecialCharactersAndLowerCase(t) === tagSlug
        )
    )
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      categoria: post.categoria,
      shortDescription: post.shortDescription,
      featuredimage: post.featuredimage,
      date: post.date,
      source: post.source,
    }))

  return {
    props: {
      matchingFiles,
      tag: tagSlug,
    },
  }
}

export default TagPage
