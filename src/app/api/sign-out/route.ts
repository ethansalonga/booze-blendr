import { NextResponse } from "next/server"
import { auth } from "@/firebase/init"
import { signOut } from "firebase/auth"

export async function POST() {
  try {
    signOut(auth)
    return NextResponse.json({ message: "SIGNED OUT" })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    })
  }
}
