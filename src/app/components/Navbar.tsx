"use client"

import Link from "next/link"
import Image from "next/image"
import { Fragment } from "react"
import { useAuthContext } from "../context/AuthContext"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { auth } from "@/firebase/init"
import { signOut } from "firebase/auth"
import { FaBars, FaXmark } from "react-icons/fa6"

export default function Navbar() {
  const navigation = [{ name: "blendr", href: "/blendr", current: "blendr" }]
  const { userProfile } = useAuthContext()

  return (
    <Disclosure as="nav" className="bg-161616 w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-700 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaXmark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`${
                          item.current
                            ? "bg-stone-800 text-white"
                            : "text-stone-300 hover:bg-stone-700 hover:text-white"
                        } rounded-md px-3 py-2 text-sm font-medium`}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-stone-800 text-sm">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={
                          userProfile.image
                            ? userProfile.image
                            : "https://firebasestorage.googleapis.com/v0/b/booze-blendr.appspot.com/o/default-profile-picture.jpg?alt=media&token=bc191c94-443a-40c1-849a-660f039b2099&_gl=1*1woxm81*_ga*ODQ3OTY2MTkuMTY4MTc5NTM4NA..*_ga_CW55HF8NVT*MTY5NzY1NTE4OC43My4xLjE2OTc2NTc0MjAuMjMuMC4w"
                        }
                        alt="Profile picture"
                        width={32}
                        height={32}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active && "bg-stone-100"
                            } block px-4 py-2 text-sm text-stone-700`}
                          >
                            Your profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active && "bg-stone-100"
                            } block px-4 py-2 text-sm text-stone-700 w-full text-start`}
                            onClick={() => signOut(auth)}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  className={`${
                    item.current
                      ? "bg-stone-800 text-white"
                      : "text-stone-300 hover:bg-stone-700 hover:text-white"
                  } block rounded-md px-3 py-2 text-base font-medium`}
                  aria-current={item.current ? "page" : undefined}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
