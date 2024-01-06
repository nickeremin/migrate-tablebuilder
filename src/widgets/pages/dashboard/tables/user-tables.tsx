"use client"

import * as React from "react"
import { useDebounce } from "usehooks-ts"

import { SearchInput } from "@/features/search"
import { TablesLoading } from "@/entities/loadings"
import {
  AddButton,
  FavoriteTables,
  TableEmptySearch,
  TableLayoutSwitcher,
  TableList,
} from "@/entities/tables"
import { type TableLayout } from "@/entities/tables/table-layout-switcher"
import { trpc } from "@/app/_trpc/client"

function UserTables() {
  const [search, setSearch] = React.useState("")
  const debouncedValue = useDebounce(search, 500)

  const [layoutType, setLayoutType] =
    React.useState<TableLayout["type"]>("grid")

  const utils = trpc.useUtils()
  const { data: tables, isLoading } = trpc.tables.getTablesByName.useQuery(
    debouncedValue,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  const favoriteTables = tables?.filter((table) => table.favorite)

  React.useEffect(() => {
    return () => {
      utils.tables.getTablesByName.reset()
    }
  }, [])

  if (isLoading) {
    return <TablesLoading />
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="flex items-center gap-3">
        <SearchInput
          search={search}
          setSearch={setSearch}
          debouncedValue={debouncedValue}
        />
        <TableLayoutSwitcher
          layoutType={layoutType}
          setLayoutType={setLayoutType}
        />
        <AddButton />
      </div>

      {tables && tables.length > 0 ? (
        <div className="flex flex-col gap-5">
          <FavoriteTables
            layoutType={layoutType}
            search={search}
            tables={favoriteTables ?? []}
          />
          <TableList layoutType={layoutType} tables={tables} />
        </div>
      ) : (
        <TableEmptySearch search={debouncedValue} />
      )}
    </div>
  )
}

export default UserTables
