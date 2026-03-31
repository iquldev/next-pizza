import { cn } from "@/shared/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Title } from "./title"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

interface Props {
  className?: string
  name: string
  price: number
  imageUrl: string
  id: string
}

export const ProductCard = ({
  className,
  name,
  price,
  imageUrl,
  id,
}: Props) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/product/${id}`}>
        <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
          <Image width={215} height={215} src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mt-3 mb-1 font-bold" />

        <p className="text-sm text-gray-400">
          Цыпленок, грибы, томаты, моцарелла, соус барбекю
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            от <b>{price} $</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
