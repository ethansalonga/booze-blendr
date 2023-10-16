"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ResultsContextProvider } from "../context/ResultsContext"
import { useAuthContext } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import { Inter } from "next/font/google"
import Spinner from "@/assets/Spinner"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function BlendrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading } = useAuthContext()

  useEffect(() => {
    if (!loading && !user) router.push("/sign-in")
  }, [loading, user, router])

  if (loading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex justify-center items-center h-screen">
            <Spinner className="h-40 w-40 fill-stone-100 animate-spin" />
          </div>
        </body>
      </html>
    )
  } else if (user) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ResultsContextProvider>
            <Navbar />
            {children}
          </ResultsContextProvider>
        </body>
      </html>
    )
  }
}
