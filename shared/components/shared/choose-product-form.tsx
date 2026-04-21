import { cn } from "@/shared/lib"
import { Button } from "../ui"
import { Title } from "./title"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface Props {
  imageUrl: string
  name: string
  loading?: boolean
  className?: string
  price: number
  onAddToCart: (itemId: number, ingredientsIds: number[]) => void
}
export const ChooseProductForm = ({
  imageUrl,
  name,
  loading,
  className,
  price,
  onAddToCart,
}: Props) => {
  const t = useTranslations("Cart")
  const commonT = useTranslations("Common")

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="relative flex w-full flex-1 items-center justify-center">
        <Image
          src={imageUrl}
          alt={name}
          width={350}
          height={350}
          className="relative top-2 left-2 z-10 transition-all duration-300"
        />
      </div>

      <div className="w-[490px] bg-surface-secondary p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <Button
          loading={loading}
          className="mt-5 h-[55px] w-full rounded-[18px] px-10 text-base"
          onClick={() => onAddToCart(1, [])}
        >
          {t("addToCart")}{" "}
          <motion.span
            key={price}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-1"
          >
            {price} {commonT("currency")}
          </motion.span>
        </Button>
      </div>
    </div>
  )
}
