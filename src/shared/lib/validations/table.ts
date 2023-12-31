import { tables } from "@/db/schema"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import * as z from "zod"

export type SelectTableSchema = z.infer<typeof selectTableSchema>
export type InsertTableSchema = z.infer<typeof insertTableSchema>
export const selectTableSchema = createSelectSchema(tables)
export const insertTableSchema = createInsertSchema(tables)

export const tableSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "Слишком короткое название, название таблицы должно содержать миниум 2 символа."
    ),
  description: z.string(),
  columns: z.array(
    z.object({
      name: z.string(),
      type: z.enum(["text", "date", "integer", "decimal"]),
      number: z.number(),
    })
  ),
})

export type CreateTableSchema = z.infer<typeof createTableSchema>

export const createTableSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})
