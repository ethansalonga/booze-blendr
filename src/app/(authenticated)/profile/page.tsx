"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react"
import { useAuthContext } from "../../context/AuthContext"
// import {
//   updateProfile,
//   updateAvatar,
// } from "../features/auth/authSlice.js"
import { db } from "@/firebase/init"
import { doc, getDoc, DocumentData, updateDoc } from "firebase/firestore"
import { updateEmail, updatePassword } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Spinner from "@/assets/Spinner"
import DefaultProfilePicture from "@/assets/default-profile-picture.jpg"

const UpdateProfile = () => {
  const { user } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const [avatar, setAvatar] = useState(
    "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userProfile, setUserProfile] = useState<DocumentData>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
    setSelectedFile(file)

    if (file) {
      try {
        const storage = getStorage()
        const storageRef = ref(storage, `${user?.uid}/`)

        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)

        // Update user profile in Firestore
        if (user) {
          // updateAvatar({ uid: user.uid, url: url })
        }

        // Update avatar ui
        setAvatar(url)
        setMessage("Avatar successfully updated!")
      } catch (err) {
        setError(err as string)
      }
    }
  }

  useEffect(() => {
    const getUserProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUserProfile(docSnap.data())
        } else {
          setError("Could not retrieve user information.")
        }
      }
    }

    getUserProfile()
  }, [user])

  return (
    <>
      <div className="text-stone-100 flex flex-1 flex-col justify-center py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="h-20 w-20 rounded-full mx-auto mb-2"
            src={userProfile.image ? userProfile.image : DefaultProfilePicture}
            alt=""
            width={50}
            height={50}
          />
          <div>
            <p
              onClick={handleAvatarClick}
              className="text-center text-sm cursor-pointer"
            >
              Change avatar
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
