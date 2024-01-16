"use client"

import * as React from "react"
import { notificationPreferences } from "@/(toSort)/site/account"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form"
import { catchError, logAction } from "@/shared/lib/utils"
import { updateNotificationPreferencesSchema } from "@/shared/lib/validations/settings"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.infer<typeof updateNotificationPreferencesSchema>

interface UpdateNotificationPreferencesFormProps {
  type: "web" | "email"
}

function UpdateNotificationPreferencesForm({
  type,
}: UpdateNotificationPreferencesFormProps) {
  // Get signed in user
  const { data: user } = trpc.account.getUser.useQuery(void undefined, {
    suspense: true,
  })

  const utils = trpc.useContext()
  // const { mutateAsync: updateNotificationPreferences } =
  //   trpc.account.updateNotificationPreferences.useMutation({
  //     // Invalidate user in all components wich use it to get fresh state after updating notification preferences
  //     onSuccess: async () => {
  //       await utils.account.getUser.invalidate()
  //     },
  //   })

  const [isPending, startTransition] = React.useTransition()

  // Memoize public metadata during rendering
  // const metadata = React.useMemo(() => {
  //   return user?.publicMetadata.notificationPreferences[type]
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  // Initialize react-hook-form with zod and set current user values
  // const form = useForm<Inputs>({
  //   resolver: zodResolver(updateNotificationPreferencesSchema),
  //   defaultValues: {
  //     type,
  //     ...metadata,
  //   },
  // })

  // function onSubmit(input: Inputs) {
  //   startTransition(async () => {
  //     try {
  //       await updateNotificationPreferences({
  //         type,
  //         data: input,
  //       })

  //       logAction({
  //         toastMessasge: "Настройки уведомлений обновлены.",
  //         status: "success",
  //       })
  //     } catch (error) {
  //       catchError(error)
  //     }
  //   })
  // }

  if (!user) return null

  return <div></div>

  // return (
  //   <Form {...form}>
  //     <form
  //       className="flex flex-col gap-5"
  //       onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
  //     >
  //       <div className="flex flex-col gap-5">
  //         {notificationPreferences.map((group) => (
  //           <div key={group.title} className="flex flex-col gap-3">
  //             <p className="font-semibold">{group.title}</p>
  //             {group.items.map((item) => (
  //               <FormField
  //                 key={item.name}
  //                 control={form.control}
  //                 name={item.name}
  //                 render={({ field }) => (
  //                   <FormItem className="flex gap-3 space-y-0 rounded-md border p-4">
  //                     <FormControl>
  //                       <Checkbox
  //                         checked={field.value}
  //                         onCheckedChange={field.onChange}
  //                       />
  //                     </FormControl>
  //                     <div className="space-y-1 leading-none">
  //                       <FormLabel className="hover:cursor-pointer">
  //                         {item.label}
  //                       </FormLabel>
  //                       <FormDescription>{item.description}</FormDescription>
  //                     </div>
  //                   </FormItem>
  //                 )}
  //               />
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //       <div className="flex items-center gap-4">
  //         <Button disabled={isPending} className="w-full sm:w-fit">
  //           {isPending && (
  //             <Icons.spinner
  //               className="mr-2 h-4 w-4 animate-spin"
  //               aria-hidden="true"
  //             />
  //           )}
  //           Сохранить изменения
  //           <span className="sr-only">Сохранить изменения</span>
  //         </Button>
  //       </div>
  //     </form>
  //   </Form>
  // )
}

export default UpdateNotificationPreferencesForm
