import { type Metadata } from "next"

import { SignInEmailForm } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"
import { PageHeading } from "@/shared/components/ui/page-header"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Вход",
  description: "Ввойдите в Ваш аккаунт по электронной почте",
}

function SignInEmailPage() {
  return <SignInEmailForm />
}

export default SignInEmailPage
