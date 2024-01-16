import { type Metadata } from "next"
import Link from "next/link"

import { SignInForm } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"
import { PageHeading } from "@/shared/components/ui/page-header"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Вход",
  description: "Ввойдите в Ваш аккаунт",
}

function SignInPage() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-7 p-6">
        <PageHeading className="text-center font-bold" size="xs">
          Войдите в Tablebuilder
        </PageHeading>
        <SignInForm />
      </div>

      {/* Create new account link for small devices */}
      <div className="flex h-[100px] items-center justify-center border-t bg-background p-8 lg:border-none">
        <Link
          href="/signup"
          className="underline-link whitespace-nowrap text-sm text-link lg:hidden"
        >
          У вас нет учетной записи? Создать аккаунт
        </Link>
      </div>
    </>
  )
}

export default SignInPage
