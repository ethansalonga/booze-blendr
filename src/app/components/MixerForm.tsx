"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useResultsContext } from "../context/ResultsContext"
import { FaCirclePlus } from "react-icons/fa6"

export default function MixerForm() {
  const { setResults } = useResultsContext()

  const [formData, setFormData] = useState({
    ingredients: [{ id: 1, name: "", measurement: 0, unit: "oz" }],
    garnishes: [{ id: 1, name: "" }],
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:3000/api/check-drink`, {
      method: "POST",
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    setResults(data)
  }

  const handleIngredientChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number,
    key: string
  ) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.map((ingredient) =>
        ingredient.id === id
          ? {
              ...ingredient,
              [key]: e.target.value,
            }
          : ingredient
      ),
    })
  }

  const handleGarnishChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number
  ) => {
    setFormData({
      ...formData,
      garnishes: formData.garnishes.map((garnish) =>
        garnish.id === id
          ? {
              ...garnish,
              name: e.target.value,
            }
          : garnish
      ),
    })
  }

  const addItem = (item: string) => {
    if (item === "ingredient") {
      const highestId = Math.max(
        ...formData.ingredients.map((ingredient) => ingredient.id, 0)
      )
      const nextId = highestId + 1
      const newIngredient = { id: nextId, name: "", measurement: 0, unit: "oz" }

      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient],
      })
    }

    if (item === "garnish") {
      const highestId = Math.max(
        ...formData.garnishes.map((garnish) => garnish.id, 0)
      )
      const nextId = highestId + 1
      const newGarnish = { id: nextId, name: "" }

      setFormData({
        ...formData,
        garnishes: [...formData.garnishes, newGarnish],
      })
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-4 rounded-sm flex flex-col gap-y-3 mb-8"
    >
      <div className="flex flex-col gap-y-2 mb-2">
        <h2 className="text-center text-xl mb-2">Ingredients</h2>
        {formData.ingredients.map((ingredient) => (
          <div
            className="flex gap-x-2 justify-between mb-2"
            key={ingredient.id}
          >
            <div className="w-2/6 flex">
              <input
                type="text"
                value={ingredient.measurement}
                onChange={(e) =>
                  handleIngredientChange(e, ingredient.id, "measurement")
                }
                className="w-2/6 p-1 text-stone-900 border-r rounded-l-sm"
              />
              <select
                name="unit"
                id="unit"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(e, ingredient.id, "unit")
                }
                className="w-4/6 p-1 text-stone-900 rounded-r-sm"
              >
                <option value="oz">oz</option>
                <option value="bsp">bsp</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter ingredient"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(e, ingredient.id, "name")}
              className="w-4/6 rounded-sm p-1 text-stone-900"
            />
          </div>
        ))}
        <FaCirclePlus
          className="mx-auto h-5 w-5 cursor-pointer hover:opacity-80"
          onClick={() => addItem("ingredient")}
        />
      </div>
      <div className="flex flex-col gap-y-2 mb-4">
        <h2 className="text-center text-xl mb-2">Garnishes</h2>
        {formData.garnishes.map((garnish) => (
          <input
            key={garnish.id}
            type="text"
            placeholder="Enter garnish"
            value={garnish.name}
            onChange={(e) => handleGarnishChange(e, garnish.id)}
            className="w-full rounded-sm p-1 text-stone-900 mb-2"
          />
        ))}
        <FaCirclePlus
          className="mx-auto h-5 w-5 cursor-pointer hover:opacity-80"
          onClick={() => addItem("garnish")}
        />
      </div>
      <button className="p-1 border border-stone-300 rounded-sm hover:text-stone-900 hover:bg-stone-300 transition">
        Mix it up!
      </button>
    </form>
  )
}
