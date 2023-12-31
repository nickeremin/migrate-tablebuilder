import * as React from "react"

import "./globals.css"

import { type Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "@/shared/components/ui/toaster"
import { ThemeProvider } from "@/shared/config/providers"
import { cn } from "@/shared/lib/utils"

import TRPCQueryProvider from "./_trpc/trpc-react-query-provider"

export const metadata: Metadata = {
  title: "Create Next App",
}

const font = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic", "latin"],
  style: "normal",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(font.className, "antialiased")}
      >
        <body
          suppressHydrationWarning
          className="relative min-h-full max-w-[100vw]"
        >
          <TRPCQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <div vaul-drawer-wrapper="" className="bg-background">
                {children}
              </div>
            </ThemeProvider>
            <ReactQueryDevtools
              buttonPosition="bottom-left"
              position="bottom"
              initialIsOpen={false}
            />
          </TRPCQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
