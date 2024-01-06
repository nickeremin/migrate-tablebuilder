"use client"

import React from "react"
import { useUser } from "@clerk/nextjs"

function page() {
  const { user } = useUser()

  async function Foo() {
    if (user) {
      const email = await user.createEmailAddress({
        email: "immortallatrommi22@gmail.com",
      })
      const {} = email.prepareVerification({
        strategy: "email_link",
        redirectUrl: "",
      })
    }
  }

  return <div>page</div>
}

export default page
