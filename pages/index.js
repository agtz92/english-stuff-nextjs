import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

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
              {blog.formattedDate}:{blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // List of files in the "blogs" folder
  const filesInBlogs = fs.readdirSync("./blog");

  // Get the front matter and slug (the filename without .md) of all files
  const blogs = filesInBlogs.map((filename) => {
    const file = fs.readFileSync(`./blog/${filename}`, "utf8");
    const matterData = matter(file);

    // Check if matterData.data.date exists before calling toISOString()
    const isoDate = matterData.data.date
      ? new Date(matterData.data.date).toISOString()
      : "";

    // Format the ISO date for display in the desired locale
    const formattedDate = matterData.data.date
      ? new Date(matterData.data.date).toLocaleDateString("es-MX")
      : "";

    return {
      ...matterData.data,
      slug: filename.slice(0, filename.indexOf(".")),
      date: isoDate, // Keep the ISO date
      formattedDate: formattedDate, // Formatted date
    };
  });

  return {
    props: {
      blogs,
    },
  };
}
