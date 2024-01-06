"use client"

import * as React from "react"
import {
  clerkClient,
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"

function OrganizationMembersTable() {
  const { organization, membership, isLoaded, invitations } = useOrganization({
    memberships: {
      infinite: true,
    },
  })

  console.log(membership)

  return <div>OrganizationMembersTable</div>
}

export default OrganizationMembersTable
