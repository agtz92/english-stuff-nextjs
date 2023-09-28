import { Card, CardContent, Grid } from "@mui/material"
import Image from "next/image"
import React from "react"

const LargeCard = ({ post, height }) => {
  function generateExcerpt(text, maxLength) {
    if (text) {
      if (text.length <= maxLength) {
        return text
      } else {
        const trimmedText = text.substring(0, maxLength)
        // Ensure the last word isn't cut off
        const lastSpaceIndex = trimmedText.lastIndexOf(" ")
        if (lastSpaceIndex !== -1) {
          return trimmedText.substring(0, lastSpaceIndex) + "..."
        } else {
          return trimmedText + "..."
        }
      }
    } else {
      return ""
    }
  }

  return (
    <Card
      sx={{
        background: "#fff",
        color: "#000",
        minHeight: {height},
        maxHeight: {height},
        overflow: "hidden",
      }}
    >
      <CardContent>
        <div className="featuredimage-wrapper">
          <Image
            className="featuredimg"
            src={post.featuredimage}
            alt={post.title}
            fill
          />
        </div>
        <h1>{post.title}</h1>
        <p>{generateExcerpt(post.shortDescription, 150)}</p>
      </CardContent>
    </Card>
  )
}

export default LargeCard
