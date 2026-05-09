import { useEffect, useRef } from "react"
import { adsenseClient } from "./siteData"

const isConfigured = (slot) => slot && slot !== "REPLACE_ME"

const AdSlot = ({ slot, format = "auto", minHeight = 250, style }) => {
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
        // adsbygoogle script not yet loaded — observer will be retained
        // and tryPush will fire again on next intersection.
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

  return (
    <div
      ref={containerRef}
      style={{
        minHeight,
        margin: "32px 0",
        textAlign: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdSlot
