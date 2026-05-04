"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/shared/lib"
import { useTranslations } from "next-intl"
import { Title } from "@/shared/components/shared"
import { Button } from "@/shared/components/ui"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

type Status = "loading" | "success" | "error" | "invalid"

export const EmailVerification = () => {
  const t = useTranslations("Verification")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>("loading")
  const [isResending, setIsResending] = useState(false)

  const token = searchParams.get("token")
  const email = searchParams.get("email")

  useEffect(() => {
    if (!token) {
      setStatus("invalid")
      return
    }

    const verify = async () => {
      try {
        const { error } = await authClient.verifyEmail({ query: { token } })

        if (error) {
          setStatus("error")
          return
        }

        setStatus("success")
      } catch {
        setStatus("error")
      }
    }

    verify()
  }, [token])

  const handleResend = async () => {
    if (!email) return
    setIsResending(true)
    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/",
      })
    } finally {
      setIsResending(false)
    }
  }

  const views: Record<Status, React.ReactNode> = {
    loading: (
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-14 w-14 animate-spin text-primary" />
        <Title text={t("loadingTitle")} size="md" className="font-bold" />
        <p className="text-gray-400">{t("loadingDescription")}</p>
      </div>
    ),

    success: (
      <div className="flex flex-col items-center gap-4">
        <CheckCircle2 className="h-14 w-14 text-green-500" />
        <Title text={t("successTitle")} size="md" className="font-bold" />
        <p className="text-gray-400">{t("successDescription")}</p>
        <Button className="mt-2 h-12 w-full" onClick={() => router.push("/")}>
          {t("successButton")}
        </Button>
      </div>
    ),

    error: (
      <div className="flex flex-col items-center gap-4">
        <XCircle className="h-14 w-14 text-red-500" />
        <Title text={t("errorTitle")} size="md" className="font-bold" />
        <p className="text-center text-gray-400">{t("errorDescription")}</p>
        {email && (
          <Button
            variant="outline"
            loading={isResending}
            className="mt-2 h-12 w-full"
            onClick={handleResend}
          >
            {t("errorResend")}
          </Button>
        )}
        <Button
          variant="ghost"
          className="h-10 w-full"
          onClick={() => router.push("/")}
        >
          {t("errorBack")}
        </Button>
      </div>
    ),

    invalid: (
      <div className="flex flex-col items-center gap-4">
        <XCircle className="h-14 w-14 text-yellow-500" />
        <Title text={t("invalidTitle")} size="md" className="font-bold" />
        <p className="text-center text-gray-400">{t("invalidDescription")}</p>
        <Button
          variant="ghost"
          className="mt-2 h-12 w-full"
          onClick={() => router.push("/")}
        >
          {t("invalidBack")}
        </Button>
      </div>
    ),
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        {views[status]}
      </div>
    </div>
  )
}
