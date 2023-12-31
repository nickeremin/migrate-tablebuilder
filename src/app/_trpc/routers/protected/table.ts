import { db } from "@/db"
import { tables } from "@/db/schema"
import { and, eq, ilike } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

import {
  createTableSchema,
  insertTableSchema,
} from "@/shared/lib/validations/table"
import {
  createTableAction,
  getAllTablesAction,
  getTableById,
  getTablesByNameAction,
  updateTablePropsAction,
} from "@/app/_actions/table"

import { protectedProcedure, router } from "../../trpc"

export const tableRouter = router({
  // Table mutatuions
  createTable: protectedProcedure
    .input(createTableSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        auth: { userId, orgId },
      } = ctx

      await db.insert(tables).values({
        id: uuidv4(),
        ownerId: orgId ?? userId,
        ...input,
      })
    }),
  updateTableSettings: protectedProcedure
    .input(insertTableSchema)
    .mutation(async ({ input }) => {
      await updateTablePropsAction(input)
    }),

  // Table queries
  getAllTables: protectedProcedure.query(async ({ ctx }) => {
    return await getAllTablesAction(ctx.auth.userId)
  }),
  getTableById: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await getTableById(input.tableId, ctx.auth.userId)
    }),
  getTablesByName: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const {
        auth: { userId, orgId },
      } = ctx

      return await db.query.tables.findMany({
        where: and(
          eq(tables.ownerId, orgId ?? userId),
          ilike(tables.name, `%${input}%`)
        ),
      })
    }),
})
