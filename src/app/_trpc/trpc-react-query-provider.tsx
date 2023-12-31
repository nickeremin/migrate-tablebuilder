"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import { trpc } from "@/app/_trpc/client"

import { transformer } from "./transformer"

interface TRPCQueryProviderProps {
  children: React.ReactNode
}

const TRPCQueryProvider = ({ children }: TRPCQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
      transformer,
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default TRPCQueryProvider
