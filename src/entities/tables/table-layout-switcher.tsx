"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { icons } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

export type TableLayout = {
  type: "grid" | "list"
  icon: keyof typeof icons
}

const tableLayouts: TableLayout[] = [
  {
    type: "grid",
    icon: "LayoutGrid",
  },
  {
    type: "list",
    icon: "LayoutList",
  },
]

interface TableLayoutSwitcherProps {
  layoutType: TableLayout["type"]
  setLayoutType: React.Dispatch<React.SetStateAction<TableLayout["type"]>>
}

function TableLayoutSwitcher({
  layoutType,
  setLayoutType,
}: TableLayoutSwitcherProps) {
  const layoutId = React.useId()

  return (
    <div className="hidden h-11 items-center rounded-md bg-background-100 p-1 ring-1 ring-border sm:flex">
      {tableLayouts.map((tableLayout, i) => (
        <Button
          key={i}
          type="button"
          onClick={() => setLayoutType(tableLayout.type)}
          variant="empty"
          className={cn(
            "relative h-9 w-10 text-muted-foreground hover:text-foreground",
            tableLayout.type === layoutType && "text-foreground"
          )}
        >
          {layoutType === tableLayout.type && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 rounded-md bg-accent"
              transition={{ type: "spring", duration: 0.15 }}
            />
          )}
          <span className="relative z-10">
            <LucideIcon name={tableLayout.icon} />
          </span>
        </Button>
      ))}
    </div>
  )
}

export default TableLayoutSwitcher
