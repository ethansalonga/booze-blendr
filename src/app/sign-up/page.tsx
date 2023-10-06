import type { Metadata } from "next"
import Link from "next/link"
import SignUpForm from "./components/SignUpForm"

export const metadata: Metadata = {
  title: "booze blendr | Sign-up",
  description: "booze blendr sign-up page",
}

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-medium leading-9 tracking-tight text-stone-100 mb-6">
          booze blendr
        </h1>
        <h2 className="text-center text-2xl font-medium leading-9 tracking-tight text-stone-100">
          Sign up for an account
        </h2>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm mb-8">
        <SignUpForm />
      </div>
      <div className="text-sm text-center text-stone-300">
        Already have an account?{" "}
        <Link className="font-medium hover:text-stone-100" href="/sign-in">
          Sign in
        </Link>
      </div>
    </div>
  )
}
