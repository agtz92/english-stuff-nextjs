import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import "@/styles/globals.css"
import { useMediaQuery } from "@mui/material"
import Script from "next/script"

export default function App({ Component, pageProps }) {
  const isMobile = useMediaQuery("(max-width:768px)")

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BZ0EY5ZNXL"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BZ0EY5ZNXL');
        `}
      </Script>

      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7182528185795867"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", (user) => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/"
                })
              }
            })
          }
        }}
      />

      <Nav isMobile={isMobile} />
      <Component {...pageProps} isMobile={isMobile} />
      <Footer />
    </>
  )
}
