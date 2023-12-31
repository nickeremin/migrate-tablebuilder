"use client"

import * as React from "react"
import { notFound, redirect } from "next/navigation"
import { useAuth, useOrganizationList, useUser } from "@clerk/nextjs"

interface OrganizationLayoutProps {
  children: React.ReactNode
  params: {
    orgSlug: string
  }
}

function OrganizationLayout({
  children,
  params: { orgSlug },
}: OrganizationLayoutProps) {
  const { user } = useUser()
  const {
    orgSlug: currentOrgSlug,
    isLoaded: isLoadedAuth,
    isSignedIn,
  } = useAuth()
  const {
    userMemberships: { data, isLoading },
    isLoaded,
    setActive,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const [isPending, startTransition] = React.useTransition()

  // React.useEffect(() => {
  //   if (isLoadedOrganizationList || !isLoading) {
  //     console.log(data)
  //   }
  // }, [isLoading, isLoadedOrganizationList])

  // if (!isLoadedAuth) {
  //   return <p>Loading Auth...</p>
  // }

  // if (!isLoadedOrganizationList) {
  //   return <p>Loading Orgs...</p>
  // }

  // console.log({
  //   isLoadedOrganizationList,
  //   isLoading,
  // })

  React.useEffect(() => {
    if (isLoaded && !isLoading && isLoadedAuth && orgSlug !== currentOrgSlug) {
      startTransition(async () => {
        const membership = data?.find(
          ({ organization: { slug } }) => orgSlug === slug
        )
        if (membership) {
          await setActive({ organization: membership.organization })
          await user?.reload()
        } else {
          notFound()
        }
      })
    }
  }, [isLoaded, isLoading, isLoadedAuth])

  if (isPending) {
    return <p>Pending...</p>
  }

  if (!isLoadedAuth || !isLoaded || isLoading) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default OrganizationLayout
