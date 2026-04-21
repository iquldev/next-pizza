import { cn } from "@/shared/lib"
import { motion } from "framer-motion"

interface Props {
  imageUrl: string
  size: number
  alt: string
  className?: string
}

export const ProductImage = ({ imageUrl, size, alt, className }: Props) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-1 items-center justify-center",
        className
      )}
    >
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          width: size === 20 ? 300 : size === 30 ? 400 : 500,
          height: size === 20 ? 300 : size === 30 ? 400 : 500,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        src={imageUrl}
        alt={alt}
        className="relative top-2 left-2 z-10"
      />

      <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-border" />
      <div className="absolute top-1/2 left-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-muted" />
    </div>
  )
}
