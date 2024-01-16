"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"

import { SiteFooter } from "@/widgets/layout"
import { LucideIcon } from "@/shared/components/icons"
import CustomIcon from "@/shared/components/icons/custom-icon"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { Shell } from "@/shared/components/ui/shell"
import { Skeleton } from "@/shared/components/ui/skeleton"

// const DesktopNavbar = dynamic(
//   () => import("/src/widgets/layout/navs/desktop-navbar.tsx"),
//   { ssr: false }
// )

// const MobileNavMenu = dynamic(
//   () => import("/src/widgets/layout/navs/mobile-nav-menu.tsx"),
//   { ssr: false }
// )

function RootNotFound() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen">
        <div className="bg-accent-light h-[102px] shadow-border-b">
          <div className="relative m-auto flex h-16 select-none items-center px-4 lg:px-6">
            <div className="flex flex-1 items-center pr-6">
              <Skeleton className="h-8 w-40" />
            </div>
          </div>
        </div>
        <main className="min-h-[calc(100vh-102px)]"></main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="bg-accent-light sticky top-0 z-50 flex h-16 shadow-border-nav">
        <Shell variant="header" className="">
          <div className="flex flex-1 items-center pr-6">
            <div className="flex max-w-full items-center">
              <Link href="/tables">
                <CustomIcon name="Logo" className="h-6 w-6" />
              </Link>
              <Separator
                orientation="vertical"
                className="mx-5 h-6 rotate-[30deg]"
              />
              <Link
                href="/tables"
                className="h-6 w-6 rotate-45 cursor-not-allowed rounded-full border border-background bg-gradient-to-r from-blue to-purple"
              ></Link>
            </div>
          </div>
          {/* <DesktopNavbar />
          <MobileNavMenu /> */}
        </Shell>
      </div>
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center pb-24 pt-12">
        <div className="flex flex-col items-center">
          <h1 className="my-2 text-[48px] font-bold leading-tight">404</h1>
          <p className="h-12 text-center text-base/5 text-muted-foreground">
            Вы вошли как <strong>stillimmortal@gmail.com</strong>
          </p>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await signOut(() => router.push("/signin"))
              })
            }}
            size="lg"
            className="mt-4 w-full whitespace-nowrap"
          >
            {isPending ? (
              <LucideIcon name="Loader" className="h-6 w-6 animate-spin" />
            ) : (
              "Войти под другим пользователем"
            )}
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default RootNotFound
