"use client"

import Link from "next/link"
import { type SelectTable } from "@/db/schema"
import { useAuth } from "@clerk/nextjs"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { icons } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Button } from "@/shared/components/ui/button"
import { Card, CardTitle } from "@/shared/components/ui/card"
import {
  MobileModal,
  MobileModalContent,
  MobileModalTrigger,
} from "@/shared/components/ui/mobile-modal"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { getRandomPatternStyle } from "@/shared/lib/generate-pattern"
import { useModal } from "@/shared/lib/hooks"
import { trpc } from "@/app/_trpc/client"

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

        <MenuButton table={table} />

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

type MenuLink = {
  title: string
  href: string
  icon: keyof typeof icons
}

const menuLinks: MenuLink[] = [
  {
    title: "Хранилище",
    href: "/storage",
    icon: "Database",
  },
  {
    title: "Участники",
    href: "/settings/members",
    icon: "Users",
  },
  {
    title: "Настройки",
    href: "/settings",
    icon: "Settings",
  },
]

interface MenuButtonProps {
  table: SelectTable
}

function MenuButton({ table }: MenuButtonProps) {
  const { orgSlug } = useAuth()

  const { openMobile, setOpenMobile, openDesktop, setOpenDesktop } = useModal()
  const utils = trpc.useUtils()
  const { mutateAsync: updateFavorite } =
    trpc.tables.updateTableSettings.useMutation({
      onSuccess() {
        utils.tables.invalidate()
      },
    })

  return (
    <>
      {/* Mobile Button */}
      <MobileModal>
        <MobileModalTrigger asChild></MobileModalTrigger>
        <MobileModalContent></MobileModalContent>
      </MobileModal>

      {/* Desktop Button */}
      <Popover open={openDesktop} onOpenChange={setOpenDesktop}>
        <PopoverTrigger asChild>
          <Button
            aria-label="Открыть меню таблицы"
            variant="ghost"
            className="pointer-events-auto -mt-2 hidden h-9 w-9 p-0 dark:hover:bg-accent-2 sm:inline-flex"
          >
            <LucideIcon name="MoreHorizontal" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[240px] rounded-xl">
          <ul className="flex list-none flex-col">
            <li className="flex h-11 items-center rounded-t-xl text-sm transition-colors hover:bg-accent">
              <Button
                onClick={async () => {
                  setOpenDesktop(false)
                  await updateFavorite({
                    ...table,
                    favorite: !table.favorite,
                  })
                }}
                variant="empty"
                size="empty"
                className="h-full w-full justify-between rounded-t-xl px-4 font-normal"
              >
                Добавить в Избранное
                {table.favorite ? (
                  <StarFilledIcon
                    className="h-5 w-5 text-blue"
                    aria-hidden="true"
                  />
                ) : (
                  <StarIcon
                    className="h-5 w-5 text-secondary-foreground"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </li>
            {menuLinks.map((link, i) => (
              <Link
                key={i}
                onClick={() => setOpenDesktop(false)}
                href={orgSlug ? `/${orgSlug}${link.href}` : link.href}
                className="last:overflow-hidden last:rounded-b-xl"
              >
                <li className="flex h-11 items-center justify-between px-4 text-sm transition-colors hover:bg-accent">
                  {link.title}
                  <LucideIcon
                    name={link.icon}
                    className="text-secondary-foreground"
                  />
                </li>
              </Link>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default TableCard
