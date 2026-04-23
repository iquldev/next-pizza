"use client"

import { useTranslations } from "next-intl"

import { WhiteBlock } from "../white-block"
import { FormInput } from "../form"

interface Props {
  className?: string
}

export const CheckoutPersonalForm = ({ className }: Props) => {
  const t = useTranslations("Checkout")

  return (
    <WhiteBlock title={t("personalTitle")} className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder={t("firstName")}
          autoComplete="given-name"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder={t("lastName")}
          autoComplete="family-name"
        />
        <FormInput
          name="email"
          className="text-base"
          placeholder={t("email")}
          type="email"
          autoComplete="email"
        />
        <FormInput
          name="phone"
          className="text-base"
          placeholder={t("phone")}
          mask="+7 (000) 000-00-00"
          autoComplete="tel"
        />
      </div>
    </WhiteBlock>
  )
}
