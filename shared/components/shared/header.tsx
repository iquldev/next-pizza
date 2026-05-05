"use client"

import { cn } from "@/shared/lib"
import { Container } from "./container"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { SearchInput, CartButton, ThemeButton, LoginButton } from "./index"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

interface Props {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}

export const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
}: Props) => {
  const searchParams = useSearchParams()

  const t = useTranslations("Header")
  const payT = useTranslations("Checkout")

  useEffect(() => {
    if (searchParams.has("paid")) {
      toast.success(payT("orderSuccess"))
    } else if (searchParams.has("cancelled")) {
      toast.error(payT("orderError"))
    }
  })

  return (
    <header className={cn("border-b", className)}>
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

        <div className="mx-10 flex-1">{hasSearch && <SearchInput />}</div>

        <div className="flex items-center gap-3">
          <ThemeButton />
          {hasCart && <CartButton />}
          <LoginButton />
        </div>
      </Container>
    </header>
  )
}
