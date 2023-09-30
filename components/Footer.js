import { Box, Grid } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { sitename, motto } from "./siteData"
import Image from "next/image"

const Footer = () => {
  return (
    <Box
      sx={{
        margin: 5,
        borderTop: "1px solid #663399",
        paddingTop: 2,
      }}
      className="footer"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <p>{sitename}</p>
          <p>{motto}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <h4>Categories</h4>
          <ul>
            <li>
              <Link href="/">NEW</Link>
            </li>
            <li>
              <Link href="/categories/entertainment">ENTERTAINMENT</Link>
            </li>
            <li>
              <Link href="/categories/lifestyle">LIFESTYLE</Link>
            </li>
            <li>
              <Link href="/categories/culture">CULTURE</Link>
            </li>
            <li>
              <Link href="/categories/tech">TECH</Link>
            </li>
            <li>
              <Link href="/categories/business">BUSINESS</Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={4} display={"flex"} direction={"column"}>
          <h4>Partners</h4>
          <Link href="https://www.corthw.com/topes-para-anden">
            Cortinas Hawaianas y Topes para Anden
          </Link>
          <Link href="https://www.antesdelexamen.com/categorias/preguntas-de-examen/">
            Preguntas de examen UNAM
          </Link>
          <Link href="https://www.matmarkt.com/productos/gimnasios">
            Piso para gimnasios
          </Link>
          <Link href="https://www.sombrealo.com/">
            Velarias Arquitectonicas Queretaro
          </Link>
          <Link href="https://www.soy-nuevo.com/">
            Cazador de Ofertas para Productos de Bebés como Safety 1st, Doona,
            Uppababy y más!
          </Link>
          <Link href="https://www.10datos.com">Noticias de gaming</Link>
        </Grid>
        <Grid item xs={12} md={12}>
          <p style={{ width: "100%", textAlign: "center" }}>{sitename} 2023</p>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
