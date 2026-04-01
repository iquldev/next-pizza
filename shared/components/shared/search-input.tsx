"use client"

import { cn } from "@/shared/lib"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { useClickAway, useDebounce } from "react-use"
import { Api } from "@/shared/services/api-client"
import { Product } from "@prisma/client"

interface Props {
  className?: string
}

export const SearchInput = ({ className }: Props) => {
  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(
    async () => {
      try {
        if (!searchValue) {
          setProducts([])
          return
        }

        const response = await Api.Products.search(searchValue)
        setProducts(response)
      } catch (error) {
        console.log(error)
      }
    },
    250,
    [searchValue]
  )

  const onClickItem = () => {
    setFocused(false)
    setSearchValue("")
    setProducts([])
  }

  return (
    <>
      {focused && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-30 bg-black/50" />
      )}

      <div
        ref={ref}
        className={cn(
          "relative z-30 flex h-11 flex-1 justify-between rounded-2xl",
          className
        )}
      >
        <Search className="absolute top-1/2 left-3 h-5 translate-y-[-50%] text-gray-400" />
        <input
          className="w-full rounded-2xl bg-gray-100 pl-11 outline-none"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200",
              focused && "visible top-12 opacity-100"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <Image
                  width={32}
                  height={32}
                  className="rounded-sm"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
