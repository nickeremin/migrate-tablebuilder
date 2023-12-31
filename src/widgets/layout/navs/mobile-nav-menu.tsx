"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { AnimatePresence, motion, useCycle, Variants } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"

import { UserNavSelectTheme } from "@/entities/theme"
import { LucideIcon } from "@/shared/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { mobileNavLinks } from "@/shared/config/site/nav"
import { cn } from "@/shared/lib/utils"

const menuVariants: Variants = {
  open: {
    scaleY: 1,
    transition: {
      duration: 0.56,
      ease: [0.52, 0.16, 0.24, 1],
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      duration: 0.56,
      ease: [0.52, 0.16, 0.24, 1],
    },
  },
}

const containerVariants: Variants = {
  open: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.2, ease: [0.32, 0.08, 0.24, 1] },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.32, 0.08, 0.24, 1] },
  },
}

interface MobileNavMenuProps {
  headerId: string
}

function MobileNavMenu({ headerId }: MobileNavMenuProps) {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, toggleOpen] = useCycle(false, true)
  const isMobile = useMediaQuery("(max-width: 640px)")

  React.useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0 })
      document.body.style.overflow = "hidden"
      document.body.style.height = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.height = ""
    }
  }, [isOpen])

  if (!isLoaded || !isMobile) return null

  return (
    <div>
      <MenuToggleButton isOpen={isOpen} onCLick={toggleOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            exit="closed"
            animate={isOpen ? "open" : "closed"}
            className="bg-accent-light fixed inset-x-0 bottom-0 top-16 z-50 origin-top"
          >
            <motion.nav
              variants={containerVariants}
              initial="closed"
              exit="closed"
              animate={isOpen ? "open" : "closed"}
            >
              {isSignedIn ? (
                <div className="flex flex-col px-6">
                  <ul className="flex flex-col">
                    <li className="flex items-center py-2">
                      <Link
                        href="/contact"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "lg",
                            className: "w-full",
                          })
                        )}
                      >
                        Связаться с Нами
                      </Link>
                    </li>
                  </ul>

                  <ul className="flex flex-col">
                    <li className="flex h-[72px] items-center justify-between border-b hover:bg-accent">
                      <div className="flex flex-col">
                        <p className="text-sm">{user.username}</p>
                        <p className="text-sm text-secondary-foreground">
                          {user.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.imageUrl} alt="" />
                      </Avatar>
                    </li>
                    <Link href="/tables">
                      <li className="mobile-menu-item justify-between">
                        Таблицы
                      </li>
                    </Link>
                    <Link href="/settings">
                      <li className="mobile-menu-item justify-between">
                        Настройки Аккаунта
                        <LucideIcon
                          name="Settings"
                          className="text-secondary-foreground"
                        />
                      </li>
                    </Link>
                    <li className="mobile-menu-item justify-between">
                      Создать Команду
                      <LucideIcon
                        name="Plus"
                        className="text-secondary-foreground"
                      />
                    </li>
                    <li className="flex h-12 items-center justify-between border-b">
                      Тема
                      <UserNavSelectTheme />
                    </li>
                    <li className="mobile-menu-item justify-between">
                      Выйти
                      <LucideIcon
                        name="LogOut"
                        className="text-secondary-foreground"
                      />
                    </li>
                  </ul>

                  <h4 className="mb-2 mt-10 text-xl font-semibold">Ресурсы</h4>
                  <ul className="flex flex-col">
                    <Link href="/docs">
                      <li className="mobile-menu-item justify-between">
                        Документация
                      </li>
                    </Link>
                    <Link href="/">
                      <li className="mobile-menu-item justify-between">
                        Главная
                        <LucideIcon
                          name="ExternalLink"
                          className="text-secondary-foreground"
                        />
                      </li>
                    </Link>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col px-6">
                  <ul className="flex flex-col">
                    <li className="flex items-center py-2">
                      <Button
                        disabled={pathname === "/signin"}
                        onClick={() => router.push("/signin")}
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        Войти
                      </Button>
                    </li>
                    <li className="flex items-center py-2">
                      <Button
                        disabled={pathname === "/signup"}
                        onClick={() => router.push("/signup")}
                        size="lg"
                        className="w-full"
                      >
                        Создать Аккаунт
                      </Button>
                    </li>
                  </ul>

                  <ul className="flex flex-col">
                    <Accordion type="multiple">
                      {mobileNavLinks.map((group, i) => (
                        <AccordionItem value={group.title} key={i}>
                          <AccordionTrigger className="h-12 text-base font-normal">
                            {group.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col">
                              {group.items?.map((item, i) => (
                                <Link
                                  key={i}
                                  href={item.href!}
                                  className="flex h-12 items-center gap-2 text-base text-secondary-foreground"
                                >
                                  <LucideIcon name={item.icon!} />
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    <Link href="/docs">
                      <li className="mobile-menu-item">Документация</li>
                    </Link>
                    <Link href="/blog">
                      <li className="mobile-menu-item">Блог</li>
                    </Link>
                    <Link href="/pricing">
                      <li className="mobile-menu-item">Тарифы</li>
                    </Link>
                    <Link href="/contact">
                      <li className="mobile-menu-item">Связаться с Нами</li>
                    </Link>
                  </ul>
                </div>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MenuToggleButtonProps {
  isOpen: boolean
  onCLick: () => void
}

function MenuToggleButton({ isOpen, onCLick }: MenuToggleButtonProps) {
  return (
    <div onClick={onCLick} className="relative z-50 h-8 w-8">
      <span
        className={cn(
          "absolute h-8 w-8",
          isOpen
            ? "transition-menu-wrapper-out rotate-45"
            : "transition-menu-wrapper-in"
        )}
      >
        <span
          className={cn(
            "absolute left-1.5 top-[15px] h-px w-5 rounded bg-foreground",
            isOpen
              ? "transition-menu-crust-out translate-y-0"
              : "transition-menu-crust-in -translate-y-1"
          )}
        ></span>
      </span>
      <span
        className={cn(
          "absolute h-8 w-8",
          isOpen
            ? "transition-menu-wrapper-out -rotate-45"
            : "transition-menu-wrapper-in"
        )}
      >
        <span
          className={cn(
            "absolute bottom-[15px] left-1.5 h-px w-5 rounded bg-foreground",
            isOpen
              ? "transition-menu-crust-out translate-y-0"
              : "transition-menu-crust-in translate-y-1"
          )}
        ></span>
      </span>
    </div>
  )
}

export default MobileNavMenu
