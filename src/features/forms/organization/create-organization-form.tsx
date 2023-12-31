"use client"

import * as React from "react"
import { useOrganizationList } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/shared/components/ui/button"
import {
  DesktopModal,
  DesktopModalContent,
  DesktopModalTitle,
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
import {
  MobileModal,
  MobileModalContent,
  MobileModalTitle,
  MobileModalTrigger,
} from "@/shared/components/ui/mobile-modal"
import { catchClerkError } from "@/shared/lib/utils"
import { createTeamSchema } from "@/shared/lib/validations/organization"

type Inputs = z.infer<typeof createTeamSchema>

interface CreateOrganizationFormProps {
  children: React.ReactNode
}

function CreateOrganizationForm({ children }: CreateOrganizationFormProps) {
  const { createOrganization } = useOrganizationList()

  const form = useForm<Inputs>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      teamName: "",
    },
  })

  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: Inputs) {
    if (!createOrganization) return

    startTransition(async () => {
      try {
        await createOrganization({ name: input.teamName })

        toast.success(`Команда ${input.teamName} успешно создана.`)
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <>
      {/* Desktop create team form */}
      <DesktopModal>
        <DesktopModalTrigger className="max-sm:hidden" asChild>
          {children}
        </DesktopModalTrigger>
        <DesktopModalContent>
          <DesktopModalTitle>Создать Команду</DesktopModalTitle>
          <div className="">
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={(...args) =>
                  void form.handleSubmit(onSubmit)(...args)
                }
              >
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название Команды</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" disabled={isPending}>
                    Создать
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DesktopModalContent>
      </DesktopModal>

      {/* Mobile create team form */}
      <MobileModal>
        <MobileModalTrigger className="sm:hidden" asChild>
          {children}
        </MobileModalTrigger>
        <MobileModalContent></MobileModalContent>
      </MobileModal>
    </>
  )
}

export default CreateOrganizationForm
