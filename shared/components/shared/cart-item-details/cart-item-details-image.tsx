import { cn } from "@/shared/lib/utils"
import Image from "next/image"

interface Props {
  src: string
  className?: string
}

export const CartItemDetailsImage = ({ src, className }: Props) => {
  return (
    <Image
      className={cn("shrink-0 object-contain", className)}
      src={src}
      width={60}
      height={60}
      alt=""
    />
  )
}
