"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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
import { catchError } from "@/shared/lib/utils"
import { createTableSchema } from "@/shared/lib/validations/table"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.infer<typeof createTableSchema>

function CreateOrganizationTableForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const { mutateAsync: createTable } = trpc.tables.createTable.useMutation()
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: Inputs) {
    startTransition(async () => {
      try {
        await createTable(input)
        toast.success(`Таблица ${input.name} успешно создана.`)
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Создать
        </Button>
      </form>
    </Form>
  )
}

export default CreateOrganizationTableForm
