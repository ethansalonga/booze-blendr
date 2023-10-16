"use client"

import {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/init"

interface PropTypes {
  children: ReactNode
}

interface ContextProps {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
})

export const AuthContextProvider = ({ children }: PropTypes) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
