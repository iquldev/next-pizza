import { Suspense } from "react"
import { EmailVerification } from "@/shared/components/shared/modals/auth-modal/forms/email-verification"

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <EmailVerification />
    </Suspense>
  )
}
