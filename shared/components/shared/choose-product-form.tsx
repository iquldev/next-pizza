import { cn } from "@/shared/lib"
import { Button } from "../ui"
import { Title } from "./title"

interface Props {
  imageUrl: string
  name: string
  loading?: boolean
  className?: string
}
export const ChooseProductForm = ({
  imageUrl,
  name,
  loading,
  className,
}: Props) => {
  const textDetaills = `Классическое тесто, томатный соус, моцарелла, пармезан, томаты черри, базилик, оливковое масло`
  const totalPrice = 10

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

        <p className="text-gray-400">{textDetaills}</p>

        <Button
          loading={loading}
          className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
        >
          Добавить в корзину за {totalPrice} $
        </Button>
      </div>
    </div>
  )
}
