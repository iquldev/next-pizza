import { ProductFormSkeleton } from "@/shared/components/shared"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { getTranslations } from "next-intl/server"

export default async function Loading() {
  const t = await getTranslations("Common")

  return (
    <Dialog open={true}>
      <DialogContent className="min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-background p-0 sm:max-w-none">
        <DialogTitle className="sr-only">{t("loading")}</DialogTitle>
        <ProductFormSkeleton />
      </DialogContent>
    </Dialog>
  )
}
