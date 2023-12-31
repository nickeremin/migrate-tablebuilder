import * as React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { DashboardHeader, DashboardNav, SiteFooter } from "@/widgets/layout"

interface TablesLayoutProps {
  children: React.ReactNode
}

async function TablesLayout({ children }: TablesLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <div className="relative min-h-screen">
      <div className="bg-background-100">
        <DashboardHeader />
        <DashboardNav />
      </div>
      <main className="min-h-[calc(100vh-85px)]">
        <div className="flex min-h-[calc(100vh-84px)] flex-col bg-background-200">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default TablesLayout
