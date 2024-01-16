import React from "react"

import ThemeToggle from "@/widgets/layout/theme-toggle"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

function ComponentsPage() {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-x-hidden">
      <div className="flex flex-1 flex-col px-8 pt-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <h1 className="text-4xl font-bold">Components</h1>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Buttons</h2>
            <div className="flex gap-4">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">Default Size</Button>
              <Button variant="outline" size="sm">
                SM Size
              </Button>
              <Button variant="outline" size="md">
                XL Size
              </Button>
              <Button variant="outline" size="lg">
                LG Size
              </Button>
              <Button variant="outline" size="icon">
                I
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Inputs</h2>
            <div className="flex gap-4">
              <Input placeholder="Input" className="w-[320px]" />
              <Input placeholder="Input" disabled className="w-[320px]" />
            </div>
          </div>
        </div>
      </div>
      <footer className="h-32 w-screen border-t bg-gray-600"></footer>
    </div>
  )
}

export default ComponentsPage
