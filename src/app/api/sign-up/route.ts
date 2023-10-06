import { NextRequest, NextResponse } from "next/server"
import { auth, db } from "@/firebase/init"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    const credentialsCopy = { email }
    await setDoc(doc(db, "users", user.uid), credentialsCopy)

    return NextResponse.json({
      message: "Your account has been created! Logging you in...",
    })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    })
  }
}
