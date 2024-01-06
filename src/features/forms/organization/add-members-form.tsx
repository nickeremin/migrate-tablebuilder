"use client"

import React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { catchClerkError } from "@/shared/lib/utils"
import { addMembersShema } from "@/shared/lib/validations/organization"

type Inputs = z.infer<typeof addMembersShema>

function AddMembersForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(addMembersShema),
    defaultValues: {
      members: [{ email: "", role: "org:member" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  })

  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: Inputs) {
    console.log(input)

    startTransition(async () => {
      try {
        toast.success("Приглашения успешно отправлены.")
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <div className="flex flex-col rounded-md bg-background-100 ring-1 ring-border">
          <div className="flex flex-col gap-4 p-6">
            <div className="mr-12 flex gap-2">
              <FormField
                control={form.control}
                name={`members.${0}.email`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[13px] text-secondary-foreground">
                      Почта
                    </FormLabel>
                    <FormControl>
                      <div className="input-focus-container rounded-md">
                        <Input
                          className="h-10 ring-0"
                          placeholder="jane@example.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`members.${0}.role`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[13px] text-secondary-foreground">
                      Роль
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="org:member">Участник</SelectItem>
                        <SelectItem value="org:admin">Админ</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            {fields
              .filter((_, i) => i !== 0)
              .map((member, i) => (
                <div key={member.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`members.${i + 1}.email`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="input-focus-container rounded-md">
                            <Input
                              className="h-10 ring-0"
                              placeholder="jane@example.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${i + 1}.role`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectItem value="org:member">Участник</SelectItem>
                            <SelectItem value="org:admin">Админ</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(i + 1)}
                    className="h-10 w-10"
                  >
                    <LucideIcon name="XCircle" />
                  </Button>
                </div>
              ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ email: "", role: "org:member" })}
              className="w-fit gap-2"
            >
              <LucideIcon name="PlusCircle" className="h-4 w-4" />
              Добавить
            </Button>
          </div>
          <div className="flex h-16 items-center justify-between rounded-b-md bg-background-200 px-6 shadow-border-t dark:bg-background-100">
            <p className="text-sm">
              Узнайте больше об{" "}
              <Link
                href="/"
                className="underline-link inline-flex items-center gap-0.5 text-link"
              >
                Участниках Команды
                <LucideIcon name="ExternalLink" className="h-4 w-4" />
              </Link>
            </p>
            <Button type="submit">Пригласить</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default AddMembersForm
