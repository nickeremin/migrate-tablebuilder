import React from "react"

import CreateTableForm from "@/features/forms/table/create-personal-table-form"
import { Card } from "@/shared/components/ui/card"

function NewTablePage() {
  return (
    <div className="max-w-xl p-10">
      <Card className="p-6">
        <CreateTableForm />
      </Card>
    </div>
  )
}

export default NewTablePage
