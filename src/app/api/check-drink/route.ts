import { NextRequest, NextResponse } from "next/server"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/firebase/init"
import { sortIngredients } from "./lib/sortIngredients"
import { sortUserGarnishes, sortGarnishes } from "./lib/sortGarnishes"
import { findDrink } from "./lib/findDrink"

export async function POST(request: NextRequest) {
  //* Process and sort user form data
  const formData = await request.json()

  const { ingredients, garnishes } = formData
  const sortedUserIngredients = sortIngredients(ingredients)
  const sortedUserGarnishes = sortUserGarnishes(garnishes)

  //* Fetch and process drinks from Firestore
  const drinksRef = collection(db, "drinks")
  const q = query(drinksRef)
  const querySnap = await getDocs(q)

  const drinks: Drink[] = []
  querySnap.forEach((doc) => {
    const { id, name, ingredients, garnishes, image, procedure } = doc.data()
    drinks.push({
      id,
      name,
      ingredients,
      garnishes,
      image,
      procedure,
    })
  })

  for (const drink of drinks) {
    const { name, ingredients, garnishes } = drink

    const sortedIngredients = sortIngredients(ingredients)
    const sortedGarnishes = sortGarnishes(garnishes)

    if (
      findDrink(
        sortedIngredients,
        sortedUserIngredients,
        sortedGarnishes,
        sortedUserGarnishes
      )
    ) {
      return NextResponse.json({
        message: `Nice! You've whipped up a ${name}.`,
        drink: drink,
      })
    }
  }

  return NextResponse.json({ message: "No drink found.", drink: {} })
}
