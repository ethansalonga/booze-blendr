"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FaCirclePlus } from "react-icons/fa6"

export default function Home() {
  const [formData, setFormData] = useState([
    { id: 1, name: "", measurement: 0, unit: "" },
  ])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number,
    key: string
  ) => {
    setFormData((prevState) =>
      prevState.map((ingredient) =>
        ingredient.id === id
          ? {
              ...ingredient,
              [key]: e.target.value,
            }
          : ingredient
      )
    )
  }

  const addIngredient = () => {
    const highestId = Math.max(
      ...formData.map((ingredient) => ingredient.id, 0)
    )
    const nextId = highestId + 1
    const newIngredient = { id: nextId, name: "", measurement: 0, unit: "" }

    setFormData((prevState) => [...prevState, newIngredient])
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <main className="w-full max-w-sm my-8 mx-auto text-stone-100">
      <h1 className="text-center text-3xl font-medium mb-6">booze blendr</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="p-4 rounded-sm flex flex-col gap-y-3"
      >
        <div className="flex flex-col gap-y-2">
          {formData.map((ingredient) => (
            <div className="flex gap-x-2 justify-between" key={ingredient.id}>
              <div className="w-2/6 flex">
                <input
                  type="text"
                  value={ingredient.measurement}
                  onChange={(e) =>
                    handleChange(e, ingredient.id, "measurement")
                  }
                  className="w-2/6 p-1 text-stone-900 border-r rounded-l-sm"
                />
                <select
                  name="unit"
                  id="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleChange(e, ingredient.id, "unit")}
                  className="w-4/6 p-1 text-stone-900 rounded-r-sm"
                >
                  <option value="oz">oz</option>
                  <option value="barspoon">bsp</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Enter ingredient"
                value={ingredient.name}
                onChange={(e) => handleChange(e, ingredient.id, "name")}
                className="w-4/6 rounded-sm p-1 text-stone-900"
              />
            </div>
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
