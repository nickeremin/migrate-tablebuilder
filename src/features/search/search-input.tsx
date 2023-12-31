"use client"

import * as React from "react"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface SearchInputProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  debouncedValue: string
}

function SearchInput({
  search,
  setSearch,
  debouncedValue,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "search-input-border flex h-11 flex-1 items-center rounded-md bg-background-100 transition-all",
        className
      )}
      {...props}
    >
      <div className="-mr-3 flex h-full shrink-0 flex-col items-center justify-center bg-transparent px-3 text-muted-foreground">
        {search !== debouncedValue ? (
          <LucideIcon name="Loader" className="animate-spin" />
        ) : (
          <LucideIcon name="Search" />
        )}
      </div>
      <input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        type="search"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="inline-flex h-full w-full bg-transparent px-3 text-base placeholder:text-muted-foreground focus-visible:outline-none"
      />
      {search.length > 0 && (
        <Button
          variant="empty"
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setSearch("")
          }}
          className="-ml-3 inline-flex h-full shrink-0 flex-col items-center justify-center px-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <LucideIcon name="XCircle" />
        </Button>
      )}
    </div>
  )
}

export default SearchInput
