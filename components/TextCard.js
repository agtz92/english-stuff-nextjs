import React from "react"
import { Box, Card, CardContent, Chip } from "@mui/material"

const TextCard = ({ post }) => {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : ""

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "var(--radius)",
        border: "1px solid var(--color-border)",
        cursor: "pointer",
        transition: "all var(--transition)",
        "&:hover": {
          borderColor: "var(--color-accent)",
        },
      }}
    >
      <CardContent sx={{ p: "14px 16px !important" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 0.75,
          }}
        >
          <Chip label={post.categoria} size="small" />
          {formattedDate && (
            <Box
              component="span"
              sx={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.65rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {formattedDate}
            </Box>
          )}
        </Box>
        <Box
          component="h3"
          sx={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.88rem",
            fontWeight: 600,
            lineHeight: 1.4,
            m: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </Box>
      </CardContent>
    </Card>
  )
}

export default TextCard
