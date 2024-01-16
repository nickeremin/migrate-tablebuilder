import { SelectTable } from "@/database/schema"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"

import { TableList } from "."
import { TableLayout } from "./table-layout-switcher"

interface FavoriteTablesProps {
  tables: SelectTable[]
  layoutType: TableLayout["type"]
  search: string
}

function FavoriteTables({ tables, layoutType, search }: FavoriteTablesProps) {
  if (tables.length > 0 && search.length === 0)
    return (
      <Collapsible
        className="-mt-2 data-[state=open]:border-b data-[state=open]:pb-5 sm:-mt-4"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="group gap-2 pl-2">
            <LucideIcon
              name="ChevronRight"
              className="transition-transform group-data-[state=open]:rotate-90"
            />
            Избранное
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3">
          <TableList layoutType={layoutType} tables={tables} />
        </CollapsibleContent>
      </Collapsible>
    )
}

export default FavoriteTables
