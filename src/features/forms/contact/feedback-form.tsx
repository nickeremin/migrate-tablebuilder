"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Textarea } from "@/shared/components/ui/textarea"
import { feedbackSchema } from "@/shared/lib/validations/contact"

type Inputs = z.infer<typeof feedbackSchema>

function FeedbackForm() {
  const [open, setOpen] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(feedbackSchema),
  })

  function onSubmit() {}

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="hidden sm:inline-flex">
          Оставить Отзыв
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={6} className="w-[340px] p-0">
        <Form {...form}>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <div className="flex flex-col gap-2 p-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Ваш отзыв..."
                        className="h-[100px] resize-none rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end text-xs">
                M supported
              </div>
            </div>
            <div className="flex items-center justify-between rounded-b-xl border-t bg-accent-1 p-3">
              <div>Smiles</div>
              <Button type="submit" className="px-3">
                Отправить
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}

export default FeedbackForm
