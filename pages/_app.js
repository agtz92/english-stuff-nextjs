import Nav from "@/components/Nav"
import "@/styles/globals.css"
import { useMediaQuery } from "@mui/material"

export default function App({ Component, pageProps }) {
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <>
      <Nav />
      <Component {...pageProps} isMobile={isMobile} />
    </>
  )
}
