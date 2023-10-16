"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { ResultsContextProvider } from "../context/ResultsContext"
import { useAuthContext } from "../context/AuthContext"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function BlendrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) router.push("/sign-in")
  }, [user, router])

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
