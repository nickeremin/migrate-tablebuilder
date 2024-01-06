"use client"

import Link from "next/link"
import { type SelectTable } from "@/db/schema"
import { useAuth } from "@clerk/nextjs"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

import { TableCard } from "."
import { type TableLayout } from "./table-layout-switcher"

interface TableListProps {
  tables: SelectTable[]
  layoutType: TableLayout["type"]
}

function TableList({ tables, layoutType = "grid" }: TableListProps) {
  const { orgSlug } = useAuth()

  return (
    <div
      className={cn(
        "gap-3",
        layoutType === "grid" &&
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        layoutType === "list" && "flex flex-col"
      )}
    >
      {tables.map((table) => (
        <div key={table.id} className="group relative">
          <Link
            href={
              orgSlug ? `/${orgSlug}/tables/${table.id}` : `/tables/${table.id}`
            }
            target="_blank"
            className="absolute right-0 top-0 z-10 flex h-8 w-8 -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all hover:bg-accent-6 group-hover:opacity-100"
          >
            <LucideIcon name="ExternalLink" className="h-4 w-4" />
          </Link>
          <div className="pointer-events-none grid rounded-xl bg-background-100 shadow-sm transition-all group-hover:shadow-md dark:shadow-none dark:group-hover:bg-muted">
            <Link
              href={
                orgSlug
                  ? `/${orgSlug}/tables/${table.id}`
                  : `/tables/${table.id}`
              }
              className="grid-area-1 pointer-events-auto"
            />
            <div className="grid-area-1">
              <TableCard table={table} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TableList
