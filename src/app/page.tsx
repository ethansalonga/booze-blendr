"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { FaCirclePlus } from "react-icons/fa6"

export default function Home() {
  const [formData, setFormData] = useState([{ id: 1, name: "" }])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setFormData((prevState) =>
      prevState.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, name: e.target.value }
          : ingredient
      )
    )
  }

  const addIngredient = () => {
    const highestId = Math.max(
      ...formData.map((ingredient) => ingredient.id, 0)
    )
    const nextId = highestId + 1
    const newIngredient = { id: nextId, name: "" }

    setFormData((prevState) => [...prevState, newIngredient])
  }

  return (
    <main className="w-full max-w-sm my-8 mx-auto text-stone-100">
      <h1 className="text-center text-3xl font-medium mb-6">booze blendr</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="p-4 rounded-sm flex flex-col gap-y-3"
      >
        <div className="flex flex-col gap-y-2">
          {formData.map((ingredient) => (
            <input
              key={ingredient.id}
              type="text"
              placeholder="Enter ingredient"
              value={ingredient.name}
              onChange={(e) => handleChange(e, ingredient.id)}
              className="rounded-sm p-1 text-stone-900"
            />
          ))}
        </div>
        <FaCirclePlus
          className="mx-auto h-5 w-5 cursor-pointer"
          onClick={addIngredient}
        />
        <button className="p-1 border border-slate-300 rounded-sm">
          Mix it up!
        </button>
      </form>
    </main>
  )
}
