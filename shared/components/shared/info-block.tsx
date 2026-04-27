"use client"

import { Button } from "../ui"
import { ArrowLeft } from "lucide-react"
import { Title } from "./title"
import { Link } from "@/i18n/routing"
import { cn } from "@/shared/lib/utils"
import { useTranslations } from "next-intl"

interface Props {
  title: string
  text: string
  className?: string
  imageUrl?: string
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  const t = useTranslations("Common")

  return (
    <div
      className={cn(
        className,
        "flex w-[600px] flex-col items-center justify-between gap-12"
      )}
    >
      <div className="flex flex-col">
        <Title size="lg" text={title} className="font-extrabold" />
        <p className="text-lg text-muted-foreground">{text}</p>
      </div>

      <div className="flex gap-5">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft />
            {t("goHome")}
          </Button>
        </Link>
        <a href="">
          <Button
            variant="outline"
            className="border-muted-foreground text-muted-foreground hover:bg-secondary"
          >
            {t("refresh")}
          </Button>
        </a>
      </div>

      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img src={imageUrl} alt={title} width={300} />
    </div>
  )
}
