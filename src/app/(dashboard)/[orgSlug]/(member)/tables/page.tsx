"use client"

import React from "react"
import { useOrganization } from "@clerk/nextjs"

import { DashboardHeader, DashboardNav, SiteFooter } from "@/widgets/layout"
import { OrganizationTables } from "@/widgets/pages"
import { Shell } from "@/shared/components/shells/shell"

function TeamTables() {
  const { organization } = useOrganization()

  return (
    <div className="relative min-h-screen">
      <DashboardHeader />
      <DashboardNav />
      <main className="min-h-[calc(100vh-85px)]">
        <div className="flex min-h-[calc(100vh-84px)] flex-col bg-background-200">
          <Shell>
            <div className="my-4 sm:my-6">
              <OrganizationTables />
            </div>
          </Shell>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default TeamTables
