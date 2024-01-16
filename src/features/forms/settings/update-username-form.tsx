"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { Card, CardTitle } from "@/shared/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { catchError, cn, logAction } from "@/shared/lib/utils"
import { updateAccountSchema } from "@/shared/lib/validations/settings"

// Extract username schema from general update account schema
const usernameSchema = updateAccountSchema.pick({ username: true })
type Inputs = z.infer<typeof usernameSchema>

function UpdateUsernameForm() {
  // Get signed in user
  const { user } = useUser()

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
    values: {
      username: user?.username ?? "",
    },
  })

  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: Inputs) {
    if (!user) return

    startTransition(async () => {
      try {
        await user.update({
          username: input.username,
        })

        logAction({
          toastMessasge: "Имя пользователя обновлено.",
          status: "success",
        })
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Card as="section">
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <div className="relative flex flex-col gap-3 border-b p-6">
            <div
              className={cn(
                "absolute inset-0 flex flex-col gap-3 p-6",
                !!user && "hidden"
              )}
            >
              <Skeleton className="h-7 w-full max-w-[180px]" />
              <Skeleton className="h-6 w-full max-w-[400px]" />
            </div>
            <CardTitle
              className={cn("text-xl", user ? "visible" : "invisible")}
            >
              Имя Пользователя
            </CardTitle>
            <p className={cn("text-sm/6", user ? "visible" : "invisible")}>
              Пожалуйста, введите свое полное имя или отображаемое имя, которое
              вам удобно.
            </p>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={cn(
                        "h-12 w-full rounded bg-background text-base sm:max-w-[320px] sm:rounded-md sm:text-sm lg:h-10",
                        user ? "visible" : "invisible"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="relative flex min-h-[56px] flex-col items-center justify-center gap-4 rounded-b-xl bg-muted p-6 sm:flex-row sm:justify-between sm:py-3">
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center p-6 sm:items-start",
                !!user && "hidden"
              )}
            >
              <Skeleton className="h-5 w-full max-w-[320px]" />
            </div>
            <p
              className={cn(
                "text-center text-sm text-muted-foreground sm:text-start",
                user ? "visible" : "invisible"
              )}
            >
              Пожалуйста, используйте максимум 32 символа.
            </p>
            <Button
              className={cn(
                "h-12 w-full max-w-[320px] gap-2 rounded-full sm:h-10 sm:w-fit sm:rounded-md",
                user ? "visible" : "invisible"
              )}
              disabled={isPending}
            >
              {isPending && (
                <LucideIcon name="Loader" className="h-4 w-4 animate-spin" />
              )}
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default UpdateUsernameForm
