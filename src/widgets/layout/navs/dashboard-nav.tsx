"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { Icons } from "@/shared/components/icons"
import { submenuLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

function DashboardNav() {
  const pathname = usePathname()

  const submenuRef = React.useRef<HTMLDivElement | null>(null)
  const iconRef = React.useRef<HTMLAnchorElement | null>(null)
  const navRef = React.useRef<HTMLDivElement | null>(null)

  const [currentTab, setCurrentTab] = React.useState("")

  // Submenu
  React.useEffect(() => {
    const ref = submenuRef.current

    const handleScroll = () => {
      if (!ref) return

      if (window.scrollY >= 54) ref.classList.add("dashboard-submenu")
      else ref.classList.remove("dashboard-submenu")
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Icon
  React.useEffect(() => {
    const ref = iconRef.current

    const handleScroll = () => {
      if (!ref) return

      if (window.scrollY >= 54) ref.classList.add("dashboard-submenu-icon")
      else ref.classList.remove("dashboard-submenu-icon")
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Nav
  React.useEffect(() => {
    const ref = navRef.current

    const handleScroll = () => {
      if (!ref) return

      if (window.scrollY >= 54) ref.classList.add("dashboard-submenu-nav")
      else ref.classList.remove("dashboard-submenu-nav")
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="relative -mt-2.5 h-12 overflow-hidden">
      <div className="h-12 overflow-hidden">
        <div ref={submenuRef} className="shadow-border-b">
          <div className="flex h-12 items-end overflow-auto px-4 text-sm font-medium lg:px-6">
            <Link
              ref={iconRef}
              href="/"
              className="invisible my-auto hidden h-6 w-6 -translate-y-7 appearance-none items-center opacity-0 transition-all duration-300 lg:inline-flex"
            >
              <Icons.logo className="h-6 w-6" />
            </Link>
            <div
              ref={navRef}
              className={cn(
                "flex flex-1 -translate-x-2 items-center transition-transform duration-300 lg:-translate-x-9"
              )}
            >
              <div
                onMouseLeave={() => setCurrentTab("")}
                className="flex items-center"
              >
                {submenuLinks.map((link, index) => (
                  <Link
                    key={index}
                    onMouseEnter={() => setCurrentTab(link.title)}
                    href={link.href!}
                    className={cn(
                      "group relative inline-block px-3 py-4 text-sm/4",
                      String(pathname).includes(link.href!)
                        ? "text-accent-foreground before:absolute before:inset-x-2.5 before:bottom-0 before:border-b-2 before:border-primary before:content-['']"
                        : "text-muted-foreground"
                    )}
                  >
                    {currentTab === link.title && (
                      <motion.div
                        layoutId="dashboard-nav-highlight-tab"
                        style={{
                          borderRadius: 6,
                        }}
                        className="absolute inset-x-0 top-2 h-8 bg-accent"
                        transition={{ duration: 0.15 }}
                      />
                    )}
                    <span className="relative z-10 select-none whitespace-nowrap transition-colors duration-200 group-hover:text-accent-foreground">
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav
