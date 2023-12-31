"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

const items = ["Таблицы", "Хранилище", "Настройки"]

function TablePage() {
  const [currentTab, setCurrentTab] = React.useState<number>()
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center">
      {/* <div className="flex items-center">
        {items.map((item, i) => (
          <div
            onMouseEnter={() => setCurrentTab(i)}
            key={i}
            className={cn("relative cursor-pointer px-3 py-2")}
          >
            {i === currentTab && (
              <motion.div
                layoutId="submenu-highlight-tab"
                className="absolute inset-0 rounded-md bg-accent"
                transition={{ duration: 0.15 }}
              />
            )}
            <span className="relative z-10">{item}</span>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default TablePage
