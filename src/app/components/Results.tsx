"use client"

import Image from "next/image"
import { useResultsContext } from "../context/ResultsContext"

export default function Results() {
  const { results } = useResultsContext()
  const {
    message,
    drink: { name, ingredients, garnishes, image, procedure },
  } = results

  return (
    <div className="p-4">
      <div className="border p-4 rounded-md">
        <h2 className="text-center text-xl mb-2">{message}</h2>
        {ingredients.map(({ name, measurement, unit }) => (
          <p key={name}>
            {measurement} {unit} {name}
          </p>
        ))}
        {garnishes.map((garnish) => (
          <p key={garnish}>{garnish}</p>
        ))}
        {image && <Image src={image} alt={name} width={200} height={200} />}
        <p>{procedure}</p>
      </div>
    </div>
  )
}
