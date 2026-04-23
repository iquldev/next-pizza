"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { ClearButton } from "../clear-button"
import { Textarea } from "../../ui/textarea"
import { ErrorText } from "../error-text"
import { RequiredSymbol } from "../required-symbol"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  name: string
  label?: string
  required?: boolean
}

export const FormTextarea = ({
  className,
  name,
  label,
  required,
  ...props
}: Props) => {
  const t = useTranslations()
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const value = watch(name)
  const errorTextKey = errors[name]?.message as string
  const errorText = errorTextKey ? t(errorTextKey as any) : ""

  const onClickClear = () => {
    setValue(name, "")
  }

  return (
    <div className={className}>
      {label && (
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {mounted ? (
          <Textarea className="form-input text-md h-12" {...register(name)} {...props} />
        ) : (
          <Textarea
            className="form-input text-md h-12"
            placeholder={props.placeholder}
            readOnly
          />
        )}

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  )
}
