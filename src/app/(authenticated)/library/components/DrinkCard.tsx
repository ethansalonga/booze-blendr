import Image from "next/image"

interface PropTypes {
  drink: Drink
}

export default function DrinkCard({
  drink: { name, image, ingredients, garnishes },
}: PropTypes) {
  return (
    <div className="text-stone-900 bg-white p-8 rounded-lg max-w-sm cursor-pointer transition hover:scale-105 duration-200">
      <div className="flex flex-col items-center gap-y-4">
        <h3 className="text-xl font-medium">{name}</h3>
        <Image
          src={image || ""}
          alt="Drink image"
          width={200}
          height={250}
          className="rounded-md"
        />
      </div>
    </div>
  )
}
