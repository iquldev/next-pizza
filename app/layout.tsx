import { Nunito } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/shared/components/theme-provider"
import { cn } from "@/shared/lib"
import { Toaster } from "@/shared/components/ui/sonner"

const fontSans = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", fontSans.variable)}
    >
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>

      <body>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
