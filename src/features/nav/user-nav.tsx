"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"

import { UserNavSelectTheme } from "@/entities/theme"
import { LucideIcon } from "@/shared/components/icons"
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import {
  DesktopModal,
  DesktopModalContent,
} from "@/shared/components/ui/desktop-modal"
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { useModal } from "@/shared/lib/hooks"
import { cn } from "@/shared/lib/utils"

import { CreateOrganizationForm } from "../forms"

function UserNav() {
  const { signOut } = useClerk()
  const { user } = useUser()
  const router = useRouter()

  const [isPending, startTransition] = React.useTransition()
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const { openDesktop, setOpenDesktop, openMobile, setOpenMobile } = useModal()

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "relative h-8 w-8 rounded-full transition-opacity",
              user ? "opacity-100" : "opacity-0"
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt="" />
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={12} align="end" className="w-[240px]">
          <div className="px-5 pb-3 pt-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-sm leading-none text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          <PopoverItem className="">
            <Link
              href="/settings"
              className="-mx-5 -my-2 flex items-center px-5 py-2"
            >
              Настройки Аккаунта
            </Link>
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <LucideIcon name="Settings" className="h-[18px] w-[18px]" />
            </div>
          </PopoverItem>

          <PopoverItem>
            <CreateOrganizationForm>
              <Button variant="empty" size="empty">
                Создать Команду
                <LucideIcon name="Plus" />
              </Button>
            </CreateOrganizationForm>
          </PopoverItem>

          <div className="mx-5 my-3 border-t" />

          <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-2 text-sm text-muted-foreground transition-colors hover:text-accent-foreground">
              Тема
              <UserNavSelectTheme />
            </div>
            <div
              onClick={() => {
                signOut(() => router.push("/signin"))
              }}
              className="flex cursor-pointer items-center justify-between px-5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Выйти
              <LucideIcon name="LogOut" />
            </div>
          </div>

          <div className="mx-5 my-3 border-t" />

          <div className="px-5 pb-4 pt-2">
            <Button className="w-full">Стать Про</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )

  // return user ? (
  //   <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
  //     <DropdownMenu open={open} onOpenChange={setOpen}>
  //       <DropdownMenuTrigger asChild>
  //         <Button
  //           aria-label={user.username ?? ""}
  //           variant="ghost"
  //           className={cn(
  //             "relative h-8 w-8 rounded-full transition-opacity",
  //             user ? "opacity-100" : "opacity-0"
  //           )}
  //         >
  //           <Avatar className="h-8 w-8">
  //             <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
  //             <AvatarFallback>EN</AvatarFallback>
  //           </Avatar>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent className="w-56" align="end" forceMount>
  //         <DropdownMenuLabel>
  //           <div className="flex flex-col gap-1">
  //             <p className="text-sm font-medium leading-none">
  //               {user?.username}
  //             </p>
  //             <p className="text-xs leading-none text-muted-foreground">
  //               {user?.primaryEmailAddress?.emailAddress}
  //             </p>
  //           </div>
  //         </DropdownMenuLabel>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuGroup>
  //           <DropdownMenuItem asChild>
  //             <Link href="/dashboard" className="hover:cursor-pointer">
  //               Панель управления
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem asChild>
  //             <Link href="/account" className="hover:cursor-pointer">
  //               Настройки
  //               <Settings2Icon className="ml-auto h-4 w-4" />
  //             </Link>
  //           </DropdownMenuItem>
  //           <DialogTrigger asChild>
  //             <DropdownMenuItem
  //               onClick={() => setOpen(false)}
  //               className="hover:cursor-pointer"
  //             >
  //               Создать команду
  //               <PlusIcon className="ml-auto h-4 w-4" />
  //             </DropdownMenuItem>
  //           </DialogTrigger>
  //           <DropdownMenuItem
  //             onClick={(e) => {
  //               e.preventDefault()
  //             }}
  //             className="hover:cursor-pointer"
  //           >
  //             Поделиться
  //             <Share1Icon className="ml-auto h-4 w-4" />
  //           </DropdownMenuItem>
  //         </DropdownMenuGroup>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuGroup>
  //           <DropdownMenuSub>
  //             <DropdownMenuSubTrigger>Тема</DropdownMenuSubTrigger>
  //             <DropdownMenuPortal>
  //               <DropdownMenuSubContent>
  //                 {themes.map(({ title, icon: ThemeIcon, value }) => (
  //                   <DropdownMenuItem
  //                     key={value}
  //                     onClick={(e) => {
  //                       e.preventDefault()
  //                       setTheme(value)
  //                     }}
  //                     className="hover:cursor-pointer"
  //                   >
  //                     <ThemeIcon className="mr-2 h-4 w-4" />
  //                     {title}
  //                     <CheckIcon
  //                       className={cn(
  //                         "ml-auto h-4 w-4",
  //                         value === theme ? "opacity-100" : "opacity-0"
  //                       )}
  //                     />
  //                   </DropdownMenuItem>
  //                 ))}
  //               </DropdownMenuSubContent>
  //             </DropdownMenuPortal>
  //           </DropdownMenuSub>
  //           <SignOutButton
  //             signOutCallback={() =>
  //               startTransition(() => {
  //                 router.push(`${window.location.origin}/?redirect=false`)
  //               })
  //             }
  //           >
  //             <DropdownMenuItem
  //               disabled={isPending}
  //               onClick={(e) => {
  //                 e.preventDefault()
  //               }}
  //               className="hover:cursor-pointer"
  //             >
  //               {isPending && (
  //                 <Icons.spinner className="mr-2 mt-[2px] h-4 w-4 animate-spin" />
  //               )}
  //               Выйти
  //               <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
  //             </DropdownMenuItem>
  //           </SignOutButton>
  //         </DropdownMenuGroup>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem asChild>
  //           <Button className="h-full w-full hover:cursor-pointer focus:bg-primary/90 focus:text-primary-foreground">
  //             Перейти на Pro
  //           </Button>
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Создать команду</DialogTitle>
  //         <DialogDescription>
  //           Добавьте новую команду для управления таблицами.
  //         </DialogDescription>
  //       </DialogHeader>
  //       <div>
  //         <div className="space-y-4 py-2 pb-4">
  //           <div className="space-y-2">
  //             <Label htmlFor="name">Название команды</Label>
  //             <Input id="name" placeholder="Acme Inc." />
  //           </div>
  //           <div className="space-y-2">
  //             <Label htmlFor="plan">План подписки</Label>
  //             <Select>
  //               <SelectTrigger>
  //                 <SelectValue placeholder="Выберите план" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="free">
  //                   <span className="font-medium">Free</span> -{" "}
  //                   <span className="text-muted-foreground">
  //                     Пробный период две недели
  //                   </span>
  //                 </SelectItem>
  //                 <SelectItem value="pro">
  //                   <span className="font-medium">Pro</span> -{" "}
  //                   <span className="text-muted-foreground">
  //                     $9/месяц за пользователя
  //                   </span>
  //                 </SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //         </div>
  //       </div>
  //       <DialogFooter>
  //         <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
  //           Cancel
  //         </Button>
  //         <Button type="submit">Continue</Button>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // ) : (
  //   <Skeleton className="h-8 w-8 rounded-full" />
  // )
}

export default UserNav
