"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { LucideIcon } from "@/shared/components/icons"

interface TableEmptySearchProps {
  search: string
}

function TableEmptySearch({ search }: TableEmptySearchProps) {
  const { orgSlug } = useAuth()

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-xl bg-background p-12 ring-1 ring-border">
      <p className="text-medium text-sm">Таблиц не Найдено</p>
      <p className="text-balance text-center text-sm text-muted-foreground">
        Ваш поиск по запросу &#8220;{search}&#8221; не дал результатов.
      </p>
      <Link
        href={orgSlug ? `/${orgSlug}/tables` : "/tables"}
        className="underline-link inline-flex items-center gap-1 pt-4 text-sm text-link"
      >
        Новая Таблица
        <LucideIcon name="ArrowRight" />
      </Link>
    </div>
  )
}

export default TableEmptySearch
