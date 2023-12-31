"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { CaretSortIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { CheckIcon, PlusCircleIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/components/ui/command"
import {
  DesktopModal,
  DesktopModalContent,
} from "@/shared/components/ui/desktop-modal"
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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/app/_trpc/client"

function TableSwitcher() {
  const router = useRouter()
  const params = useParams()
  const tableId = params?.tableId as string

  const [openDesktop, setOpenDesktop] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)

  const [search, setSearch] = React.useState("")

  const utils = trpc.useUtils()
  const { data: tables } = trpc.tables.getAllTables.useQuery()
  const { mutateAsync: updateFavorite } =
    trpc.tables.updateTableProps.useMutation({
      onSuccess() {
        utils.tables.getAllTables.invalidate()
      },
    })

  const currentTable = tables?.find((table) => table.id === tableId)

  // Reset desktop search on open
  React.useEffect(() => {
    if (openDesktop) {
      setSearch("")
    }
  }, [openDesktop])

  return (
    <div className="flex items-center gap-0.5">
      <Link title={currentTable?.name} href={`/tables/${tableId}`}>
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src="https://avatar.vercel.sh/acme-inc.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <span className="flex h-full flex-1 items-center truncate text-sm">
            {currentTable ? (
              currentTable.name
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </span>
        </div>
      </Link>

      {/* Desktop account and team switcher  */}
      <Popover open={openDesktop} onOpenChange={setOpenDesktop}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-10 w-7 text-secondary-foreground hover:text-secondary-foreground sm:inline-flex"
          >
            <CaretSortIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] overflow-hidden">
          <Command>
            {/* Tables Search */}
            <div className="border-b">
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Найти Таблицу..."
              />
            </div>

            <CommandList className="mt-2">
              <CommandEmpty className="p-4 pt-2 text-start">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium">Таблиц не Найдено</p>
                    <p className="text-muted-foreground">
                      Ваш поиск &#8220;{search}&#8221; не соответствует ни одной
                      таблице.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => setSearch("")}
                    variant="outline"
                    className="rounded-lg"
                  >
                    Очистить Поиск
                  </Button>
                </div>
              </CommandEmpty>

              {/* Tables */}
              <CommandGroup heading="Таблицы">
                {tables
                  ?.toSorted((a, b) => Number(b.favorite) - Number(a.favorite))
                  .map((table) => (
                    <CommandItem
                      key={table.id}
                      className="group h-10 gap-4"
                      onSelect={() => {
                        router.push(`/tables/${table.id}`)
                        setOpenDesktop(false)
                      }}
                    >
                      <span className="flex-1 truncate">{table.name}</span>
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.stopPropagation()
                          await updateFavorite({
                            ...table,
                            favorite: !table.favorite,
                          })
                        }}
                        className={cn(
                          "px-1 py-2 transition-all",
                          table.favorite
                            ? "text-blue hover:text-blue/70"
                            : "text-muted-foreground opacity-0 hover:text-accent-foreground group-hover:opacity-100"
                        )}
                      >
                        {table.favorite ? (
                          <StarFilledIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        ) : (
                          <StarIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>

                      <CheckIcon
                        className={cn(
                          "h-4 w-4 text-secondary-foreground opacity-0",
                          table.id === currentTable?.id && "opacity-100"
                        )}
                        aria-hidden="true"
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandSeparator />

              {/* Create Team Button */}
              <CommandGroup>
                <CommandItem
                  aria-label="Перейти к созданию новой таблицы"
                  className="h-10 gap-2"
                  onSelect={() => {
                    setOpenDesktop(false)
                  }}
                >
                  <PlusCircleIcon
                    className="text-blue h-4 w-4"
                    aria-hidden="true"
                  />
                  <span>Создать Таблицу</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Mobile account and team switcher  */}
      <MobileModal
        open={openMobile}
        onOpenChange={setOpenMobile}
        onClose={() => {
          setSearch("")
        }}
      >
        <MobileModalTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-7 sm:hidden">
            <CaretSortIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </MobileModalTrigger>
        <MobileModalContent className="h-full max-h-[80vh]">
          <div className="flex flex-col p-4 pt-2">
            <Command className="gap-4">
              {/* Teams Search */}
              <div className="bg-accent-accessible-600 rounded-xl">
                <CommandInput
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Найти Таблицу..."
                />
              </div>

              <CommandList>
                <CommandEmpty className="text-start">
                  <div className="bg-accent-accessible-600 flex flex-col gap-4 rounded-xl p-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Таблиц не Найдено</p>
                      <p className="text-muted-foreground">
                        Ваш поиск &#8220;{search}&#8221; не соответствует ни
                        одной таблице.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onPointerDown={(e) => {
                        e.preventDefault()
                      }}
                      onClick={() => {
                        setSearch("")
                      }}
                      className="h-10"
                    >
                      Очистить Поиск
                    </Button>
                  </div>
                </CommandEmpty>

                {/* Tables */}
                <CommandGroup heading="Таблицы">
                  <div className="bg-accent-accessible-600 [&_div]:border-b-accent-accessible-500 overflow-hidden rounded-xl [&_div:last-child]:border-b-0 [&_div]:border-b">
                    {tables
                      ?.toSorted(
                        (a, b) => Number(b.favorite) - Number(a.favorite)
                      )
                      .map((table) => (
                        <CommandItem
                          data-value={`${table.name}-f`}
                          key={table.id}
                          className="aria-selected:bg-accent-accessible-500 group h-10 gap-4"
                          onSelect={() => {
                            router.push(`/tables/${table.id}`)
                            setOpenMobile(false)
                          }}
                        >
                          <span className="flex-1 truncate">{table.name}</span>
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.stopPropagation()
                              await updateFavorite({
                                ...table,
                                favorite: !table.favorite,
                              })
                            }}
                            className="px-1 py-2"
                          >
                            {table.favorite ? (
                              <StarFilledIcon
                                className="text-blue h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <StarIcon
                                className="h-5 w-5 text-muted-foreground"
                                aria-hidden="true"
                              />
                            )}
                          </button>

                          <CheckIcon
                            // strokeWidth={1.5}
                            className={cn(
                              "h-5 w-5 opacity-0",
                              table.id === currentTable?.id && "opacity-100"
                            )}
                            aria-hidden="true"
                          />
                        </CommandItem>
                      ))}
                  </div>
                </CommandGroup>

                {/* Create Table Button */}
                <Link
                  href="/tables"
                  className={cn(
                    buttonVariants({
                      variant: "success",
                      size: "xl",
                      className: "mt-6 w-full",
                    }),
                    search.length > 0 && "hidden"
                  )}
                  onClick={() => {
                    setOpenMobile(false)
                  }}
                >
                  Создать Таблицу
                </Link>
              </CommandList>
            </Command>
          </div>
        </MobileModalContent>
      </MobileModal>
    </div>
  )
}

export default TableSwitcher
