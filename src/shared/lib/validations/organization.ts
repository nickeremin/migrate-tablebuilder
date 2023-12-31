import * as z from "zod"

export const createTeamSchema = z.object({
  teamName: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." })
    .max(32, {
      message: "Пожалуйста, используйте максимум 32 символа.",
    }),
})
