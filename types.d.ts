type Drink = {
  id: string
  name: string
  ingredients: Ingredient[]
  garnishes: string[]
  image?: string
  procedure?: string
}

type Ingredient = {
  id?: number
  name: string
  measurement: number
  unit: string
}

type Garnish = {
  id?: number
  name: string
}

type Results = {
  message: string
  drink: Drink
}
