import React from "react"
import { usePathname } from "next/navigation"

function OrganizationSettingsNav() {
  const pathname = usePathname()
  return <aside className="relative flex flex-col"></aside>
}

export default OrganizationSettingsNav
