"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useResultsContext } from "@/app/context/ResultsContext"
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6"
import Spinner from "@/assets/Spinner"

export default function MixerForm() {
  const { setResults } = useResultsContext()

  const [formData, setFormData] = useState({
    ingredients: [{ id: 1, name: "", measurement: 0, unit: "oz" }],
    garnishes: [{ id: 1, name: "" }],
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`http://localhost:3000/api/check-drink`, {
      method: "POST",
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    setResults(data)
    setLoading(false)
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
      if (formData.ingredients.length < 1) {
        const newIngredient = { id: 1, name: "", measurement: 0, unit: "oz" }

        setFormData({
          ...formData,
          ingredients: [...formData.ingredients, newIngredient],
        })
      } else {
        const highestId = Math.max(
          ...formData.ingredients.map((ingredient) => ingredient.id, 0)
        )
        const nextId = highestId + 1
        const newIngredient = {
          id: nextId,
          name: "",
          measurement: 0,
          unit: "oz",
        }

        setFormData({
          ...formData,
          ingredients: [...formData.ingredients, newIngredient],
        })
      }
    }

    if (item === "garnish") {
      if (formData.garnishes.length < 1) {
        const newGarnish = { id: 1, name: "" }

        setFormData({
          ...formData,
          garnishes: [...formData.garnishes, newGarnish],
        })
      } else {
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
  }

  const removeItem = (id: number, item: string) => {
    if (item === "ingredient") {
      setFormData({
        ...formData,
        ingredients: [
          ...formData.ingredients.filter((ingredient) => ingredient.id !== id),
        ],
      })
    }

    if (item === "garnish") {
      setFormData({
        ...formData,
        garnishes: [
          ...formData.garnishes.filter((garnish) => garnish.id !== id),
        ],
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
            className="flex gap-x-2 justify-between items-center mb-2"
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
            <FaCircleMinus
              className="mx-auto h-5 w-5 cursor-pointer hover:opacity-80"
              onClick={() => removeItem(ingredient.id, "ingredient")}
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
          <div
            className="flex gap-x-2 justify-between items-center mb-2"
            key={garnish.id}
          >
            <input
              key={garnish.id}
              type="text"
              placeholder="Enter garnish"
              value={garnish.name}
              onChange={(e) => handleGarnishChange(e, garnish.id)}
              className="w-full rounded-sm p-1 text-stone-900"
            />
            <FaCircleMinus
              className="mx-auto h-5 w-5 cursor-pointer hover:opacity-80"
              onClick={() => removeItem(garnish.id, "garnish")}
            />
          </div>
        ))}
        <FaCirclePlus
          className="mx-auto h-5 w-5 cursor-pointer hover:opacity-80"
          onClick={() => addItem("garnish")}
        />
      </div>
      {!loading ? (
        <button className="p-1 border border-stone-300 rounded-sm hover:text-stone-900 hover:bg-stone-300 transition">
          Mix it up!
        </button>
      ) : (
        <div className="flex justify-center items-center gap-2 p-1 border border-stone-300 rounded-sm bg-stone-300">
          <Spinner className="h-5 w-5 fill-stone-900" />
          <p className="text-stone-900">Mixing drink...</p>
        </div>
      )}
    </form>
  )
}
