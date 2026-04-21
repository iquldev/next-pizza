import { Container, ProductForm } from "@/shared/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className="my-10 flex flex-col">
      <ProductForm product={product}/>
    </Container>
  )
}
