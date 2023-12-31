import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const inputVariants = cva(
  `flex w-full bg-background-100 text-sm ring-1 ring-border transition-all
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-ring 
  disabled:cursor-not-allowed disabled:bg-disabled`,
  {
    variants: {
      variant: {
        default: "h-9 px-3 py-1 rounded-md",
        lg: "h-10 px-3 py-1 rounded-lg",
        xl: "h-12 px-3 py-1 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
