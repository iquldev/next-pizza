"use client"
import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { useTranslations } from "next-intl"
import { IMaskInput } from "react-imask"
import { Input } from "../../ui/input"
import { ClearButton } from "../clear-button"
import { ErrorText } from "../error-text"
import { RequiredSymbol } from "../required-symbol"
import { cn } from "@/shared/lib"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
  mask?: string
}

export const FormInput = ({
  className,
  name,
  label,
  required,
  mask,
  ...props
}: Props) => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorTextKey = errors[name]?.message as string
  const errorText = errorTextKey ? t(errorTextKey as any) : ""

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true })
  }

  const inputStyles =
    "h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-md transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md"

  return (
    <div className={className}>
      {label && (
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative" suppressHydrationWarning>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              {mask ? (
                <IMaskInput
                  mask={mask}
                  value={field.value}
                  unmask={false}
                  onAccept={(value) => field.onChange(value)}
                  className={cn(inputStyles, "flex")}
                  placeholder={props.placeholder}
                  disabled={props.disabled}
                  suppressHydrationWarning
                />
              ) : (
                <Input
                  className="text-md h-12"
                  {...field}
                  {...props}
                  suppressHydrationWarning
                />
              )}
            </>
          )}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  )
}
