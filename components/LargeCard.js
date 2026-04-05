import { Box, Card, CardContent, Chip } from "@mui/material"
import Image from "next/image"
import React from "react"

const LargeCard = ({ post }) => {
  function generateExcerpt(text, maxLength) {
    if (text) {
      if (text.length <= maxLength) {
        return text
      } else {
        const trimmedText = text.substring(0, maxLength)
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

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : ""

  return (
    <Card
      sx={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
        overflow: "hidden",
        borderRadius: "var(--radius)",
        boxShadow: "none",
        border: "1px solid var(--color-border)",
        cursor: "pointer",
        transition: "all var(--transition)",
        "&:hover": {
          boxShadow: "var(--shadow-md)",
          borderColor: "transparent",
        },
        "&:hover .featuredimg": {
          transform: "scale(1.05)",
        },
      }}
    >
      <div className="featuredimage-wrapper">
        <Image
          className="featuredimg"
          src={post.featuredimage}
          alt={post.title}
          fill
          placeholder="blur"
          blurDataURL="../public/assets/blur.jpg"
        />
      </div>
      <CardContent sx={{ p: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Chip label={post.categoria} size="small" />
          {formattedDate && (
            <Box
              component="span"
              sx={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.7rem",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.3px",
              }}
            >
              {formattedDate}
            </Box>
          )}
        </Box>
        <Box
          component="h2"
          sx={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.05rem",
            fontWeight: 700,
            lineHeight: 1.4,
            m: 0,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "4.2em",
          }}
        >
          {post.title}
        </Box>
        <Box
          component="p"
          sx={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            m: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {generateExcerpt(post.shortDescription, 140)}
        </Box>
      </CardContent>
    </Card>
  )
}

export default LargeCard
