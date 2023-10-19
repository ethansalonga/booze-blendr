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
import { db, auth } from "@/firebase/init"
import { DocumentData, doc, getDoc } from "firebase/firestore"

interface PropTypes {
  children: ReactNode
}

interface ContextProps {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  loading: boolean
  userProfile: DocumentData
}

const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
  userProfile: {},
})

export const AuthContextProvider = ({ children }: PropTypes) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<DocumentData>({})

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

  useEffect(() => {
    const getUserProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUserProfile(docSnap.data())
        } else {
          console.log("Could not retrieve user information.")
        }
      }
    }

    getUserProfile()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, userProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
