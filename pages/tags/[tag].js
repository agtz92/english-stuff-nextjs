import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import LargeCard from "@/components/LargeCard";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { sitename } from "@/components/siteData";

function removeSpecialCharactersAndLowerCase(str) {
  // Remove special characters and spaces and convert to lowercase
  return str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();
}

function TagPage({ matchingFiles, tag, isMobile }) {
  // Sort the blogs by date in descending order
  const sortedBlogs = matchingFiles?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Get the slug without removing special characters
  const tagSlug = removeSpecialCharactersAndLowerCase(tag);

  return (
    <Box
      sx={{ marginLeft: !isMobile ? 20 : 5, marginRight: !isMobile ? 20 : 5 }}
    >
      <Head>
        <title>
          {sitename} | #{tag}
        </title>
      </Head>
      <h1 style={{ textAlign: "center", fontWeight: 600 }}>
        #{tag.toUpperCase()}
      </h1>

      <Grid container spacing={2}>
        {sortedBlogs?.map((file, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Link href={`/${file.slug}`}>
              <LargeCard post={file} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync("./blog");
  const tags = new Set();

  for (const file of files) {
    const fileContent = matter(
      fs.readFileSync(path.join("./blog", file), "utf8")
    );
    const frontmatter = fileContent.data;

    if (frontmatter.tags && frontmatter.tags.length > 0) {
      frontmatter.tags.forEach((tag) => {
        // Use the modified function to get the tag slug
        tags.add(removeSpecialCharactersAndLowerCase(tag.substring(1)));
      });
    }
  }

  const paths = Array.from(tags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { tag } }) {
  // Use the modified function to get the tag slug
  const tagSlug = removeSpecialCharactersAndLowerCase(tag);
  const files = fs.readdirSync("./blog");
  const matchingFiles = [];

  for (const file of files) {
    const fileContent = matter(
      fs.readFileSync(path.join("./blog", file), "utf8")
    );
    const frontmatter = fileContent.data;
    const shortDescription = frontmatter["short-description"] || "";

    if (frontmatter.tags && frontmatter.tags.includes(`#${tagSlug}`)) {
      const slug = file.slice(0, file.indexOf("."));
      matchingFiles.push({
        slug,
        title: frontmatter.title,
        shortDescription: shortDescription,
        featuredimage: frontmatter.featuredimage,
        // ...
      });
    }
  }

  return {
    props: {
      matchingFiles,
      tag,
    },
  };
}

export default TagPage;