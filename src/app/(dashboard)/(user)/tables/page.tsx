"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import { UserTables } from "@/widgets/pages"
import { TablesLoading } from "@/entities/loadings"
import { Shell } from "@/shared/components/ui/shell"

function TablesPage() {
  const { orgId, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <Shell>
        <div className="my-4 sm:my-6">
          <TablesLoading />
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="my-4 sm:my-6">
        <UserTables key={orgId} />
      </div>
    </Shell>
  )
}

export default TablesPage
