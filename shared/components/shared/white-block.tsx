import { cn } from "@/shared/lib/utils"

import { Title } from "./title"

interface Props {
  title?: string
  endAdornment?: React.ReactNode
  className?: string
  contentClassName?: string
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  contentClassName,
  className,
  endAdornment,
  children,
}) => {
  return (
    <div className={cn("rounded-3xl bg-background", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-border p-5 px-7">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  )
}
