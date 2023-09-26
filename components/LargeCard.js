import { Card, CardContent, Grid } from "@mui/material"
import React from "react"

const LargeCard = ({ post }) => {
  function generateExcerpt(text, maxLength) {
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
  }

  return (
      <Card sx={{ background: "#111", color: "#fff" }}>
        <CardContent>
          <h1>{post.title}</h1>
          <p>{generateExcerpt(post.shortDescription, 150)}</p>
        </CardContent>
      </Card>
  )
}

export default LargeCard
