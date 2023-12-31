"use client"

import * as React from "react"
import { useAuth, useOrganization, useOrganizationList } from "@clerk/nextjs"

interface UserLayoutProps {
  children: React.ReactNode
}

function UserLayout({ children }: UserLayoutProps) {
  const { isLoaded: isLoadedOrganization, organization } = useOrganization()
  const { isLoaded: isLoadedOrganizationList, setActive } =
    useOrganizationList()
  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (isLoadedOrganization && isLoadedOrganizationList && organization) {
      startTransition(async () => {
        await setActive({ organization: null })
      })
    }
  }, [isLoadedOrganization, isLoadedOrganizationList])

  if (isPending) {
    return <p>Pending...</p>
  }

  if (!isLoadedOrganization || !isLoadedOrganizationList) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default UserLayout
