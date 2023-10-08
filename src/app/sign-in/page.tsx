import type { Metadata } from "next"
import Link from "next/link"
import SignInForm from "./components/SignInForm"

export const metadata: Metadata = {
  title: "booze blendr | Sign-in",
  description: "booze blendr sign-in page",
}

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-medium leading-9 tracking-tight text-stone-100 mb-6">
          booze blendr
        </h1>
        <h2 className="text-center text-2xl font-medium leading-9 tracking-tight text-stone-100">
          Sign into your account
        </h2>
      </div>
      <SignInForm />
      <div>
        <div className="text-sm text-center mb-2">
          <Link
            className="font-medium text-stone-300 hover:text-stone-100"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <div className="text-sm text-center text-stone-300">
          Need an account?{" "}
          <Link className="font-medium hover:text-stone-100" href="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
