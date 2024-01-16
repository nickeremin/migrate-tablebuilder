"use client"

import * as React from "react"
import Link from "next/link"
import { BellIcon } from "@radix-ui/react-icons"

import { FeedbackForm } from "@/features/forms"
import { AccountSwitcher, TableSwitcher, UserNav } from "@/features/nav"
import CustomIcon from "@/shared/components/icons/custom-icon"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"

function TableHeader() {
  return (
    <header className="relative m-auto flex h-16 select-none items-center bg-background px-4 lg:px-6">
      <div className="flex flex-1 items-center pr-6">
        <div className="flex max-w-full items-center">
          <Link href="/dashboard" className="hidden sm:block">
            <CustomIcon name="Logo" className="h-6 w-6" />
          </Link>

          <Separator
            orientation="vertical"
            className="mx-5 hidden h-6 rotate-[30deg] sm:block"
          />

          <AccountSwitcher expanded={false} />

          <Separator
            orientation="vertical"
            className="mx-4 h-6 rotate-[30deg]"
          />

          <TableSwitcher />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <FeedbackForm />
        <div className="flex items-center gap-2">
          <Button
            aria-label="Открыть уведомления"
            variant="outline"
            className="space-x-1 rounded-full px-2"
          >
            <BellIcon className="h-5 w-5" />
            <Badge className="bg-primary-blue hover:bg-primary-blue hidden rounded-full px-1.5 py-0.5 text-white shadow-none md:block">
              4
            </Badge>
            <span className="sr-only">Открыть уведомления</span>
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default TableHeader
