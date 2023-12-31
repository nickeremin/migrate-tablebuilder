import { DashboardHeader, DashboardNav, SiteFooter } from "@/widgets/layout"

interface TablesLayoutProps {
  children: React.ReactNode
}

function TablesLayout({ children }: TablesLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <DashboardHeader />
      <DashboardNav />
      <main className="min-h-[calc(100vh-85px)]">
        <div className="flex min-h-[calc(100vh-84px)] flex-col bg-background-200">
          {children}
          {/* <Shell>
            <div className="my-4 sm:my-6">
              <AllPersonalTables />
            </div>
          </Shell> */}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default TablesLayout
