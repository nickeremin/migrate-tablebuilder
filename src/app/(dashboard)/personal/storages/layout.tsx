import * as React from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "@radix-ui/react-icons"

import { DashboardHeader, DashboardNav, SiteFooter } from "@/widgets/layout"
import { Button } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-header"
import { Shell } from "@/shared/components/ui/shell"

interface StoragesLayoutProps {
  children: React.ReactNode
}

function StoragesLayout({ children }: StoragesLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="bg-background-100">
        <DashboardHeader />
        <DashboardNav />
      </div>
      <main className="min-h-[calc(100vh-85px)]">
        <header className="border-b">
          <Shell className="px-6">
            <div className="flex flex-col">
              <div className="my-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <div className="flex w-full flex-1 flex-col gap-4">
                  <PageHeading className="font-medium leading-tight">
                    Хранилище
                  </PageHeading>
                  <p className="text-sm text-secondary-foreground">
                    Создавайте хранилища для удобного хранения ваших документов.{" "}
                    <span>
                      <Link
                        aria-label="Перейти на страницу более подробной информации о хранилищах"
                        href="/legal/privacy-policy"
                        className="underline-link inline-flex items-center text-link"
                      >
                        Узнать больше
                        <ExternalLinkIcon
                          className="ml-0.5 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </span>
                  </p>
                </div>
                <Button className="h-10 w-full sm:w-fit">
                  Создать Хранилище
                </Button>
              </div>
            </div>
          </Shell>
        </header>
        <div className="flex flex-col">
          <Shell className="my-6 px-6">{children}</Shell>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default StoragesLayout
