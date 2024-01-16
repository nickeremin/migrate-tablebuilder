"use client"

import React from "react"
import { useCycle } from "framer-motion"

import { MobileMenuToggleButton } from "@/widgets/layout"
import MobileHeaderWrapper from "@/widgets/layout/headers/mobile-header-wrapper"
import { PageHeading } from "@/shared/components/ui/page-header"

function page() {
  const [isOpen, toggleOpen] = useCycle(false, true)

  return (
    <div className="max-w-screen relative flex flex-col">
      <MobileHeaderWrapper
        isOpen={isOpen}
        backgroundColor="var(--background-hsl)"
        scrollTop={true}
      >
        <div className="flex h-16 w-full items-center px-6">
          <div className="flex flex-1 items-center">
            <PageHeading size="logo" className="font-bold">
              Tablebuilder
            </PageHeading>
          </div>
          <div>
            <MobileMenuToggleButton isOpen={isOpen} toggleOpen={toggleOpen} />
          </div>
        </div>
      </MobileHeaderWrapper>
      <div className="h-screen w-1/2 bg-cyan-300" />
      <div className="h-screen w-1/2 bg-rose-400" />
    </div>
  )
}

export default page
