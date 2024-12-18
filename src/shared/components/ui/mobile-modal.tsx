import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/shared/lib/utils"

function MobileModal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root {...props} />
}

const MobileModalTrigger = DrawerPrimitive.Trigger

const MobileModalContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="fixed inset-0 bg-zinc-950/60" />
    <DrawerPrimitive.Content
      ref={ref}
      className="fixed inset-x-0 bottom-0 rounded-t-xl bg-accent-600"
      {...props}
    >
      <div className="relative inset-x-0 top-0 my-2 flex items-start justify-center">
        <span className="h-1.5 w-12 rounded-full bg-accent-400" />
      </div>
      <div className={cn("relative", className)}>{children}</div>
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
))
MobileModalContent.displayName = DrawerPrimitive.Content.displayName

const MobileModalTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
MobileModalTitle.displayName = DrawerPrimitive.Title.displayName

const MobileModalDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
MobileModalDescription.displayName = DrawerPrimitive.Description.displayName

export {
  MobileModal,
  MobileModalTrigger,
  MobileModalContent,
  MobileModalTitle,
  MobileModalDescription,
}
