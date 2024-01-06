import React from "react"

import { OrganizationMembersTable } from "@/widgets/pages"
import { AddMembersForm } from "@/features/forms"

function OrganizationMembersPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-tight">Участники</h2>
          <p className="text-sm text-secondary-foreground">
            Управляйте и приглашайте членов команды.
          </p>
        </div>
        <AddMembersForm />
        <OrganizationMembersTable />
      </div>
    </div>
  )
}

export default OrganizationMembersPage
