import Head from "next/head"
import React from "react"
import { sitename, sitedomain } from "./siteData"
import logo from "../public/assets/logo.png"

const SEOBlog = ({ post }) => {
  function generateExcerpt(text, maxLength) {
    if (text) {
      if (text.length <= maxLength) {
        return text
      } else {
        const trimmedText = text.substring(0, maxLength)
        // Ensure the last word isn't cut off
        const lastSpaceIndex = trimmedText.lastIndexOf(" ")
        if (lastSpaceIndex !== -1) {
          return trimmedText.substring(0, lastSpaceIndex).replaceAll("^\"|\"$", "") + "..."
        } else {
          return trimmedText.replaceAll("^\"|\"$", "")  + "..."
        }
      }
    } else {
      return ""
    }
  }

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id":\"${sitename}\"
        },
        "headline": \"${post.title}\",
        "description": \"${generateExcerpt(post.shortDescription, 250)}\",
        "image": "${sitedomain}/assets/${post.featuredimage}",  
        "author": {
          "@type": "Organization",
          "name": "3minread.com"
        },  
        "publisher": {
          "@type": "Organization",
          "name": "3 min read",
          "logo": {
            "@type": "ImageObject",
            "url": \"${sitedomain}/assets/logo.png\"
          }
        },
        "datePublished": \"${post.date}\",
        "dateModified": \"${post.date}\"
      }
  `,
    };
  }
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>
        {post.title} | {sitename}
      </title>
      <meta
        name="description"
        content={generateExcerpt(post.shortDescription, 250)}
      />
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
    </Head>
  )
}

export default SEOBlog
