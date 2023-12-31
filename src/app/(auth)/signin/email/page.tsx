import { type Metadata } from "next"

import { EmailSignInForm } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Вход",
  description: "Ввойдите в Ваш аккаунт по электронной почте",
}

function EmailSignInPage() {
  return <EmailSignInForm />
}

export default EmailSignInPage
