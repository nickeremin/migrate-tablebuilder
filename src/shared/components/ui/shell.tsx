import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const shellVariants = cva("mx-auto px-6", {
  variants: {
    variant: {
      default: "max-w-full w-[--content-page-width-with-margin]",
      header: "w-[--page-width-with-margin] my-auto flex items-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

const Shell = React.forwardRef<HTMLDivElement, ShellProps>(
  ({ className, variant, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(shellVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Shell.displayName = "Shell"

export { Shell, shellVariants }
