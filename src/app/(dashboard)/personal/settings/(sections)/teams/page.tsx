import React from "react"

import { AccountTeams } from "@/widgets/pages"
import { CreateTeamForm } from "@/features/forms"

function TeamsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Команды</h2>
          <CreateTeamForm />
        </div>
        <p className="text-sm text-secondary-foreground">
          Управляйте командами, в которых вы участвуете, присоединяйтесь к
          предложенным или создавайте новые.
        </p>
      </div>
      <AccountTeams />
    </div>
  )
}

export default TeamsPage
