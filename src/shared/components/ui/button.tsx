import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  `inline-flex items-center justify-center font-medium transition-colors select-none 
  disabled:bg-muted disabled:ring-1 disabled:ring-border disabled:text-muted-foreground disabled:cursor-not-allowed
  focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-100`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-red text-destructive-foreground hover:bg-red/90",
        outline:
          "ring-1 ring-border hover:bg-accent text-secondary-foreground hover:text-primary",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-blue hover:bg-blue/90 text-white",
        empty: "",
      },
      size: {
        default: "h-9 px-3 rounded-md text-sm",
        sm: "h-8  rounded-md px-2 text-xs",
        lg: "h-10 rounded-lg px-4 text-sm",
        xl: "h-12 rounded-xl px-6 text-base",
        icon: "h-9 w-9 rounded-md",
        empty: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
