"use client"

import {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react"

interface PropTypes {
  children: ReactNode
}

interface ContextProps {
  results: Results
  setResults: Dispatch<SetStateAction<Results>>
}

const initialState = {
  message: "",
  drink: {
    id: "",
    name: "",
    ingredients: [],
    garnishes: [],
    image: "",
    procedure: "",
  },
}

const ResultsContext = createContext<ContextProps>({
  results: initialState,
  setResults: (): Results => initialState,
})

export const ResultsContextProvider = ({ children }: PropTypes) => {
  const [results, setResults] = useState<Results>(initialState)

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  )
}

export const useResultsContext = () => useContext(ResultsContext)
