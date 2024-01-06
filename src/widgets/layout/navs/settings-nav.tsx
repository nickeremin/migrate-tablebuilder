"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

import { cn } from "@/shared/lib/utils"
import { type NavItem } from "@/shared/types"

const userSettingsLinks: NavItem[] = [
  {
    title: "Общие",
    href: "/settings",
  },
  {
    title: "Команды",
    href: "/settings/teams",
  },
  {
    title: "Мои Уведомления",
    href: "/settings/notifications",
  },
]

function UserSettingsNav() {
  const { orgSlug } = useAuth()
  const pathname = usePathname()

  return (
    <div className="flex flex-col">
      {/* Mobile Nav */}
      <nav className="lg:hidden">
        {userSettingsLinks.map((link, i) => (
          <MobileNavLink
            key={i}
            link={{
              href: orgSlug ? `/${orgSlug}${link.href}` : link.href,
              title: link.title,
            }}
          />
        ))}
      </nav>

      {/* Desktop Nav */}
      <nav className="hidden flex-col lg:sticky lg:mr-6 lg:flex">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-5 w-5 rotate-45 rounded-full border border-background bg-gradient-to-r from-green to-blue" />
          <p className="text-xs/5 font-semibold text-muted-foreground">
            АККАУНТ
          </p>
        </div>
        {userSettingsLinks.map((link, i) => (
          <DesktopNavLink
            key={i}
            link={{
              href: orgSlug ? `/${orgSlug}${link.href}` : link.href,
              title: link.title,
            }}
            pathname={pathname}
          />
        ))}
      </nav>
    </div>
  )
}

const organizationSettingsLinks: NavItem[] = [
  {
    title: "Общие",
    href: "/settings",
  },
  {
    title: "Участники",
    href: "/settings/members",
  },
]

function OrganizationSettingsNav() {
  const { orgSlug } = useAuth()
  const pathname = usePathname()

  return (
    <div className="flex flex-col">
      {/* Mobile Nav */}
      <nav className="lg:hidden">
        {organizationSettingsLinks.map((link, i) => (
          <MobileNavLink
            key={i}
            link={{
              href: orgSlug ? `/${orgSlug}${link.href}` : link.href,
              title: link.title,
            }}
          />
        ))}
      </nav>

      {/* Desktop Nav */}
      <nav className="hidden flex-col lg:sticky lg:mr-6 lg:flex">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-5 w-5 rotate-45 rounded-full border border-background bg-gradient-to-r from-blue to-purple" />
          <p className="text-xs/5 font-semibold text-muted-foreground">
            КОМАНДА
          </p>
        </div>
        {organizationSettingsLinks.map((link, i) => (
          <DesktopNavLink
            key={i}
            link={{
              href: orgSlug ? `/${orgSlug}${link.href}` : link.href,
              title: link.title,
            }}
            pathname={pathname}
          />
        ))}
      </nav>
    </div>
  )
}

interface NavLinkProps {
  link: NavItem
  pathname?: string
}

function MobileNavLink({ link: { href, title } }: NavLinkProps) {
  return (
    <Link
      href={href === "/settings" ? "/settings/general" : href}
      className="flex h-16 items-center border-b text-sm"
    >
      {title}
    </Link>
  )
}

function DesktopNavLink({ link: { href, title }, pathname }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "-ml-3 flex h-10 items-center rounded-md px-3 text-sm transition-colors hover:bg-accent hover:text-foreground",
        href === pathname
          ? "font-medium text-foreground"
          : "text-muted-foreground"
      )}
    >
      {title}
    </Link>
  )
}

export { UserSettingsNav, OrganizationSettingsNav }
