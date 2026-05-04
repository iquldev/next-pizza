"use client"

import { useState } from "react"
import Image from "next/image"
import { Button, Dialog } from "@/shared/components/ui"
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib"
import { LoginForm } from "./forms/login-form"
import { RegisterForm } from "./forms/register-form"
import { authClient } from "@/shared/lib"

interface Props {
  open: boolean
  onClose: () => void
  className?: string
}

export const AuthModal = ({ open, onClose, className }: Props) => {
  const [type, setType] = useState<"login" | "register">("login")

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login")
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={cn("w-[450px] bg-background p-10", className)}>
        <DialogTitle className="sr-only">Auth Modal</DialogTitle>
        {type === "login" ? (
          <LoginForm onSwitchType={onSwitchType} />
        ) : (
          <RegisterForm onSwitchType={onSwitchType} />
        )}

        <hr />

        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }}
            type="button"
            className="h-12 gap-2"
          >
            <Image
              width={24}
              height={24}
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="dark:invert"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }}
            type="button"
            className="h-12 gap-2"
          >
            <Image
              width={24}
              height={24}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
              alt="Google"
            />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
