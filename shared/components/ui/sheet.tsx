"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"
import { XIcon } from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"

const SheetContext = React.createContext<{ open?: boolean }>({})

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  const [open, setOpen] = React.useState(
    props.open || props.defaultOpen || false
  )

  React.useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open)
    }
  }, [props.open])

  const onOpenChange = (val: boolean) => {
    setOpen(val)
    props.onOpenChange?.(val)
  }

  return (
    <SheetContext.Provider value={{ open }}>
      <SheetPrimitive.Root {...props} open={open} onOpenChange={onOpenChange} />
    </SheetContext.Provider>
  )
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      asChild
      forceMount
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn("fixed inset-0 z-50 bg-black/70", className)}
      />
    </SheetPrimitive.Overlay>
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  const { open } = React.useContext(SheetContext)

  return (
    <SheetPortal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <SheetOverlay />
            <SheetPrimitive.Content
              data-slot="sheet-content"
              asChild
              forceMount
              {...props}
            >
              <motion.div
                initial={
                  side === "right"
                    ? { x: "100%" }
                    : side === "left"
                      ? { x: "-100%" }
                      : side === "top"
                        ? { y: "-100%" }
                        : { y: "100%" }
                }
                animate={{ x: 0, y: 0 }}
                exit={
                  side === "right"
                    ? { x: "100%" }
                    : side === "left"
                      ? { x: "-100%" }
                      : side === "top"
                        ? { y: "-100%" }
                        : { y: "100%" }
                }
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn(
                  "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition-none outline-none",
                  side === "top" && "inset-x-0 top-0 h-auto border-b",
                  side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
                  side === "left" &&
                    "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
                  side === "right" &&
                    "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
                  className
                )}
              >
                {children}
                {showCloseButton && (
                  <SheetPrimitive.Close
                    data-slot="sheet-close"
                    className="absolute top-4 right-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:bg-secondary hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary"
                    asChild
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <XIcon />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetPrimitive.Close>
                )}
              </motion.div>
            </SheetPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-base font-medium text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
