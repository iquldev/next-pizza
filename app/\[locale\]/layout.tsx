import { Nunito } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/shared/components/theme-provider"
import { cn } from "@/shared/lib"
import { Toaster } from "@/shared/components/ui/sonner"

import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

const fontSans = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("font-sans", fontSans.variable)}
    >
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>

      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <Toaster />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
