import { cn } from "@/shared/lib/utils"

interface Props {
  text: string
  className?: string
}

export const ErrorText = ({ text, className }: Props) => {
  return <p className={cn("text-sm text-destructive", className)}>{text}</p>
}
