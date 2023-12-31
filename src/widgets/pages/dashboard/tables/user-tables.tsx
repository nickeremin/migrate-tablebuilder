"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  CrossCircledIcon,
  ExternalLinkIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import {
  ChevronRightIcon,
  LayoutGridIcon,
  ListIcon,
  PlusIcon,
} from "lucide-react"
import { useDebounce } from "usehooks-ts"

import { DashboardTableCard } from "@/entities/cards"
import { TablesLoading } from "@/entities/loadings"
import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
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
import { addNewButtonItems } from "@/shared/config/site/constants"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/app/_trpc/client"

type LayoutType = "grid" | "list"
const layouts: LayoutType[] = ["grid", "list"]

const addNewItems = ["Таблицу", "Хранилище", "Участника"]

function UserTables() {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [search, setSearch] = React.useState("")
  const debouncedValue = useDebounce(search, 500)

  const [layout, setLayout] = React.useState<LayoutType>("grid")

  const [open, setOpen] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)

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
        {/* Searchbar */}
        <div className="search-input-border flex h-11 flex-1 items-center rounded-md bg-background-100 transition-all">
          <div className="-mr-3 flex h-full shrink-0 flex-col items-center justify-center bg-transparent px-3 text-muted-foreground">
            {search !== debouncedValue ? (
              <Icons.spinner
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </div>
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            type="search"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="inline-flex h-full w-full bg-transparent px-3 text-base placeholder:text-muted-foreground focus-visible:outline-none"
          />
          {search.length > 0 && (
            <Button
              variant="empty"
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setSearch("")
                inputRef.current?.focus()
              }}
              className="-ml-3 inline-flex h-full shrink-0 flex-col items-center justify-center px-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <CrossCircledIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          )}
        </div>

        {/* Switchbar */}
        <div className="hidden h-11 items-center rounded-md bg-background-100 p-1 ring-1 ring-border lg:flex">
          {layouts.map((mode, i) => (
            <Button
              key={i}
              type="button"
              onClick={() => setLayout(mode)}
              variant="empty"
              className={cn(
                "relative h-9 w-10 text-muted-foreground hover:text-foreground",
                mode === layout && "text-foreground"
              )}
            >
              {mode === layout && (
                <motion.div
                  layoutId="dashboard-tables-switchbar"
                  style={{
                    borderRadius: 6,
                  }}
                  className="absolute inset-0 bg-accent"
                  transition={{ type: "spring", duration: 0.15 }}
                />
              )}
              <span className="relative z-10">
                {mode === "grid" ? (
                  <LayoutGridIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ListIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Button>
          ))}
        </div>

        {/* Desktop add-new button */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="group hidden h-11 w-[140px] justify-between rounded-md px-4 lg:inline-flex">
              Добавить...
              <ChevronRightIcon
                className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[140px] overflow-hidden rounded-xl">
            <ul className="flex flex-col">
              {addNewButtonItems.map((item, i) => {
                const Icon = Icons[item.icon]
                return (
                  <li key={i} onClick={() => setOpen(false)}>
                    <Link
                      href="/tables"
                      className="flex h-10 items-center gap-2 px-2 text-sm transition-colors hover:bg-accent"
                    >
                      <Icon
                        className="h-4 w-4 text-secondary-foreground"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </PopoverContent>
        </Popover>

        {/* Mobile add-new button */}
        <MobileModal
          shouldScaleBackground={false}
          open={openMobile}
          onOpenChange={setOpenMobile}
        >
          <MobileModalTrigger asChild>
            <Button size="icon" className="h-11 w-11 shrink-0 lg:hidden">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </MobileModalTrigger>
          <MobileModalContent>
            <div className="flex flex-col gap-4 p-4 pt-2">
              <ul className="flex flex-col overflow-hidden rounded-xl bg-accent-accessible-600">
                {addNewButtonItems.map((item, i) => {
                  const Icon = Icons[item.icon]

                  return (
                    <li
                      key={i}
                      onClick={() => setOpenMobile(false)}
                      className={cn(
                        i != addNewItems.length - 1 &&
                          "border-b border-b-accent-accessible-500"
                      )}
                    >
                      <Link
                        href="/tables"
                        className="flex h-12 items-center justify-between px-2 transition-colors hover:bg-accent-400"
                      >
                        {item.title}
                        <Icon
                          className="h-5 w-5 "
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </MobileModalContent>
        </MobileModal>
      </div>

      <div className="flex flex-col gap-5">
        {tables && tables.length > 0 ? (
          <>
            {/* Favorite tables */}
            {favoriteTables &&
              favoriteTables.length > 0 &&
              search.length === 0 && (
                <Collapsible
                  className="-mt-2 data-[state=open]:border-b data-[state=open]:pb-5 sm:-mt-4"
                  defaultOpen
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="group gap-2 pl-2">
                      <ChevronRightIcon
                        className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-90"
                        aria-hidden="true"
                      />
                      Избранное
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div
                      className={cn(
                        "grid gap-6",
                        layout === "grid"
                          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                          : "grid-cols-1"
                      )}
                    >
                      {favoriteTables.map((table) => (
                        <div key={table.id} className="group relative">
                          <Link
                            href={`/tables/${table.id}`}
                            target="_blank"
                            className="absolute right-0 top-0 z-10 flex h-8 w-8 -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-all hover:bg-accent-7 group-hover:opacity-100"
                          >
                            <ExternalLinkIcon
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </Link>
                          <div
                            key={table.id}
                            className="pointer-events-none grid rounded-xl bg-background-100 shadow-sm transition-all group-hover:shadow-md dark:shadow-none dark:group-hover:bg-muted"
                          >
                            <Link
                              href={`/tables/${table.id}`}
                              className="grid-area-1 pointer-events-auto"
                            />
                            <div className="grid-area-1">
                              <DashboardTableCard
                                layout={layout}
                                table={table}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

            {/* All tables */}
            <div
              className={cn(
                "grid gap-6",
                layout === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {tables?.map((table) => (
                <div key={table.id} className="group relative">
                  <Link
                    href={`/tables/${table.id}`}
                    target="_blank"
                    className="absolute right-0 top-0 z-10 flex h-8 w-8 -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-all hover:bg-accent-7 group-hover:opacity-100"
                  >
                    <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <div
                    key={table.id}
                    className="pointer-events-none grid rounded-xl bg-background-100 shadow-sm transition-all group-hover:shadow-md dark:shadow-none dark:group-hover:bg-muted"
                  >
                    <Link
                      href={`/tables/${table.id}`}
                      className="grid-area-1 pointer-events-auto"
                    />
                    <div className="grid-area-1">
                      <DashboardTableCard layout={layout} table={table} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-xl bg-background p-12 ring-1 ring-border">
            <p className="text-medium text-sm">Таблиц не Найдено</p>
            <p className="text-balance text-center text-sm text-muted-foreground">
              Ваш поиск по запросу &#8220;{debouncedValue}&#8221; не дал
              результатов.
            </p>
            <Link
              href="/tables"
              className="underline-link inline-flex items-center gap-1 pt-4 text-sm text-link"
            >
              Новая Таблица
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserTables
