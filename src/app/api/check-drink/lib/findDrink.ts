import { areObjectsEqual } from "@/lib/areObjectsEqual"
import { areArraysEqual } from "@/lib/areArraysEqual"

export const findDrink = (
  ingredients: Ingredient[],
  userIngredients: Ingredient[],
  garnishes: string[],
  userGarnishes: string[]
) => {
  const ingredientsMatch = ingredients.every((element, index) =>
    areObjectsEqual(element, userIngredients[index])
  )
  const garnishesMatch = areArraysEqual(garnishes, userGarnishes)

  return ingredientsMatch && garnishesMatch
}
