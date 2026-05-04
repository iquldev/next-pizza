"use client"

import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export const TopLoader: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  React.useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.closest("button")) return

      const anchorTarget = target.closest("a")

      if (!anchorTarget) return

      const href = anchorTarget.getAttribute("href")
      const anchorTargetProp = anchorTarget.getAttribute("target")

      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !href.includes("://") &&
        anchorTargetProp !== "_blank"
      ) {
        const currentUrl =
          pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : "")
        if (href !== currentUrl) {
          setLoading(true)
        }
      }
    }

    window.addEventListener("click", handleAnchorClick, { capture: true })

    return () => {
      window.removeEventListener("click", handleAnchorClick, { capture: true })
    }
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{
            width: ["0%", "20%", "40%", "60%", "80%", "95%"],
          }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{
            width: {
              duration: 10,
              times: [0, 0.05, 0.1, 0.2, 0.5, 1],
              ease: "linear",
            },
            opacity: { duration: 0.3, delay: 0.1 },
          }}
          className="pointer-events-none fixed top-0 right-0 left-0 z-99999 h-[3px] bg-primary"
          style={{
            boxShadow: "0 0 10px var(--primary), 0 0 5px var(--primary)",
          }}
        />
      )}
    </AnimatePresence>
  )
}
