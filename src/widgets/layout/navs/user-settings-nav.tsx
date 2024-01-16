"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { accountLinks } from "@/(toSort)/site/nav"

import { cn } from "@/shared/lib/utils"

function UserSettingsNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop account nav */}
      <nav className="hidden flex-col lg:sticky lg:mr-6 lg:flex">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-5 w-5 rotate-45 rounded-full border border-background bg-gradient-to-r from-green to-blue" />
          <p className="text-xs font-semibold text-muted-foreground">АККАУНТ</p>
        </div>
        {accountLinks.map((link, index) => (
          <Link
            aria-label={link.title}
            key={index}
            href={link.href!}
            target={link.external ? "_blank" : ""}
            rel={link.external ? "noreferrer" : ""}
            className={cn(
              "-ml-3 flex h-10 items-center rounded-md px-3 text-sm transition-colors hover:bg-accent hover:text-foreground",
              link.href === String(pathname) ||
                (link.href === "/account" &&
                  String(pathname) === "/account/general")
                ? "font-medium text-foreground"
                : "text-muted-foreground",
              link.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>

      {/* Mobile account nav */}
      <nav className="lg:hidden">
        {accountLinks.map((link, index) => (
          <Link
            aria-label={link.title}
            key={index}
            href={link.href === "/account" ? "/account/general" : link.href!}
            target={link.external ? "_blank" : ""}
            rel={link.external ? "noreferrer" : ""}
            className={cn(
              "flex h-16 items-center border-b text-sm",
              link.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </>
  )
}

export default UserSettingsNav
