import { Box, Grid } from "@mui/material"
import Link from "next/link"
import { sitename, motto } from "./siteData"

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 10,
        borderTop: "2px solid",
        borderColor: "var(--color-border-strong)",
        pt: 6,
        pb: 4,
        px: { xs: 3, md: 8 },
      }}
      className="footer"
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              mb: 1,
            }}
          >
            {sitename}
          </Box>
          <Box
            sx={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.75rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-text-secondary)",
            }}
          >
            {motto}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <h4>Categories</h4>
          <ul>
            <li>
              <Link href="/">New</Link>
            </li>
            <li>
              <Link href="/categories/entertainment">Entertainment</Link>
            </li>
            <li>
              <Link href="/categories/lifestyle">Lifestyle</Link>
            </li>
            <li>
              <Link href="/categories/culture">Culture</Link>
            </li>
            <li>
              <Link href="/categories/tech">Tech</Link>
            </li>
            <li>
              <Link href="/categories/business">Business</Link>
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
            Cazador de Ofertas para Productos de Bebes
          </Link>
          <Link href="https://www.10datos.com" target="_blank">
            Noticias de gaming
          </Link>
          <Link href="https://www.mexgamer.com/categories/anime">
            Noticias de Anime y Videojuegos
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: "center",
              pt: 4,
              mt: 4,
              borderTop: "1px solid var(--color-border)",
              fontFamily: "var(--font-heading)",
              fontSize: "0.75rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "1px",
            }}
          >
            {sitename} &copy; {new Date().getFullYear()}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
