import type { Metadata } from "next"

import "../globals.css"
import { ThemeProvider } from "@/shared/components/theme-provider"
import { Header } from "@/shared/components/shared/header"

export const metadata: Metadata = {
  title: "Next Pizza",
}

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
            {modal}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
