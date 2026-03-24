import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"

interface Props {
  className?: string
}

export const SortPopup = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5",
        className
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярные</b>
    </div>
  )
}
