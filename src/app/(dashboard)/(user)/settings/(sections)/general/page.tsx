import { Suspense } from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { ErrorBoundary } from "react-error-boundary"

import { FallbackComponent } from "@/widgets/layout"
import { AccountGeneral } from "@/widgets/pages"

async function GeneralPage() {
  const user = await currentUser()
  if (!user) return redirect("/auth/signin")

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense fallback={<p>Loading...</p>}>
        <AccountGeneral />
      </Suspense>
    </ErrorBoundary>
  )
}

export default GeneralPage
