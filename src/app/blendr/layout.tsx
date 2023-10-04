import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "../components/Navbar"
import { ResultsContextProvider } from "../context/ResultsContext"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "booze blendr",
  description: "Improve your cocktail knowledge!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
