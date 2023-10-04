"use client"

import Image from "next/image"
import { useResultsContext } from "../context/ResultsContext"

export default function Results() {
  const { results } = useResultsContext()
  const {
    message,
    drink: { name, ingredients, garnishes, image, procedure },
  } = results

  if (name) {
    return (
      <div className="p-4">
        <div className="p-4">
          <h2 className="text-center text-lg mb-4">{message}</h2>
          <div className="mb-2">
            <p className="font-medium">Ingredients:</p>
            <ul>
              {ingredients.map(({ name, measurement, unit }) => (
                <li key={name}>
                  {measurement} {unit} {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <p className="font-medium">Garnishes:</p>
            <ul>
              {garnishes.map((garnish) => (
                <li key={garnish}>{garnish}</li>
              ))}
            </ul>
          </div>
          {image && (
            <Image
              className="rounded-md mx-auto mb-4"
              src={image}
              alt={name}
              width={200}
              height={200}
            />
          )}
          <p>{procedure}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="p-4">
        <div className="p-4">
          <h2 className="text-center text-xl mb-4">{message}</h2>
        </div>
      </div>
    )
  }
}
