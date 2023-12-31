import * as React from "react"

import { DashboardHeader, DashboardNav, SiteFooter } from "@/widgets/layout"
import { Shell } from "@/shared/components/shells/shell"
import { PageHeading } from "@/shared/components/ui/page-header"

interface AccountLayoutProps {
  children: React.ReactNode
}

function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="bg-background-100">
        <DashboardHeader />
        <DashboardNav />
      </div>
      <main className="min-h-[calc(100vh-85px)] bg-background-100">
        <header className="border-b bg-background">
          <Shell className="px-6">
            <div className="flex flex-col">
              <div className="my-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <div className="flex w-full flex-1 flex-col">
                  <PageHeading className="font-medium leading-tight">
                    Настройки Аккаунта
                  </PageHeading>
                </div>
              </div>
            </div>
          </Shell>
        </header>
        <Shell className="px-6 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)]">
            {children}
          </div>
        </Shell>
      </main>
      <SiteFooter />
    </div>
  )
}

export default AccountLayout
