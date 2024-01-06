import * as z from "zod"

export const createOrganizationSchema = z.object({
  teamName: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." })
    .max(32, {
      message: "Пожалуйста, используйте максимум 32 символа.",
    }),
})

export const addMembersShema = z.object({
  members: z
    .object({
      email: z.string().email({
        message: "Пожалуйста, введите действительный адрес электронной почты.",
      }),
      role: z.enum(["org:admin", "org:member"]),
    })
    .array(),
})
