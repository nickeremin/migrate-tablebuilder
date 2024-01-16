"use client"

import * as React from "react"
import { motion, useCycle, type Variants } from "framer-motion"

import { PageHeading } from "@/shared/components/ui/page-header"
import { cn } from "@/shared/lib/utils"

const liVariants: Variants = {
  closed: (index) => ({
    translateY: "-80px",
    opacity: 0,
    transition: {
      translateY: {
        duration: 0.48 - 0.02 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
      opacity: {
        duration: 0.32 - 0.02 * index,
        delay: 0.15 - 0.03 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
    },
  }),
  open: (index) => ({
    translateY: "0px",
    opacity: 1,
    transition: {
      translateY: {
        duration: 0.36 + 0.02 * index,
        ease: [0.32, 0.08, 0.24, 1],
      },
      opacity: {
        duration: 0.3 + 0.02 * index,
        delay: 0.03 + 0.03 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
    },
  }),
}

const items = ["List Item", "List Item", "List Item", "List Item", "List Item"]

function MobileNavPage() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const initialColor = "var(--background-hsl)"

  const variants = React.useMemo(
    () =>
      ({
        closed: {
          background: initialColor,
          height: "64px",
          transition: {
            background: {
              duration: 0.44,
              delay: 0.2,
              ease: [0.52, 0.16, 0.24, 1],
            },
            height: {
              duration: 0.56,
              ease: [0.52, 0.16, 0.24, 1],
            },
          },
        },
        open: {
          background: "var(--gray-color-600-hsl)",
          height: "100%",
          transition: {
            background: {
              duration: 0.36,
              ease: [0.32, 0.08, 0.24, 1],
            },
            height: {
              duration: 0.56,
              ease: [0.52, 0.16, 0.24, 1],
            },
          },
        },
      }) satisfies Variants,
    [initialColor]
  )

  return (
    <div className="relative flex h-screen w-screen flex-col">
      <motion.div
        variants={variants}
        initial={"closed"}
        exit={"closed"}
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "sticky inset-x-0 top-0 flex overflow-hidden shadow-border-b"
        )}
      >
        <div className="flex h-16 w-full items-center px-6">
          <div className="flex flex-1 items-center">
            <PageHeading size="logo" className="font-bold">
              Tablebuilder
            </PageHeading>
          </div>
          <div>
            <MenuToggleButton isOpen={isOpen} onCLick={toggleOpen} />
          </div>
        </div>
        <div className="absolute top-32 w-full px-6">
          <motion.ul className="flex flex-col">
            {items.map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={liVariants}
                initial="closed"
                exit="closed"
                animate={isOpen ? "open" : "closed"}
                className="flex h-12 items-center border-b"
              >
                {item} {i + 1}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </div>
  )
}

const crustContainerVariants: Variants = {
  closed: {
    rotate: "0",
    transition: {
      duration: 0.18,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  },
  open: (value) => ({
    rotate: value,
    transition: {
      duration: 0.32,
      delay: 0.1,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  }),
}

const crustVariants: Variants = {
  closed: (value) => ({
    translateY: value,
    transition: {
      duration: 0.16,
      delay: 0.1,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  }),
  open: {
    translateY: 0,
    transition: {
      duration: 0.18,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  },
}

interface MenuToggleButtonProps {
  isOpen: boolean
  onCLick: () => void
}

function MenuToggleButton({ isOpen, onCLick }: MenuToggleButtonProps) {
  return (
    <button
      data-shadcnui-button
      onClick={onCLick}
      className="relative h-8 w-8 outline-none"
    >
      <motion.span
        variants={crustContainerVariants}
        custom={"45deg"}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="absolute inset-0"
      >
        <motion.span
          variants={crustVariants}
          custom={"-4px"}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute inset-x-1.5 top-[15px] h-px bg-primary"
        ></motion.span>
      </motion.span>
      <motion.span
        variants={crustContainerVariants}
        custom={"-45deg"}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="absolute inset-0"
      >
        <motion.span
          variants={crustVariants}
          custom={"4px"}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute inset-x-1.5 top-[15px] h-px bg-primary"
        ></motion.span>
      </motion.span>
    </button>
  )
}

export default MobileNavPage
