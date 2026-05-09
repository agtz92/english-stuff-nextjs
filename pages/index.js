import dynamic from "next/dynamic"
import Link from "next/link"
import Head from "next/head"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { sitename, sitedomain } from "../components/siteData"
import CoverCard from "@/components/CoverCard"
import { getAllPostsList } from "@/lib/posts"

export default function Home({ hero, secondary, sidebar, recent, featured }) {
  const TextCard = dynamic(() => import("@/components/TextCard"))
  const LargeCard = dynamic(() => import("@/components/LargeCard"))

  return (
    <Box className="margins" sx={{ pb: 6 }}>
      <Head>
        <title>{sitename} - Quick Reads on Trending Topics</title>
        <meta
          name="description"
          content="3 min read brings you quick, engaging articles on technology, entertainment, business, and culture. Stay informed without the time commitment."
        />
        <link rel="canonical" href={sitedomain} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${sitename} - Quick Reads on Trending Topics`}
        />
        <meta
          property="og:description"
          content="Quick, engaging articles on technology, entertainment, business, and culture. Stay informed without the time commitment."
        />
        <meta property="og:url" content={sitedomain} />
        <meta property="og:site_name" content={sitename} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${sitename} - Quick Reads on Trending Topics`}
        />
        <meta
          name="twitter:description"
          content="Quick, engaging articles on technology, entertainment, business, and culture. Stay informed without the time commitment."
        />
      </Head>

      {/* Latest Section */}
      <div className="section-label">Latest</div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {hero.map((blog) => (
            <Link key={blog.slug} href={`/${blog.slug}`}>
              <CoverCard post={blog} priority />
            </Link>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            {secondary.map((blog) => (
              <Grid key={blog.slug} item xs={12}>
                <Link href={`/${blog.slug}`}>
                  <CoverCard post={blog} secondary />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={1.5}>
            {sidebar.map((blog) => (
              <Grid key={blog.slug} item xs={12}>
                <Link href={`/${blog.slug}`}>
                  <TextCard post={blog} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Featured Section */}
      {featured.length > 0 && (
        <>
          <div className="section-label">Featured</div>
          <Grid container spacing={2}>
            {featured.map((blog) => (
              <Grid key={blog.slug} item xs={12} md={3}>
                <Link href={`/${blog.slug}`}>
                  <CoverCard post={blog} h1="1rem" secondary />
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Recent Section */}
      <div className="section-label">Recent</div>
      <Grid container spacing={2.5}>
        {recent.map((blog) => (
          <Grid key={blog.slug} item xs={12} sm={6} md={3}>
            <Link href={`/${blog.slug}`}>
              <LargeCard post={blog} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const all = getAllPostsList().sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    const hero = all.slice(0, 1)
    const secondary = all.slice(1, 3)
    const sidebar = all.slice(3, 7)
    const recent = all.slice(7, 19)
    const featured = all.filter((b) => b.deals === "Yes").slice(0, 8)

    return { props: { hero, secondary, sidebar, recent, featured } }
  } catch (error) {
    console.error("Error reading files or parsing frontmatter:", error)
    return { notFound: true }
  }
}
