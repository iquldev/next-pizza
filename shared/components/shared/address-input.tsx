"use client"

import { useTranslations } from "next-intl"
import React from "react"
import { AddressSuggestions } from "react-dadata"
import "react-dadata/dist/react-dadata.css"

interface Props {
  onChange?: (value?: string) => void
}

export const AddressInput = ({ onChange }: Props) => {
  const [mounted, setMounted] = React.useState(false)
  const t = useTranslations("Checkout")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <input
        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={t("loadingAddress")}
        readOnly
      />
    )
  }

  return (
    <AddressSuggestions
      token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
      onChange={(data) => onChange?.(data?.value)}
      inputProps={{
        placeholder: t("addressPlaceholder"),
        className:
          "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      }}
    />
  )
}
