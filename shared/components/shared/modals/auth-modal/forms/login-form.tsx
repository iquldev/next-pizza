"use client"

import { Title } from "@/shared/components/shared"
import { Button } from "@/shared/components/ui"
import { useTranslations } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormInput } from "@/shared/components/shared/form"
import { authClient } from "@/shared/lib"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email({ message: "Validation.email" }),
  password: z.string().min(6, { message: "Validation.password" }),
})

type FormValues = z.infer<typeof loginSchema>

interface Props {
  onSwitchType: () => void
  closeModal: () => void
}

export const LoginForm = ({ onSwitchType, closeModal }: Props) => {
  const t = useTranslations("Auth")
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      })

      if (error) {
        switch (error.code) {
          case "USER_NOT_FOUND":
            toast.error(t("errorUserNotFound"))
            break
          case "INVALID_EMAIL_OR_PASSWORD":
            toast.error(t("errorInvalidCredentials"))
            break
          case "EMAIL_NOT_VERIFIED":
            toast.error(t("errorEmailNotVerified"))
            break
          default:
            toast.error(t("error"))
        }
        return
      }

      toast.success(t("loginSuccess"))
      closeModal()
    } catch (error) {
      console.error("Error logging in:", error)
      toast.error(t("error"))
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Title text={t("loginTitle")} size="md" className="font-bold" />
      </div>

      <p className="text-muted-foreground">{t("loginDescription")}</p>

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" placeholder={t("email")} required />
          <FormInput
            name="password"
            type="password"
            placeholder={t("password")}
            required
          />

          <Button
            loading={form.formState.isSubmitting}
            className="h-12 text-base"
            type="submit"
          >
            {t("loginButton")}
          </Button>
        </form>
      </FormProvider>

      <Button
        variant="ghost"
        onClick={onSwitchType}
        type="button"
        className="h-12"
      >
        {t("switchToRegister")}
      </Button>
    </div>
  )
}
