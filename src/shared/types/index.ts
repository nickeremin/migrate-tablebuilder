import { icons } from "lucide-react"
import { type FileWithPath } from "react-dropzone"

// Nav types
export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof icons
  description?: string
}

export interface NavItemWithChildren extends Omit<NavItem, "href"> {
  href?: string
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends Omit<NavItem, "href"> {
  href?: string
  items?: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren

export type MainNavItem = NavItemWithOptionalChildren

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

// Table data types
export interface TableColumn {
  name: string
  type: "text" | "date" | "integer" | "decimal"
}

export interface TableColumnData extends TableColumn {
  data: string | number | Date | undefined
}

// Data-Table types
/* eslint-disable */
export interface DataTableSearchableColumn<TData> {
  id: string
  title: string
}

// File types
export type FileWithPreview = FileWithPath & {
  preview: string
}

/* eslint-disable */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
