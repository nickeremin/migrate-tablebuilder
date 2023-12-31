"use client"

import React from "react"
import { useAuth } from "@clerk/nextjs"
import { useDebounce } from "usehooks-ts"

import { SearchInput } from "@/features/search"
import { Button } from "@/shared/components/ui/button"
import { trpc } from "@/app/_trpc/client"

function OrganizationTables() {
  const { has, isLoaded, orgSlug } = useAuth()

  const [search, setSearch] = React.useState("")
  const debouncedValue = useDebounce(search, 500)

  const {} = trpc.tables.getTablesByName.useQuery(debouncedValue, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="flex items-center gap-3">
        <SearchInput
          search={search}
          setSearch={setSearch}
          debouncedValue={debouncedValue}
        />
      </div>
    </div>
  )
}

export default OrganizationTables
