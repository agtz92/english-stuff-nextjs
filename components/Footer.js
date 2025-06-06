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
          <Link href="https://www.corthw.com/topes-para-anden" target="_blank">
            Cortinas Hawaianas y Topes para Anden
          </Link>
          <Link href="https://www.rollospvc.com" target="_blank">
            Cortinas Hawaianas Armadas
          </Link>
          <Link
            href="https://www.foodplusfeed.com/subcategoria/sorbato-de-potasio"
            target="_blank"
          >
            Venta de Sorbato de Potasio al Mayoreo
          </Link>
          <Link
            href="https://grupohule.com/categories/cortinas-hawaianas"
            target="_blank"
          >
            Rollos de PVC para cortinas
          </Link>
          <Link
            href="https://www.antesdelexamen.com/categorias/preguntas-de-examen/"
            target="_blank"
          >
            Preguntas de examen UNAM
          </Link>
          <Link
            href="https://www.matmarkt.com/productos/gimnasios"
            target="_blank"
          >
            Piso para gimnasios
          </Link>
          <Link href="https://www.sombrealo.com/" target="_blank">
            Velarias Arquitectonicas Queretaro
          </Link>
          <Link href="https://www.soy-nuevo.com/" target="_blank">
            Cazador de Ofertas para Productos de Bebés como Safety 1st, Doona,
            Uppababy y más!
          </Link>
          <Link href="https://www.10datos.com" target="_blank">
            Noticias de gaming
          </Link>
          <Link href="https://www.mexgamer.com/categories/anime">
            Noticias de Anime y Videojuegos en Español
          </Link>
        </Grid>
        <Grid item xs={12} md={12}>
          <p style={{ width: "100%", textAlign: "center" }}>{sitename} 2023</p>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
