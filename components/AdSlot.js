import { useEffect, useRef } from "react"
import { adsenseClient } from "./siteData"

const isConfigured = (slot) => slot && slot !== "REPLACE_ME"

// Per-type defaults: AdSense expects different `data-*` attributes
// depending on the ad unit format. These match the snippet AdSense
// gives you when you create each unit type.
const insAttrs = (type, slot) => {
  switch (type) {
    case "in-article":
      return {
        style: { display: "block", textAlign: "center" },
        "data-ad-layout": "in-article",
        "data-ad-format": "fluid",
        "data-ad-client": adsenseClient,
        "data-ad-slot": slot,
      }
    case "multiplex":
      return {
        style: { display: "block" },
        "data-ad-format": "autorelaxed",
        "data-ad-client": adsenseClient,
        "data-ad-slot": slot,
      }
    case "display":
    default:
      return {
        style: { display: "block" },
        "data-ad-client": adsenseClient,
        "data-ad-slot": slot,
        "data-ad-format": "auto",
        "data-full-width-responsive": "true",
      }
  }
}

const defaultMinHeight = (type) => (type === "multiplex" ? 400 : 250)

const AdSlot = ({ slot, type = "display", minHeight, style }) => {
  const containerRef = useRef(null)
  const pushedRef = useRef(false)

  useEffect(() => {
    if (!isConfigured(slot)) return
    const node = containerRef.current
    if (!node) return

    const tryPush = () => {
      if (pushedRef.current) return
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushedRef.current = true
      } catch (e) {
        // adsbygoogle script not yet loaded — observer keeps watching.
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPush()
            if (pushedRef.current) observer.disconnect()
          }
        })
      },
      { rootMargin: "200px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [slot])

  if (!isConfigured(slot)) return null

  const attrs = insAttrs(type, slot)

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: minHeight ?? defaultMinHeight(type),
        margin: "32px 0",
        textAlign: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <ins className="adsbygoogle" {...attrs} />
    </div>
  )
}

export default AdSlot
