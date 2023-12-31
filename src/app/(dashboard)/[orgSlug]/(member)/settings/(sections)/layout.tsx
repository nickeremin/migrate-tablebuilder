import * as React from "react"
import Link from "next/link"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { UserSettingsNav } from "@/widgets/layout"

interface OrganizationSectionsSettingsLayoutProps {
  children: React.ReactNode
}

function OrganizationSectionsSettingsLayout({
  children,
}: OrganizationSectionsSettingsLayoutProps) {
  return (
    <>
      <aside className="relative flex flex-col">
        {/* Backlink in mobile menu */}
        <Link
          aria-label="Вернуться ко всем настройкам"
          href="/account"
          className="-mx-6 border-b p-6 lg:hidden"
        >
          <div className="пфз-2 flex items-center text-sm font-semibold">
            <ChevronLeftIcon className="h-5 w-5" />
            Настройки Акканута
          </div>
        </Link>
        <div className="hidden flex-col lg:flex">
          <UserSettingsNav />
        </div>
      </aside>
      <div className="relative mb-16 mt-6 flex flex-col lg:my-0 lg:ml-6">
        <main>{children}</main>
      </div>
    </>
  )
}

export default OrganizationSectionsSettingsLayout
