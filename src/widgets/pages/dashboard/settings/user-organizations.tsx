"use client"

import { type } from "os"
import * as React from "react"
import Link from "next/link"
import {
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs"
import { type OrganizationMembershipResource } from "@clerk/types"
import {
  CrossCircledIcon,
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"

import { CreateOrganizationForm } from "@/features/forms"
// import { CreateTeamForm } from "@/features/forms"
import { Icons } from "@/shared/components/icons"
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"

const orgRole = {
  "org:admin": "Админ",
  "org:member": "Участник",
}

function UserOrganizations() {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [search, setSearch] = React.useState("")

  const { userMemberships, isLoaded, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const { data: organizations, isLoading } = userMemberships

  return (
    <div className="flex flex-col gap-6">
      {/* Searchbar */}
      <div className="search-input-border flex h-11 items-center rounded-md bg-background-100 transition-all">
        <div className="-mr-3 flex h-full shrink-0 flex-col items-center justify-center bg-transparent px-3 text-muted-foreground">
          {false ? (
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
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setSearch("")
              inputRef.current?.focus()
            }}
            className="-ml-3 inline-flex h-full shrink-0 flex-col items-center justify-center px-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <CrossCircledIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-col">
        {isLoaded ? (
          isLoading ? (
            <OrganizationLoading />
          ) : organizations && organizations.length > 0 ? (
            <OrganizationList organizations={organizations} />
          ) : (
            <div className="flex h-[360px] flex-col items-center justify-center gap-8 rounded-md border bg-muted/50 px-4 py-8">
              <div className="flex flex-col items-center gap-2">
                <p className="font-medium">Команды не найдены</p>
                <p className="text-center text-sm text-muted-foreground ">
                  Создайте новую команду Tablebuilder для сотрудничества с
                  другими пользователями.
                </p>
              </div>
              <CreateOrganizationForm>
                <Button>Создать Аккаунт</Button>
              </CreateOrganizationForm>
            </div>
          )
        ) : (
          <OrganizationLoading />
        )}
      </div>
    </div>
  )
}

function OrganizationLoading() {
  return (
    <div className="flex flex-col">
      <Card className="flex flex-row items-center justify-between p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-60" />
        </div>
        <div className="flex flex-row gap-4">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-9" />
        </div>
      </Card>
    </div>
  )
}

interface OrganizationListProps {
  organizations: OrganizationMembershipResource[]
}

function OrganizationList({ organizations }: OrganizationListProps) {
  return (
    <div className="flex flex-col gap-3">
      {organizations.map(({ organization, role }) => (
        <Card
          key={organization.id}
          className="flex items-center justify-between p-6"
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={organization.imageUrl} alt="" />
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{organization.name}</p>
              <p className="text-sm font-medium text-muted-foreground">
                {orgRole[role]}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href={`/${organization.slug}/tables`}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Таблицы
            </Link>

            <Button variant="outline" className="ml-4 mr-6">
              Настройки
            </Button>
            <Button variant="ghost" size="icon">
              <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default UserOrganizations
