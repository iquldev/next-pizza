import { cn } from "@/shared/lib"
import { CircleCheck } from "lucide-react"
import Image from "next/image"

interface Props {
  className?: string
  imageUrl: string
  name: string
  price: number
  active?: boolean
  onClick?: () => void
}

export const IngredientItem = ({
  name,
  price,
  imageUrl,
  onClick,
  active,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md",
        { "border border-primary": active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <Image width={110} height={110} src={imageUrl} alt={name} />
      <span className="mb-1 text-xs">{name}</span>
      <span className="font-bold">{price} $</span>
    </div>
  )
}
