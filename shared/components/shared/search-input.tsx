"use client"

import { cn } from "@/shared/lib"
import { Search } from "lucide-react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { useState, useRef } from "react"
import { useClickAway, useDebounce } from "react-use"
import { Api } from "@/shared/services/api-client"
import { ProductWithRelations } from "@/@types/prisma"

import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

interface Props {
  className?: string
}

export const SearchInput = ({ className }: Props) => {
  const t = useTranslations("Header")
  const commonT = useTranslations("Common")
  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState<ProductWithRelations[]>([])
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
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50"
          />
        )}
      </AnimatePresence>

      <div
        ref={ref}
        className={cn(
          "relative z-30 flex h-11 flex-1 justify-between rounded-2xl transition-all duration-200",
          focused && "shadow-lg ring-2 ring-primary/20",
          className
        )}
      >
        <Search className="absolute top-1/2 left-3 h-5 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full rounded-2xl bg-secondary pl-11 transition-colors outline-none focus:bg-background"
          type="text"
          placeholder={t("searchPlaceholder")}
          onFocus={() => setFocused(true)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <AnimatePresence>
          {focused && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute top-full left-0 z-30 mt-2 w-full rounded-xl bg-background py-2 shadow-2xl"
            >
              <div className="max-h-[500px] overflow-y-auto">
                {products.map((product) => (
                  <Link
                    onClick={onClickItem}
                    key={product.id}
                    className="flex w-full items-center gap-3 px-3 py-2 transition-colors hover:bg-primary/5"
                    href={`/product/${product.id}`}
                  >
                    <div className="relative h-10 w-10 shrink-0">
                      <Image
                        fill
                        className="rounded-md object-contain"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {commonT.rich("priceFrom", {
                          price: product.items[0]?.price,
                          bold: (chunks) => <b>{chunks}</b>,
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
