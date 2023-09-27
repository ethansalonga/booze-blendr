type Drink = {
  id: string
  name: string
  ingredients: Ingredient[]
  garnishes: string[]
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