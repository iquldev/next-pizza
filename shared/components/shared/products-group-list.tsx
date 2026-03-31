"use client"

import { ProductCard } from "./product-card"
import { cn } from "@/shared/lib/utils"
import { Title } from "./title"
import { useIntersection } from "react-use"
import { useRef, useEffect, type RefObject } from "react"
import { useCategoryStore } from "@/shared/store/category"

interface Props {
  title: string
  items: any[]
  categoryId: number
  className?: string
  listClassName?: string
}

export const ProductsGroupList = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}: Props) => {
  const intersectionRef = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLElement>,
    {
      threshold: 0,
      rootMargin: "-15% 0px -80% 0px",
    }
  )

  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId])

  const id = title.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className={cn("", className)} id={id} ref={intersectionRef}>
      <Title text={title} size="lg" className="mb-5 font-extrabold" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  )
}
