"use client"

import * as React from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useMediaQuery } from "usehooks-ts"

import { UserNav } from "@/features/nav"
import { LucideIcon } from "@/shared/components/icons"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function DesktopNavbar() {
  const { isLoaded, isSignedIn } = useUser()
  const isDesktop = useMediaQuery("(min-width: 640px)")

  if (!isLoaded || !isDesktop) return null

  return isSignedIn ? (
    <div className="flex items-center gap-4">
      <Button variant="outline" className="">
        Оставить Отзыв
      </Button>

      <Link
        href="/contact"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Связаться с Нами
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="h-8 w-8 rounded-full p-0">
          <LucideIcon name="Bell" className="h-5 w-5" />
        </Button>
        <UserNav />
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        href="/contact"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Связаться с Нами
      </Link>
      <Link
        href="/signin"
        className={cn(
          buttonVariants({
            variant: "outline",
          })
        )}
      >
        Войти
      </Link>
      <Link href="/signin" className={cn(buttonVariants({}))}>
        Создать Аккаунт
      </Link>
    </div>
  )
}

export default DesktopNavbar
