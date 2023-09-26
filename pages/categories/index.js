import fs from "fs"
import matter from "gray-matter"
import Link from "next/link"
import Head from "next/head"
import styles from "../../styles/Home.module.css"

export default function Home({ blogs }) {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Demo Blog</title>
      </Head>
      <h1 className={styles["header"]}>Welcome to my blog</h1>
      <p className={styles["subtitle"]}>
        This is a subtitle idk what to type here
      </p>
      <ul className={styles["blog-list"]}>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/${blog.slug}`}>
              {blog.categoria}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  // List of files in the "blogs" folder
  const filesInBlogs = fs.readdirSync("./categories")

  // Get the front matter and slug (the filename without .md) of all files
  const blogs = filesInBlogs.map((filename) => {
    const file = fs.readFileSync(`./categories/${filename}`, "utf8")
    const matterData = matter(file)

    // Use the categoria as the slug
    const slug = matterData.data.categoria.replace(/\s+/g, "-").toLowerCase()

    return {
      ...matterData.data,
      slug: slug, // Use the categoria as the slug
    }
  })

  return {
    props: {
      blogs,
    },
  }
}
