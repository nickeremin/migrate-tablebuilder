"use server"

import { db } from "@/db"
import { tables } from "@/db/schema"
import { and, eq, ilike } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

import {
  CreateTableSchema,
  InsertTableSchema,
  SelectTableSchema,
  tableSchema,
} from "@/shared/lib/validations/table"

export async function getAllTablesAction(ownerId: string) {
  return await db.query.tables.findMany({
    where: eq(tables.ownerId, ownerId),
  })
}

export async function getTableById(tableId: string, userId: string) {
  return await db.query.tables.findFirst({
    where: and(eq(tables.id, tableId), eq(tables.ownerId, userId)),
    with: {
      tableRecords: true,
    },
  })
}

export async function getTablesByNameAction({
  userId,
  search,
}: {
  userId: string
  search: string
}) {
  return await db.query.tables.findMany({
    where: and(eq(tables.ownerId, userId), ilike(tables.name, `%${search}%`)),
  })
}

export async function createTableAction({
  ownerId,
  table,
}: {
  ownerId: string
  table: CreateTableSchema
}) {
  await db.insert(tables).values({
    id: uuidv4(),
    ownerId,
    ...table,
  })
}

// This function update table name, desc, etc. except the columns
export async function updateTablePropsAction(
  table: Omit<InsertTableSchema, "columns">
) {
  await db.update(tables).set(table).where(eq(tables.id, table.id))
}

// export const filterTables = async (query: string) => {
//   const filteredTables = await db
//     .select({
//       id: tables.id,
//       name: tables.name,
//       type: tables.type,
//     })
//     .from(tables)
//     .where(ilike(tables.name, `%${query}%`))
//     .orderBy(desc(tables.createdAt))
//     .limit(20)

//   const tablesByType = Array.from(
//     new Set(filteredTables.map((table) => table.type))
//   ).map((type) => ({
//     type,
//     tables: filteredTables.filter((table) => table.type === type),
//   }))

//   return tablesByType
// }

// TODO
