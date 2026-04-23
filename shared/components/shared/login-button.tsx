import { User } from "lucide-react"
import { Button } from "../ui"
import { useTranslations } from "next-intl"

export const LoginButton = () => {
  const t = useTranslations("Header")
  return (
    <Button variant="outline" className="flex items-center gap-1">
      <User size={16} />
      {t("login")}
    </Button>
  )
}
