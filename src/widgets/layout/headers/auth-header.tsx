"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"

import LogoIcon from "@/shared/components/logo"
import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { cn } from "@/shared/lib/utils"

const MobileNavMenu = dynamic(
  () => import("/src/widgets/layout/navs/mobile-nav-menu.tsx"),
  { ssr: false }
)

function AuthHeader() {
  const pathname = usePathname()

  // Based on pathname switch button on sign in or sign up
  const label = String(pathname).includes("signup")
    ? "Войти"
    : "Создать аккаунт"
  const href = String(pathname).includes("signup") ? "/signin" : "/signup"

  return (
    <div
      className={cn(
        "mobile-menu-background-transition sticky top-0 z-50 flex h-16 justify-center bg-accent-1 shadow-border-nav",
        "before:absolute before:top-[-1px] before:-z-10 before:h-full before:w-full before:backdrop-blur-[6px] before:backdrop-saturate-200 before:content-['']"
      )}
    >
      <Shell as="header" variant="header">
        <div className="flex flex-1 justify-between">
          <Link
            aria-label="Перейти на главную страницу"
            href="/"
            className="flex items-center gap-2"
          >
            <LogoIcon className="h-6 w-6" aria-hidden="true" />
            <PageHeading size="logo" className="font-bold">
              Tablebuilder
            </PageHeading>
          </Link>
          <MobileNavMenu />
        </div>
        <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
          <Link
            href="/contact"
            className="m-0.5 p-0.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Связаться с нами
          </Link>
          <Link
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "whitespace-nowrap",
              })
            )}
          >
            {label}
          </Link>
        </div>
      </Shell>
    </div>
  )
}

export default AuthHeader
