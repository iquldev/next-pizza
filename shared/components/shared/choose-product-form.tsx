import { cn } from "@/shared/lib"
import { Button } from "../ui"
import { Title } from "./title"

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
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="relative flex w-full flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name}
          className="relative top-2 left-2 z-10 h-[350px] w-[350px] transition-all duration-300"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <Button
          loading={loading}
          className="mt-5 h-[55px] w-full rounded-[18px] px-10 text-base"
          onClick={() => onAddToCart(1, [])}
        >
          Добавить в корзину за {price} $
        </Button>
      </div>
    </div>
  )
}
