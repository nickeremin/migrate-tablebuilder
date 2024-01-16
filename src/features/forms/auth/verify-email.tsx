"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs"

import { LucideIcon } from "@/shared/components/icons"
import { PageHeading } from "@/shared/components/ui/page-header"
import { useCreateQueryString } from "@/shared/lib/hooks"

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = React.useState("loading")
  const { handleEmailLinkVerification } = useClerk()

  // Check your search params to navigate to the correct verification completion option
  const searchParams = useSearchParams()
  const createQueryString = useCreateQueryString(searchParams)
  const email = searchParams?.get("email")
  const mode = searchParams?.get("mode")

  React.useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrlComplete: `http://localhost:3000/verification-complete?${createQueryString(
            {
              email: email ?? null,
              mode: mode ?? null,
            }
          )}`,
        })
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified")
      } catch (error) {
        // Verification has failed.
        if (error instanceof Error) {
          let status = "failed"

          if (
            isEmailLinkError(error) &&
            error.code === EmailLinkErrorCode.Expired
          ) {
            status = "expired"
          }
          setVerificationStatus(status)
        }
      }
    }
    verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (verificationStatus === "failed" || verificationStatus === "expired") {
    return (
      <div className="max-w-[50rem] p-6 text-center">
        <PageHeading size="sm" className="my-4 text-center font-bold">
          Подтверждение не Удалось
        </PageHeading>
        <p className="my-4 text-secondary-foreground">
          Похоже, вы нажали на недействительную ссылку для подтверждения адреса
          электронной почты. Пожалуйста, закройте это окно и повторите попытку
          аутентификации.
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 p-6">
      <PageHeading size="sm" className="my-8 font-bold">
        Проверка
      </PageHeading>
      <span className="translate-y-1">
        <LucideIcon name="Loader" className="h-6 w-6 animate-spin" />
      </span>
    </div>
  )
}

export default VerifyEmail
