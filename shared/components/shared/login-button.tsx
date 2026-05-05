"use client"

import {
  Button,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
} from "../ui"
import { useTranslations } from "next-intl"
import { authClient } from "@/shared/lib"
import { useState } from "react"
import { AuthModal } from "./modals/auth-modal/auth-modal"
import { Link } from "@/i18n/routing"
import { CircleUser, LogOut, User } from "lucide-react"
import { redirect } from "next/navigation"

export const LoginButton = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const t = useTranslations("Header")
  const tAuth = useTranslations("Auth")
  const tOrders = useTranslations("Orders")

  const { data, isPending } = authClient.useSession()

  const onClickLogout = async () => {
    await authClient.signOut()
    redirect("/")
  }

  if (data?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="flex items-center gap-1"
            loading={isPending}
          >
            <User size={16} />
            {t("profile")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link
              href="/orders"
              className="flex w-full cursor-pointer items-center gap-2 px-4 py-2"
            >
              <CircleUser size={16} />
              {tOrders("title")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onClickLogout}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-destructive hover:text-destructive"
          >
            <LogOut size={16} />
            {tAuth("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
