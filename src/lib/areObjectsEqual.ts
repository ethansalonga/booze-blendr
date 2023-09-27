export const areObjectsEqual = <T extends Record<string, any>>(
  objA: T,
  objB: T
): boolean => {
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false
    }
  }

  return true
}
