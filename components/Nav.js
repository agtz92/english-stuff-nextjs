// components/Nav.js
import { Box } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { sitename, motto } from "./siteData"

const Nav = ({ isMobile, siteData }) => {
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
          sx={{
            borderBottom: "1px solid #663399",
            marginLeft: 20,
            marginRight: 20,
          }}
          className='pc-only'
        >
          <h1 style={{ fontSize: "4em", fontWeight: 600, margin: 0 }}>
            {sitename}
          </h1>
          <h3
            style={{
              fontSize: "1.5em",
              fontWeight: 300,
              textAlign: "center",
              margin: 0,
              letterSpacing: "2px",
            }}
          >
            {motto}
          </h3>
        </Box>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        {isMobile && (
          <div className="logo">
            <Link href="/">3 Min Read</Link>
          </div>
        )}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link href="/" onClick={toggleMenu}>
              NEW
            </Link>
          </li>
          <li>
            <Link href="/categories/entertainment" onClick={toggleMenu}>
              ENTERTAINMENT
            </Link>
          </li>
          <li>
            <Link href="/categories/lifestyle" onClick={toggleMenu}>
              LIFESTYLE
            </Link>
          </li>
          <li>
            <Link href="/categories/culture" onClick={toggleMenu}>
              CULTURE
            </Link>
          </li>
          <li>
            <Link href="/categories/tech" onClick={toggleMenu}>
              TECH
            </Link>
          </li>
          <li>
            <Link href="/categories/business" onClick={toggleMenu}>
              BUSINESS
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
