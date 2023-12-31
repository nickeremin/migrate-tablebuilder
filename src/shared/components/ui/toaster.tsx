"use client"

import { Toaster as SonnerToaster } from "sonner"

const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--background-100)",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  )
}

export { Toaster }
