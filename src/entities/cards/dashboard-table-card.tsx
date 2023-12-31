"use client"

import * as React from "react"
import Link from "next/link"
import { SelectTable } from "@/db/schema"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { MoreHorizontalIcon } from "lucide-react"
import { Drawer } from "vaul"

import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { getRandomPatternStyle } from "@/shared/lib/generate-pattern"
import { trpc } from "@/app/_trpc/client"

interface DashboardTableCardProps {
  table: SelectTable
  layout: "grid" | "list"
}

function DashboardTableCard({ table, layout }: DashboardTableCardProps) {
  const [openPopover, setOpenPopover] = React.useState(false)
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const utils = trpc.useUtils()
  const { mutateAsync: updateFavorite } =
    trpc.tables.updateTableSettings.useMutation({
      onSuccess() {
        utils.tables.getAllTables.invalidate()
        utils.tables.getTablesByName.invalidate()
      },
    })

  return layout === "grid" ? (
    <Card className="bg-transparent">
      <AspectRatio ratio={21 / 9}>
        <div
          className="h-full rounded-t-xl border-b"
          style={getRandomPatternStyle(String(table.id))}
        />
      </AspectRatio>
      <div className="flex justify-between p-6">
        <div className="flex flex-col gap-1">
          <CardTitle>{table.name}</CardTitle>
          <CardDescription>Обновлена 3д 5ч назад</CardDescription>
        </div>

        {/* Desktop table menu */}
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <Button
              aria-label="Открыть меню таблицы"
              variant="ghost"
              className="pointer-events-auto -mt-2 hidden h-9 w-9 p-0 dark:hover:bg-accent-2 sm:inline-flex"
            >
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[240px] rounded-xl p-2">
            <ul className="flex list-none flex-col">
              <li
                onClick={async () => {
                  setOpenPopover(false)
                  await updateFavorite({
                    ...table,
                    favorite: !table.favorite,
                  })
                }}
              >
                <div className="flex h-10 cursor-pointer items-center justify-between rounded-md px-2 text-sm transition-colors hover:bg-muted">
                  Добваить в Избранное
                  {table.favorite ? (
                    <StarFilledIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <StarIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>
              </li>
              <li onClick={() => setOpenPopover(false)}>
                <Link
                  href="/dashboard"
                  tabIndex={-1}
                  className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                >
                  Хранилище
                </Link>
              </li>
              <li onClick={() => setOpenPopover(false)}>
                <Link
                  href="/dashboard"
                  tabIndex={-1}
                  className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                >
                  Участники
                </Link>
              </li>
              <li onClick={() => setOpenPopover(false)}>
                <Link
                  href="/dashboard"
                  tabIndex={-1}
                  className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                >
                  Настройки
                </Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        {/* Mobile table menu */}
        <Drawer.Root open={openDrawer} onOpenChange={setOpenDrawer}>
          <Drawer.Trigger asChild>
            <Button
              aria-label="Открыть меню таблицы"
              variant="ghost"
              className="pointer-events-auto -mt-2 h-9 w-9 p-0 dark:hover:bg-accent-2 sm:hidden"
            >
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
            <Drawer.Content className="shadow-menu-border fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-lg border-t bg-background-100 p-2">
              <ul className="flex list-none flex-col">
                <li onClick={() => setOpenDrawer(false)}>
                  <Link
                    href="/dashboard"
                    tabIndex={-1}
                    className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                  >
                    Добваить в Избранное
                  </Link>
                </li>
                <li onClick={() => setOpenDrawer(false)}>
                  <Link
                    href="/dashboard"
                    tabIndex={-1}
                    className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                  >
                    Хранилище
                  </Link>
                </li>
                <li onClick={() => setOpenDrawer(false)}>
                  <Link
                    href="/dashboard"
                    tabIndex={-1}
                    className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                  >
                    Участники
                  </Link>
                </li>
                <li onClick={() => setOpenDrawer(false)}>
                  <Link
                    href="/dashboard"
                    tabIndex={-1}
                    className="flex h-10 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                  >
                    Настройки
                  </Link>
                </li>
              </ul>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </Card>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>{table.name} Entity Card</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default DashboardTableCard
