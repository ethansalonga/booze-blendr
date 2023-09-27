export const sortUserGarnishes = (garnishes: Garnish[]) => {
  const processedGarnishes = garnishes.map((garnish) => {
    delete garnish.id
    garnish.name = garnish.name.toLowerCase()
    return garnish.name
  })

  const sortedGarnishes = [...processedGarnishes].sort()

  return sortedGarnishes
}

export const sortGarnishes = (garnishes: string[]) => {
  const processedGarnishes = garnishes.map((garnish) => {
    garnish = garnish.toLowerCase()
    return garnish
  })

  const sortedGarnishes = [...processedGarnishes].sort()

  return sortedGarnishes
}
