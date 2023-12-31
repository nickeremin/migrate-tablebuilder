"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Icons } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/shared/components/ui/card"
import {
  DesktopModal,
  DesktopModalContent,
  DesktopModalTrigger,
} from "@/shared/components/ui/desktop-modal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Spacer } from "@/shared/components/ui/spacer"
import { catchError, cn, logAction } from "@/shared/lib/utils"
import { getDeleteAccountSchema } from "@/shared/lib/validations/settings"
import { trpc } from "@/app/_trpc/client"

interface DeleteAccountrFormProps extends React.HTMLAttributes<HTMLDivElement> {
  deleteString?: string
}

function DeleteAccountrForm({
  deleteString = "удалить мой аккаунт",
}: DeleteAccountrFormProps) {
  // Get signed in user
  const { user } = useUser()

  const router = useRouter()
  const [showDeleteAccount, setShowDeleteAccount] = React.useState(false)

  // Getting dynamic schema based on username and delete sentence
  const deleteAccountSchema = getDeleteAccountSchema({
    username: user?.username ?? "",
    deleteString,
  })

  type Inputs = z.infer<typeof deleteAccountSchema>

  // Initialize react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      username: "",
      deleteString: "",
    },
  })

  const [isPending, startTransition] = React.useTransition()

  function onSubmit() {
    if (!user) return

    startTransition(async () => {
      try {
        // Delete user account and then redirect him to sign in page
        await user.delete()

        router.push("/auth/signin")

        toast.success("Ваш аккаунт удален.")
      } catch (error) {
        catchError
      }
    })
  }

  return (
    <>
      <Card as="section" className="ring-destructive/50">
        <div className="relative flex flex-col gap-3 border-b border-destructive/50 p-6">
          <div
            className={cn(
              "absolute inset-0 flex flex-col gap-3 p-6",
              !!user && "hidden"
            )}
          >
            <Skeleton className="h-7 w-full max-w-[180px]" />
            <Skeleton className="h-6 w-full max-w-[400px]" />
          </div>
          <CardTitle className={cn("text-xl", user ? "visible" : "invisible")}>
            Удалить Аккаунт
          </CardTitle>
          <p className={cn("text-sm/6", user ? "visible" : "invisible")}>
            Навсегда удалите свой личный аккаунт и все его содержимое с
            платформы Timebuilder. Это действие необратимо, поэтому продолжайте
            с осторожностью.
          </p>
        </div>
        <div className="relative flex min-h-[56px] flex-col items-center justify-center rounded-b-xl bg-destructive/25 p-6 sm:flex-row sm:justify-end sm:py-3">
          <Button
            onClick={() => {
              setShowDeleteAccount(true)
            }}
            className={cn(
              "h-12 w-full max-w-[320px] rounded-full sm:h-10 sm:w-fit sm:rounded-md",
              user ? "visible" : "invisible"
            )}
            variant="destructive"
          >
            Удалить Аккаунт
          </Button>
        </div>
      </Card>
      <DesktopModal
        open={showDeleteAccount}
        onOpenChange={setShowDeleteAccount}
      >
        <DesktopModalContent className="flex max-h-[min(800px,80vh)] flex-col p-0">
          <Form {...form}>
            <form
              className="overflow-y-auto overflow-x-hidden"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              {/* Use overflow-y-auto to show buttons in bottom */}
              <div className="relative overflow-y-auto overflow-x-hidden p-8">
                <div>
                  <h1 className="text-2xl font-semibold">Удалить Аккаунт</h1>
                  <Spacer />
                  <p className="text-primary/80">
                    Tablebuilder{" "}
                    <strong className="text-primary">
                      удалит все ваши таблицы
                    </strong>
                    , а также все ваши файлы и все другие ресурсы, принадлежащие
                    вашей Личной учетной записи.
                  </p>
                  <Spacer />
                  <p className="text-primary/80">
                    Tablebuilder рекомендует сохранить все ваши таблицы, файлы и
                    все другие ресурсы локально на данный компьютер.
                  </p>
                  <Spacer />
                  <p className="flex items-center rounded-md bg-destructive/50 px-3 py-2 text-sm text-red-800 dark:text-red-200">
                    Это действие необратимо. Пожалуйста, будьте уверены.
                  </p>
                  <Spacer />
                  <div className="-mx-8 -mb-8 border-t bg-muted/30 px-8 py-6">
                    {/* If username is empty this field is redundant */}
                    {user?.username?.length ? (
                      <>
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-foreground">
                                Введите свое имя пользователя{" "}
                                <strong className="text-primary/80">
                                  {user.username}
                                </strong>
                                , чтобы продолжить:
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-background shadow-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Spacer />
                      </>
                    ) : null}
                    <FormField
                      control={form.control}
                      name="deleteString"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Для проверки введите{" "}
                            <strong className="text-primary/80">
                              {deleteString}
                            </strong>{" "}
                            ниже:
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-background shadow-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Back and delete buttons */}
              <div className="sticky bottom-0 flex justify-between rounded-b-lg border-t bg-background p-4">
                <Button
                  type="button"
                  disabled={isPending}
                  variant="outline"
                  className="bg-background"
                  onClick={() => {
                    setShowDeleteAccount(false)
                    form.reset()
                  }}
                >
                  Отмена
                  <span className="sr-only">Отменить удаление аккаунта</span>
                </Button>
                <Button disabled={isPending} variant="destructive">
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Удалить
                  <span className="sr-only">Подтвердить удаление аккаунта</span>
                </Button>
              </div>
            </form>
          </Form>
        </DesktopModalContent>
      </DesktopModal>
    </>
  )
}

export default DeleteAccountrForm
