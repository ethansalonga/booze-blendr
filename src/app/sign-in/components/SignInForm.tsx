"use client"

import { useRouter } from "next/navigation"
import { useState, FormEvent, ChangeEvent } from "react"
import { auth } from "@/firebase/init"
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth"
import Spinner from "@/assets/Spinner"

export default function SignInForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    await setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        return signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            router.push("/blendr")
          })
          .catch((error) => setError(error.message))
      })
      .catch((error) => {
        setError(error.message)
      })

    setLoading(false)
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setStateFunction: (arg: string) => void
  ) => {
    setStateFunction(e.target.value)
  }

  return (
    <form
      className="mt-6 mb-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
      onSubmit={handleSubmit}
    >
      {error && (
        <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mt-4">
          {error}
        </p>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-stone-100"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 p-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
            onChange={(e) => handleInputChange(e, setEmail)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-stone-100"
          >
            Password
          </label>
        </div>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 p-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
            onChange={(e) => handleInputChange(e, setPassword)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={`${
            loading
              ? "bg-stone-500 cursor-auto"
              : "bg-stone-300 text-stone-900 hover:bg-stone-100"
          } flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-medium leading-6  shadow-sm`}
          disabled={loading}
        >
          {loading ? (
            <Spinner className="h-6 w-6 fill-stone-900 text-stone-100 animate-spin" />
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  )
}
