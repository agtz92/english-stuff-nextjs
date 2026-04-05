// components/Nav.js
import { Box } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { sitename, motto } from "./siteData"

const Nav = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        className="pc-only masthead"
        sx={{ mx: "5%" }}
      >
        <h1>{sitename}</h1>
        <p>{motto}</p>
      </Box>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <Link href="/">{sitename}</Link>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link href="/" onClick={toggleMenu}>
              New
            </Link>
          </li>
          <li>
            <Link href="/categories/entertainment" onClick={toggleMenu}>
              Entertainment
            </Link>
          </li>
          <li>
            <Link href="/categories/lifestyle" onClick={toggleMenu}>
              Lifestyle
            </Link>
          </li>
          <li>
            <Link href="/categories/culture" onClick={toggleMenu}>
              Culture
            </Link>
          </li>
          <li>
            <Link href="/categories/tech" onClick={toggleMenu}>
              Tech
            </Link>
          </li>
          <li>
            <Link href="/categories/business" onClick={toggleMenu}>
              Business
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
