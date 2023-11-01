interface PropTypes {
  drink: Drink
}

export default function DrinkCard({ drink }: PropTypes) {
  return <div className="text-white">{drink.name}</div>
}
