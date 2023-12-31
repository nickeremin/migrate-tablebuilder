"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon, PlusCircleIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
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
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"

interface AccountSwitcherProps {
  expanded: boolean
}

function AccountSwitcher({ expanded }: AccountSwitcherProps) {
  const router = useRouter()

  const { user } = useUser()
  const { orgSlug } = useAuth()
  const { userMemberships, isLoaded, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })
  const { organization: currentOrganization } = useOrganization()

  const [search, setSearch] = React.useState("")

  const [openDesktop, setOpenDesktop] = React.useState(false)
  const [showNewTeamDesktop, setShowNewTeamDesktop] = React.useState(false)

  const [openMobile, setOpenMobile] = React.useState(false)
  const [showNewTeamMobile, setShowNewTeamMobile] = React.useState(false)

  const [isPending, startTransiton] = React.useTransition()

  // Reset desktop search on open
  React.useEffect(() => {
    if (openDesktop) {
      setSearch("")
    }
  }, [openDesktop])

  return (
    <div className="flex h-10 items-center gap-0.5">
      <Link aria-label="Перейти на страницу всех таблиц" href="/tables">
        <div className="flex items-center gap-2 text-sm font-medium">
          {currentOrganization ? (
            <>
              <Avatar className="h-5 w-5">
                <AvatarImage src={currentOrganization.imageUrl} alt="" />
              </Avatar>
              <span
                className={cn(
                  "flex-1 truncate",
                  expanded ? "flex" : "hidden sm:flex"
                )}
              >
                {currentOrganization.name}
              </span>
            </>
          ) : (
            <>
              <Avatar className="h-5 w-5">
                <AvatarImage src={user?.imageUrl} alt="" />
              </Avatar>
              <span
                className={cn(
                  "flex-1 truncate",
                  expanded ? "flex" : "hidden sm:flex"
                )}
              >
                {user?.username}
              </span>
            </>
          )}
          <span className="hidden rounded-full bg-accent-2 px-3 py-1 text-[11px] font-medium lg:flex">
            Хобби
          </span>
        </div>
      </Link>

      {/* Desktop account and team switcher */}
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
            {/* Teams Search */}
            <div className="border-b">
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Найти Команду..."
              />
            </div>

            <CommandList className="mt-2">
              <CommandEmpty className="p-4 pt-2 text-start">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium">Команд не Найдено</p>
                    <p className="text-muted-foreground">
                      Ваш поиск &#8220;{search}&#8221; не соответствует ни одной
                      команде.
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

              {/* Account */}
              <CommandGroup heading="Личный Аккаунт">
                <CommandItem
                  onSelect={() => {
                    setOpenDesktop(false)
                    startTransiton(async () => {
                      if (isLoaded) {
                        await setActive({
                          organization: null,
                        })
                        router.push(`/tables`)
                      }
                    })
                  }}
                  className="h-10 gap-2"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user?.imageUrl} alt="" />
                  </Avatar>
                  <span className="flex-1 truncate">{user?.username}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-secondary-foreground",
                      currentOrganization ? "opacity-0" : "opacity-100"
                    )}
                    aria-hidden="true"
                  />
                </CommandItem>
              </CommandGroup>

              {/* Teams */}
              <CommandGroup heading="Команды">
                {userMemberships.data?.map(({ organization }) => (
                  <CommandItem
                    key={organization.id}
                    className="h-10 gap-2"
                    onSelect={() => {
                      setOpenDesktop(false)
                      startTransiton(async () => {
                        if (isLoaded) {
                          await setActive({ organization })
                          router.push(`/${organization.slug}/tables`)
                        }
                      })
                    }}
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={organization.imageUrl} />
                    </Avatar>
                    <span className="flex-1 truncate">{organization.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 text-secondary-foreground",
                        currentOrganization?.name === organization.name
                          ? "opacity-100"
                          : "opacity-0"
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
                  aria-label="Открыть форму создания новой команды"
                  className="h-10 gap-2"
                  onSelect={() => {
                    setOpenDesktop(false)
                    setShowNewTeamDesktop(true)
                  }}
                >
                  <PlusCircleIcon
                    className="h-4 w-4 text-blue"
                    aria-hidden="true"
                  />
                  <span>Создать Команду</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Desktop create new team modal */}
      <DesktopModal
        open={showNewTeamDesktop}
        onOpenChange={setShowNewTeamDesktop}
      >
        <DesktopModalContent>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название команды</Label>
                <Input id="name" placeholder="Acme Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">План подписки</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите план" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">
                      <span className="font-medium">Free</span> -{" "}
                      <span className="text-muted-foreground">
                        Пробный период две недели
                      </span>
                    </SelectItem>
                    <SelectItem value="pro">
                      <span className="font-medium">Pro</span> -{" "}
                      <span className="text-muted-foreground">
                        $9/месяц за пользователя
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DesktopModalContent>
      </DesktopModal>

      {/* Mobile account and team switcher */}
      <MobileModal
        open={openMobile}
        onOpenChange={setOpenMobile}
        onClose={() => setSearch("")}
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
              <div className="rounded-xl bg-accent-accessible-600">
                <CommandInput
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Найти Команду..."
                />
              </div>

              <CommandList>
                <CommandEmpty className="text-start">
                  <div className="flex flex-col gap-4 rounded-xl bg-accent-accessible-600 p-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Команд не Найдено</p>
                      <p className="text-muted-foreground">
                        Ваш поиск &#8220;{search}&#8221; не соответствует ни
                        одной команде.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={() => setSearch("")}
                      className="h-10"
                    >
                      Очистить Поиск
                    </Button>
                  </div>
                </CommandEmpty>

                <div className="flex flex-col gap-4">
                  {/* Account */}
                  <CommandGroup heading="Личный Аккаунт">
                    <div className="overflow-hidden rounded-xl bg-accent-accessible-600">
                      <CommandItem
                        onSelect={() => {}}
                        className="h-10 cursor-pointer gap-2 aria-selected:bg-accent-accessible-500"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/some.png`}
                            alt={""}
                          />
                        </Avatar>
                        {user?.username}
                        {/* <CheckIcon
                          className={cn(
                            "ml-auto h-5 w-5",
                            selectedTeam === user?.username
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                          aria-hidden="true"
                        /> */}
                      </CommandItem>
                    </div>
                  </CommandGroup>

                  {/* Teams */}
                  <CommandGroup heading="Команды">
                    <div className="overflow-hidden rounded-xl bg-accent-accessible-600 [&_div:last-child]:border-b-0 [&_div]:border-b [&_div]:border-b-accent-accessible-500">
                      {userMemberships.data?.map(({ organization }) => (
                        <CommandItem
                          key={organization.id}
                          onSelect={() => {}}
                          className="h-10 gap-2 aria-selected:bg-accent-accessible-500"
                        >
                          <Avatar className="h-5 w-5">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${""}.png`}
                              alt={""}
                              className="grayscale"
                            />
                          </Avatar>
                          <span className="flex-1 truncate">
                            {organization.name}
                          </span>
                          <CheckIcon
                            className={cn(
                              "ml-auto h-5 w-5",
                              currentOrganization?.name === organization.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                            aria-hidden="true"
                          />
                        </CommandItem>
                      ))}
                    </div>
                  </CommandGroup>
                </div>

                {/* Create Team Button */}
                <Button
                  variant="success"
                  size="xl"
                  className={cn("mt-6 w-full", search.length > 0 && "hidden")}
                  onClick={() => {
                    setOpenMobile(false)
                    setShowNewTeamMobile(true)
                  }}
                >
                  Создать Команду
                </Button>
              </CommandList>
            </Command>
          </div>
        </MobileModalContent>
      </MobileModal>

      {/* Mobile create new team modal */}
      <MobileModal open={showNewTeamMobile} onOpenChange={setShowNewTeamMobile}>
        <MobileModalContent>
          <div className="h-[50vh]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
            asperiores ipsum harum facilis eaque vero reiciendis quas assumenda.
            Voluptate doloribus voluptates incidunt delectus repudiandae
            praesentium eligendi molestiae quibusdam non doloremque.
          </div>
        </MobileModalContent>
      </MobileModal>
    </div>
  )
}

export default AccountSwitcher
