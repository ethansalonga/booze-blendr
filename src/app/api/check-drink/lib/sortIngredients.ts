export const sortIngredients = (ingredients: Ingredient[]) => {
  const processedIngredients = ingredients.map((ingredient) => {
    if (ingredient.id) {
      delete ingredient.id
      ingredient.measurement = +ingredient.measurement
    }
    ingredient.name = ingredient.name.toLowerCase()
    return ingredient
  })

  const sortedIngredients = [...processedIngredients].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return sortedIngredients
}
