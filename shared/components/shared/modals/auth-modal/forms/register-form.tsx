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
import { useState } from "react"
import { Mail } from "lucide-react"

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Validation.firstName" }),
    email: z.string().email({ message: "Validation.email" }),
    password: z.string().min(6, { message: "Validation.password" }),
    confirmPassword: z.string().min(6, { message: "Validation.password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Validation.passwordMatch",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof registerSchema>

interface Props {
  onSwitchType: () => void
}

const CALLBACK_URL = "/"

export const RegisterForm = ({ onSwitchType }: Props) => {
  const t = useTranslations("Auth")
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null
  )
  const [isResending, setIsResending] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.fullName,
        callbackURL: CALLBACK_URL,
      })

      if (error) {
        switch (error.code) {
          case "USER_ALREADY_EXISTS":
            form.setError("email", { message: t("errorEmailTaken") })
            break
          default:
            toast.error(t("error"))
        }
        return
      }

      setVerificationEmail(values.email)
    } catch (error) {
      console.error("Error registering:", error)
      toast.error(t("error"))
    }
  }

  const handleResendEmail = async () => {
    if (!verificationEmail) return
    setIsResending(true)
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: verificationEmail,
        callbackURL: CALLBACK_URL,
      })

      if (error) {
        toast.error(t("error"))
        return
      }

      toast.success(t("verificationResent"))
    } catch {
      toast.error(t("error"))
    } finally {
      setIsResending(false)
    }
  }

  if (verificationEmail) {
    return (
      <div className="flex flex-col items-center gap-5 py-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <Title text={t("verificationTitle")} size="md" className="font-bold" />
        <p className="text-muted-foreground">
          {t("verificationDescription")}{" "}
          <span className="font-medium text-foreground">
            {verificationEmail}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">{t("verificationSpam")}</p>
        <Button
          loading={isResending}
          variant="outline"
          className="h-12 w-full"
          onClick={handleResendEmail}
        >
          {t("verificationResend")}
        </Button>
        <Button
          variant="ghost"
          className="h-10 w-full"
          onClick={() => {
            setVerificationEmail(null)
            form.reset()
            onSwitchType()
          }}
        >
          {t("switchToLogin")}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <Title text={t("registerTitle")} size="md" className="font-bold" />
      <p className="text-muted-foreground">{t("registerDescription")}</p>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="fullName" placeholder={t("fullName")} required />
          <FormInput name="email" placeholder={t("email")} required />
          <FormInput
            name="password"
            type="password"
            placeholder={t("password")}
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder={t("confirmPassword")}
            required
          />
          <Button
            loading={form.formState.isSubmitting}
            className="h-12 text-base"
            type="submit"
          >
            {t("registerButton")}
          </Button>
        </form>
      </FormProvider>
      <Button
        variant="ghost"
        onClick={onSwitchType}
        type="button"
        className="h-12"
      >
        {t("switchToLogin")}
      </Button>
    </div>
  )
}
