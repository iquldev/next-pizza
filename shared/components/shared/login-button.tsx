"use client"

import { LogOut, User } from "lucide-react"
import { Button, Popover } from "../ui"
import { useTranslations } from "next-intl"
import { authClient } from "@/shared/lib"
import { useState } from "react"
import { AuthModal } from "./modals/auth-modal/auth-modal"
import { PopoverContent, PopoverTrigger } from "../ui/popover"

export const LoginButton = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const t = useTranslations("Header")
  const tAuth = useTranslations("Auth")

  const { data, isPending } = authClient.useSession()

  const onClickLogout = async () => {
    await authClient.signOut()
    window.location.reload()
  }

  if (data?.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default" className="flex items-center gap-1">
            <User size={16} />
            {t("profile")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          <Button
            onClick={onClickLogout}
            variant="ghost"
            className="flex w-full items-center justify-start gap-2 px-4 py-6 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
          >
            <LogOut size={16} />
            {tAuth("logout")}
          </Button>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <>
      <Button
        onClick={() => setOpenAuthModal(true)}
        loading={isPending}
        variant={isPending ? "default" : "outline"}
        className="flex items-center gap-1"
      >
        <User size={16} />
        {t("login")}
      </Button>

      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  )
}
