"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, FormEvent, ChangeEvent, useRef } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { db } from "@/firebase/init"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { updateEmail, updatePassword } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Spinner from "@/assets/Spinner"

const UpdateProfile = () => {
  const { user, userProfile } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [avatar, setAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/booze-blendr.appspot.com/o/default-profile-picture.jpg?alt=media&token=bc191c94-443a-40c1-849a-660f039b2099&_gl=1*1woxm81*_ga*ODQ3OTY2MTkuMTY4MTc5NTM4NA..*_ga_CW55HF8NVT*MTY5NzY1NTE4OC43My4xLjE2OTc2NTc0MjAuMjMuMC4w"
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    if (user) {
      try {
        await updateEmail(user, email)
        const docRef = doc(db, "users", user.uid)
        const docSnapshot = await getDoc(docRef)

        if (docSnapshot.exists()) {
          const currentData = docSnapshot.data()
          const updatedData = {
            ...currentData,
            email: email,
          }

          await updateDoc(docRef, updatedData)
        }

        if (password) {
          await updatePassword(user, password)
        }

        setMessage("Credentials successfully updated!")
        setPassword("")
        setConfirmPassword("")
      } catch (error: any) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setStateFunction: (arg: string) => void
  ) => {
    setStateFunction(e.target.value)
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null

    if (file) {
      try {
        const storage = getStorage()
        const storageRef = ref(storage, `${user?.uid}/`)

        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)

        // Update user profile in Firestore
        if (user) {
          const docRef = doc(db, "users", user.uid)
          const docSnapshot = await getDoc(docRef)

          if (docSnapshot.exists()) {
            const currentData = docSnapshot.data()
            const updatedData = {
              ...currentData,
              image: url,
            }

            await updateDoc(docRef, updatedData)
          }
        }

        // Update avatar ui
        setAvatar(url)
        setMessage("Profile pic successfully updated!")
      } catch (err: any) {
        setError(err.message as string)
      }
    }
  }

  return (
    <>
      <div className="text-stone-100 flex flex-1 flex-col justify-center py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="h-20 w-20 rounded-full mx-auto mb-4"
            src={userProfile.image ? userProfile.image : avatar}
            alt=""
            width={80}
            height={80}
          />
          <div className="flex justify-center">
            <p
              onClick={handleAvatarClick}
              className="text-center text-sm cursor-pointer text-stone-900 bg-stone-100 py-1.5 px-4 rounded-md hover:opacity-90"
            >
              Change profile pic
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>
          <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight text-stone-100">
            Update profile
          </h2>
          {message && (
            <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mt-4">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mt-4">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  defaultValue={user?.email as string}
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
                  value={password}
                  autoComplete="current-password"
                  placeholder="Leave blank to leave unchanged"
                  className="block w-full rounded-md border-0 p-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-stone-100"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  placeholder="Leave blank to leave unchanged"
                  className="block w-full rounded-md border-0 p-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInputChange(e, setConfirmPassword)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`${
                  loading
                    ? "bg-stone-400 cursor-auto"
                    : "bg-stone-100 hover:opacity-90"
                } text-stone-900 lex w-full justify-center rounded-md px-3 p-1.5 text-sm font-medium leading-6  shadow-sm`}
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="mx-auto h-6 w-6 fill-stone-100 animate-spin" />
                ) : (
                  "Update credentials"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="text-sm text-center mt-4">
          <Link className="font-medium" href="/">
            Cancel
          </Link>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
