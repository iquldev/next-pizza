"use client"
import { useTranslations } from "next-intl"
import { Input } from "../ui"

interface Props {
  value?: string
  onChange?: (value?: string) => void
}

export const AddressInput = ({ value, onChange }: Props) => {
  const t = useTranslations("Checkout")

  return (
    <Input
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={t("addressPlaceholder")}
      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    />
  )
}
