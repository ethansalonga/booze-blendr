import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword } from "firebase/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    await signInWithEmailAndPassword(auth, email, password)

    return NextResponse.json({ message: "SIGNED IN" })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    })
  }
}
