import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const query = searchParams.get("query")

  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 })
  }

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 5,
  })
  return NextResponse.json(products)
}
