"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

import { SiteFooter } from "@/widgets/layout"
import { Icons } from "@/shared/components/icons"
import { Separator } from "@/shared/components/ui/separator"
import { Skeleton } from "@/shared/components/ui/skeleton"

const DesktopNavbar = dynamic(
  () => import("/src/widgets/layout/navs/desktop-navbar.tsx"),
  { ssr: false }
)

const MobileNavMenu = dynamic(
  () => import("/src/widgets/layout/navs/mobile-nav-menu.tsx"),
  { ssr: false }
)

function RootNotFound() {
  const { user, isLoaded } = useUser()

  console.log({ isLoaded })

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen">
        <div className="h-[102px] bg-accent-1 shadow-border-b">
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
      <div className="sticky top-0 h-16 bg-accent-1 shadow-border-b">
        <div className="m-auto flex h-full select-none items-center bg-inherit px-4 lg:px-6">
          <div className="flex flex-1 items-center pr-6">
            <div className="flex max-w-full items-center">
              <Link href="/tables">
                <Icons.logo className="h-6 w-6" />
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
          <DesktopNavbar />
          <MobileNavMenu backgroundColor="bg-accent-1" />
        </div>
      </div>
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <h1 className="my-2 text-[48px] font-semibold">404</h1>
          <p className="text-muted-foreground">
            Вы вошли как <strong>stillimmortal@gmail.com</strong>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default RootNotFound
