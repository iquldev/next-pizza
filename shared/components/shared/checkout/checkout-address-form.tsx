"use client"

import { useTranslations } from "next-intl"
import { Controller, useFormContext } from "react-hook-form"

import { WhiteBlock } from "../white-block"
import { FormInput, FormTextarea } from "../form"
import { ErrorText } from "../error-text"

interface Props {
  className?: string
}

export const CheckoutAddressForm = ({ className }: Props) => {
  const t = useTranslations("Checkout")
  const commonT = useTranslations()
  const { control } = useFormContext()

  return (
    <WhiteBlock title={t("addressTitle")} className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ fieldState }) => (
            <>
              <FormInput
                name="address"
                className="text-base"
                placeholder={t("addressPlaceholder")}
                autoComplete="street-address"
              />
              {fieldState.error?.message && (
                <ErrorText
                  text={commonT(fieldState.error.message as any)}
                  className="mt-2"
                />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder={t("comment")}
          rows={5}
        />
      </div>
    </WhiteBlock>
  )
}
