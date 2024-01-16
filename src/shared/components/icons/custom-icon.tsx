import { cn } from "@/shared/lib/utils"

import { customIcons, type IconProps } from "./custom-icons"

interface CustomIconProps extends IconProps {
  name: keyof typeof customIcons
}

function CustomIcon({ name, className, ...props }: CustomIconProps) {
  const Icon = customIcons[name]

  return (
    <Icon className={cn("h-5 w-5", className)} {...props} aria-hidden="true" />
  )
}

export default CustomIcon
