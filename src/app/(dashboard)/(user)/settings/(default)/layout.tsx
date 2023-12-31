import * as React from "react"

import { UserSettingsNav } from "@/widgets/layout"

interface DefaultUserSettingsLayoutProps {
  children: React.ReactNode
}

function DefaultUserSettingsLayout({
  children,
}: DefaultUserSettingsLayoutProps) {
  return (
    <>
      <aside className="relative flex flex-col">
        <UserSettingsNav />
      </aside>
      <div className="relative mt-6 hidden flex-col lg:ml-6 lg:mt-0 lg:flex">
        <main>{children}</main>
      </div>
    </>
  )
}

export default DefaultUserSettingsLayout
