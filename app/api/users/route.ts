import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  const { fullName, email, password } = await request.json()

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password,
      verified: new Date(),
    },
  })

  return NextResponse.json({ user })
}
