import * as React from "react"

import { OrganizationSettingsNav } from "@/widgets/layout"

interface OrganizationDefaultSettingsLayoutProps {
  children: React.ReactNode
}

function OrganizationDefaultSettingsLayout({
  children,
}: OrganizationDefaultSettingsLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="relative flex flex-col">
        <OrganizationSettingsNav />
      </aside>
      <div className="relative mt-6 hidden flex-col lg:ml-6 lg:mt-0 lg:flex">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default OrganizationDefaultSettingsLayout
