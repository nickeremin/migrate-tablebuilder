import * as React from "react"

import { DashboardNav, SiteFooter, TableHeader } from "@/widgets/layout"

interface TableLayoutProps {
  children: React.ReactNode
}

function TableLayout({ children }: TableLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <TableHeader />
      <DashboardNav />
      <main className="min-h-[calc(100vh-85px)]">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default TableLayout
