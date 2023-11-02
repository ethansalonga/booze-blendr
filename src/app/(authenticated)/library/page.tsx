"use client"

import { useEffect, useState } from "react"
import DrinkCard from "./components/DrinkCard"
import { db } from "@/firebase/init"
import { collection, getDocs, query } from "firebase/firestore"

export default function Library() {
  const [drinks, setDrinks] = useState<Drink[]>([])

  const fetchDrinks = async () => {
    const drinksRef = collection(db, "drinks")
    const q = query(drinksRef)
    const querySnap = await getDocs(q)
    const newDrinks: Drink[] = []

    querySnap.forEach((doc) => {
      const { id, name, ingredients, garnishes, image, procedure } = doc.data()
      newDrinks.push({ id, name, ingredients, garnishes, image, procedure })
    })

    setDrinks(newDrinks)
  }

  useEffect(() => {
    fetchDrinks()
  }, [])

  return (
    <main className="w-full max-w-7xl my-8 mx-auto text-stone-100">
      <h1 className="text-center text-3xl font-medium mb-6">Library</h1>
      <div className="flex flex-wrap gap-6 mx-4 justify-center">
        {drinks.map((drink) => (
          <DrinkCard drink={drink} key={drink.id} />
        ))}
      </div>
    </main>
  )
}
