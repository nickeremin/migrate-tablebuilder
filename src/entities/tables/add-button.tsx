"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { icons } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
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
import { useModal } from "@/shared/lib/hooks"
import { cn } from "@/shared/lib/utils"

type AddAction = {
  title: string
  href: string
  icon: keyof typeof icons
}

const addActions: AddAction[] = [
  {
    title: "Таблицу",
    href: "/tables/new",
    icon: "Table2",
  },
  {
    title: "Хранилище",
    href: "/storages/new",
    icon: "Database",
  },
  {
    title: "Участника",
    href: "/members",
    icon: "UserPlus",
  },
]

function AddButton() {
  const { orgSlug } = useAuth()
  const { openMobile, setOpenMobile, openDesktop, setOpenDesktop } = useModal()

  return (
    <>
      {/* Mobile Button */}
      <MobileModal open={openMobile} onOpenChange={setOpenMobile}>
        <MobileModalTrigger asChild>
          <Button className="h-11 w-11 sm:hidden">
            <LucideIcon name="Plus" />
          </Button>
        </MobileModalTrigger>
        <MobileModalContent className="px-2 pb-2">
          <ul className="flex flex-col overflow-hidden rounded-xl bg-accent-accessible-600">
            {addActions.map((action, i) => (
              <Link
                key={i}
                href={orgSlug ? `/${orgSlug}${action.href}` : action.href}
              >
                <li
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "flex h-12 items-center justify-between px-2 text-sm transition-colors hover:bg-accent-400",
                    i !== addActions.length - 1 &&
                      "border-b border-b-accent-accessible-500"
                  )}
                >
                  {action.title}
                  <LucideIcon
                    name={action.icon}
                    className="text-secondary-foreground"
                  />
                </li>
              </Link>
            ))}
          </ul>
        </MobileModalContent>
      </MobileModal>

      {/* Desktop Button */}
      <Popover open={openDesktop} onOpenChange={setOpenDesktop}>
        <PopoverTrigger asChild>
          <Button className="group hidden h-11 w-[160px] justify-between sm:inline-flex">
            Добавить...
            <LucideIcon
              name="ChevronRight"
              className="transition-transform group-data-[state=open]:rotate-90"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[160px] rounded-xl">
          <ul className="flex flex-col">
            {addActions.map((action, i) => (
              <Link
                key={i}
                href={orgSlug ? `/${orgSlug}${action.href}` : action.href}
                className="overflow-hidden first:rounded-t-xl last:rounded-b-xl"
              >
                <li
                  onClick={() => setOpenDesktop(false)}
                  className="flex h-11 items-center gap-2 px-4 text-sm transition-colors hover:bg-accent"
                >
                  <LucideIcon
                    name={action.icon}
                    className="text-secondary-foreground"
                  />
                  {action.title}
                </li>
              </Link>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default AddButton
