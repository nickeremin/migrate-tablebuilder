"use client"

import { type SelectTable } from "@/db/schema"

import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Card, CardTitle } from "@/shared/components/ui/card"
import { getRandomPatternStyle } from "@/shared/lib/generate-pattern"

interface TableCardProps {
  table: SelectTable
}

function TableCard({ table }: TableCardProps) {
  return (
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
          <p className="text-sm text-muted-foreground">Обновлена 3д 5ч назад</p>
        </div>

        {/* Desktop table menu */}
        {/* <Popover open={openPopover} onOpenChange={setOpenPopover}>
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
    </Popover> */}

        {/* Mobile table menu */}
        {/* <Drawer.Root open={openDrawer} onOpenChange={setOpenDrawer}>
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
    </Drawer.Root> */}
      </div>
    </Card>
  )
}

export default TableCard
