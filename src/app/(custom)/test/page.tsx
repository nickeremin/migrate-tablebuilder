"use client"

import * as React from "react"
import { motion, useCycle, type Variants } from "framer-motion"

import { SiteFooter } from "@/widgets/layout"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function page() {
  return (
    <div className="relative min-h-screen">
      <MobileNavHeader />
      <main className="min-h-[calc(100vh-64px)]"></main>
      <SiteFooter />
    </div>
  )
}

const menuVariants: Variants = {
  closed: {
    height: "64px",
    // backgroundColor: "rgb(10, 10, 10)",
    transition: {
      duration: 0.56,
      ease: [0.52, 0.16, 0.24, 1],
    },
  },
  open: {
    height: "100vh",
    // backgroundColor: "rgb(10, 10, 10)",
    transition: {
      duration: 0.56,
      ease: [0.52, 0.16, 0.24, 1],
    },
  },
}

const menuItemVariants: Variants = {
  closedTransform: (index) => ({
    translateY: "-48px",
    transition: {
      duration: 0.48 - index * 0.02,
      delay: 0.1 - index * 0.02,
      ease: [0.52, 0.16, 0.52, 0.84],
    },
  }),
  openTransform: (index) => ({
    translateY: "0px",
    transition: {
      duration: 0.32 + index * 0.03,
      delay: 0.02 + index * 0.02,
      ease: [0.32, 0.08, 0.24, 1],
    },
  }),
  closedOpacity: (index) => ({
    opacity: 0,
    transition: {
      duration: 0.3 - index * 0.02,
      delay: 0.12 - index * 0.03,
      ease: [0.52, 0.16, 0.52, 0.84],
    },
  }),
  openOpacity: (index) => ({
    opacity: 1,
    transition: {
      duration: 0.3 + index * 0.02,
      delay: 0.03 + index * 0.03,
      ease: [0.52, 0.16, 0.52, 0.84],
    },
  }),
}

const menuButtonVariants: Variants = {
  closedTransform: (index) => ({
    translateY: "-10px",
    scaleY: 0,
    transition: {
      duration: 0.5,
      delay: 0.18,
      ease: [0.32, 0.08, 0.24, 1],
    },
  }),
  openTransform: (index) => ({
    translateY: "0px",
    scaleY: 1,
    transition: {
      duration: 0.28,
      delay: 0.08,
      ease: [0.32, 0.08, 0.24, 1],
    },
  }),
  closedOpacity: (index) => ({
    opacity: 0,
    transition: {
      duration: 0.28,
      delay: 0.16,
      ease: [0.52, 0.16, 0.52, 0.84],
    },
  }),
  openOpacity: (index) => ({
    opacity: 1,
    transition: {
      duration: 0.26,
      delay: 0.1,
      ease: [0.32, 0.08, 0.24, 1],
    },
  }),
}

const items = [
  "Первый итем",
  "Второй итем",
  "Третий итем",
  "Четвертый итем",
  "Пятый итем",
]

function MobileNavHeader() {
  const [isOpen, toggleOpen] = useCycle(false, true)

  return (
    <motion.header
      variants={menuVariants}
      initial="closed"
      exit="closed"
      animate={isOpen ? "open" : "closed"}
      className="sticky inset-x-0 top-0 overflow-hidden border-b bg-accent-light"
    >
      <div className="ml-auto flex h-16 w-16 items-center justify-center">
        <MenuToggleButton isOpen={isOpen} onCLick={() => toggleOpen()} />
      </div>

      <motion.div
        variants={menuButtonVariants}
        initial={["closedOpacity, closedTransform"]}
        exit={["closedOpacity", "closedTransform"]}
        animate={
          isOpen
            ? ["openOpacity", "openTransform"]
            : ["closedOpacity", "closedTransform"]
        }
        className="absolute inset-x-0 top-16 flex h-16 origin-top items-center px-6"
      >
        <Button variant="default" size="lg" className="w-full">
          Связаться с Нами
        </Button>
      </motion.div>

      <motion.ul className="absolute inset-x-0 top-16 flex flex-col px-6 pt-16">
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={menuItemVariants}
            initial={["closedOpacity, closedTransform"]}
            exit={["closedOpacity", "closedTransform"]}
            animate={
              isOpen
                ? ["openOpacity", "openTransform"]
                : ["closedOpacity", "closedTransform"]
            }
            custom={i}
            className="flex h-12 items-center"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.header>
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

export default page
