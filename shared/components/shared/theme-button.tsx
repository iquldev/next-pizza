"use client"

import React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib"
import { Button } from "../ui"
import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
  className?: string
}

export function ThemeButton({ className }: Props) {
  const t = useTranslations("Theme")
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn("h-10 w-10 rounded-full", className)}
        disabled
        title={t("toggle")}
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "relative h-10 w-10 overflow-hidden rounded-full border-none bg-secondary shadow-inner",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={t("toggle")}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all duration-500",
          isDark
            ? "translate-y-10 rotate-90 opacity-0"
            : "translate-y-0 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-500",
          isDark
            ? "translate-y-0 rotate-0 opacity-100"
            : "-translate-y-10 -rotate-90 opacity-0"
        )}
      />
      <span className="sr-only">{t("toggle")}</span>
    </Button>
  )
}
