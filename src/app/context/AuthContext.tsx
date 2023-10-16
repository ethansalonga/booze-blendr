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
  loading: boolean
}

const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
})

export const AuthContextProvider = ({ children }: PropTypes) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
