import MixerForm from "./components/MixerForm"

export default function Home() {
  return (
    <main className="w-full max-w-sm my-8 mx-auto text-stone-100">
      <h1 className="text-center text-3xl font-medium mb-6">booze blendr</h1>
      <MixerForm />
    </main>
  )
}
