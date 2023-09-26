import type { Metadata } from "next"
import MixerForm from "./components/MixerForm"

export const metadata: Metadata = {
  title: "booze blendr | Put your mixology knowledge to the test!",
  description:
    "booze blendr is a simple quiz application where you mix ingredients and garnishes to see if it matches an alcoholic drink from our database.",
}

export default function Home() {
  return (
    <main className="w-full max-w-sm my-8 mx-auto text-stone-100">
      <h1 className="text-center text-3xl font-medium mb-6">booze blendr</h1>
      <MixerForm />
    </main>
  )
}
