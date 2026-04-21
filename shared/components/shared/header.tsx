"use client"

import { cn } from "@/shared/lib"
import { Container } from "./container"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { SearchInput, CartButton, ThemeButton } from "./index"
import { useTranslations } from "next-intl"

interface Props {
  className?: string
}

export const Header = ({ className }: Props) => {
  const t = useTranslations("Header")

  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">Next Pizza</h1>
              <p className="text-sm leading-3 text-muted-foreground">
                {t("slogan")}
              </p>
            </div>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <ThemeButton />
          <CartButton />
        </div>
      </Container>
    </header>
  )
}
