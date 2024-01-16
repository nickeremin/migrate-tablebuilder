import React from "react"

import { cn } from "@/shared/lib/utils"

type ColorPallete = {
  type: string
  colors: string[]
}

const colors: ColorPallete[] = [
  {
    type: "Main Colors",
    colors: [
      "bg-background",
      "bg-foreground",
      "bg-primary",
      "bg-primary-foreground",
      "bg-secondary",
      "bg-secondary-foreground",
      "bg-muted",
      "bg-accent",
      "bg-muted-foreground",
      "bg-accent-foreground",
    ],
  },
  {
    type: "IOS System Gray",
    colors: [
      "bg-gray-100",
      "bg-gray-200",
      "bg-gray-300",
      "bg-gray-400",
      "bg-gray-500",
      "bg-gray-600",
    ],
  },
]

function ColorsPage() {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <div className="flex flex-col px-8 pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">All Colors</h1>
          {colors.map((cp) => (
            <div key={cp.type} className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">{cp.type}</h2>
              <div className="flex flex-wrap gap-4">
                {cp.colors.map((c) => (
                  <ColorItem key={c} backgroundColor={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ColorItem({ backgroundColor }: { backgroundColor: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg font-bold">{backgroundColor}</p>
      <div
        className={cn(
          "h-16 w-16 rounded-xl ring-1 ring-foreground/20",
          backgroundColor
        )}
      />
    </div>
  )
}

export default ColorsPage
