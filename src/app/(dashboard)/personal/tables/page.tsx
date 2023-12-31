import { DashboardHeader, DashboardNav, SiteFooter } from "@/widgets/layout"
import { Shell } from "@/shared/components/shells/shell"

async function TablesPage() {
  return (
    <Shell>
      <div className="my-4 sm:my-6">
        {/* <AllPersonalTables /> */}
        UserTables
      </div>
    </Shell>
    // <div className="relative min-h-screen">
    //   <DashboardHeader />
    //   <DashboardNav />
    //   <main className="min-h-[calc(100vh-85px)]">
    //     <div className="flex min-h-[calc(100vh-84px)] flex-col bg-background-200">
    //       <Shell>
    //         <div className="my-4 sm:my-6">
    //           <AllPersonalTables />
    //         </div>
    //       </Shell>
    //     </div>
    //   </main>
    //   <SiteFooter />
    // </div>
  )
}

export default TablesPage
