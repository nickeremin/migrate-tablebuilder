"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import CustomIcon from "@/shared/components/icons/custom-icon"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { Shell } from "@/shared/components/ui/shell"
import { cn } from "@/shared/lib/utils"

import { MobileNavMenu } from ".."

function AuthHeader() {
  const pathname = usePathname()

  //Based on pathname switch button on sign in or sign up
  const title = String(pathname).includes("signup")
    ? "Войти"
    : "Создать аккаунт"
  const href = String(pathname).includes("signup") ? "/signin" : "/signup"

  return (
    <div className="sticky inset-x-0 top-0 z-50 flex h-16 justify-center bg-background/70 shadow-border-nav backdrop-blur-[20px] backdrop-saturate-200">
      <Shell as="header" variant="header">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-2">
            <PageHeading size="logo" className="font-bold">
              Tablebuilder
            </PageHeading>
          </Link>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="px-1 py-0.5 text-sm font-medium text-tertiary transition-colors hover:text-primary"
          >
            Связаться с Нами
          </Link>
          <Link
            data-shadcnui-button
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            {title}
          </Link>
        </div>
        <div>
          <MobileNavMenu />
        </div>
      </Shell>
    </div>
    // <div
    //   className={cn(
    //     "mobile-menu-background-transition sticky top-0 z-50 flex h-16 justify-center bg-accent-1 shadow-border-nav",
    //     "before:absolute before:top-[-1px] before:-z-10 before:h-full before:w-full before:backdrop-blur-[6px] before:backdrop-saturate-200 before:content-['']"
    //   )}
    // >
    //   <Shell as="header" variant="header">
    //     <div className="flex flex-1 justify-between">
    //       <Link
    //         aria-label="Перейти на главную страницу"
    //         href="/"
    //         className="flex items-center gap-2"
    //       >
    //         <CustomIcon name="Logo" className="h-6 w-6" />
    //         <PageHeading size="logo" className="font-bold">
    //           Tablebuilder
    //         </PageHeading>
    //       </Link>
    //       <MobileNavMenu />
    //     </div>
    //     <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
    //       <Link
    //         href="/contact"
    //         className="m-0.5 p-0.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //       >
    //         Связаться с нами
    //       </Link>
    //       <Link
    //         href={href}
    //         className={cn(
    //           buttonVariants({
    //             variant: "outline",
    //             className: "whitespace-nowrap",
    //           })
    //         )}
    //       >
    //         {label}
    //       </Link>
    //     </div>
    //   </Shell>
    // </div>
  )
}

export default AuthHeader
