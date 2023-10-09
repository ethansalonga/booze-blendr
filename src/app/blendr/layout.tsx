import { Inter } from "next/font/google"
import Navbar from "../components/Navbar"
import { ResultsContextProvider } from "../context/ResultsContext"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

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
