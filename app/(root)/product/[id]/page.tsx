import {
  Container,
  GroupVariants,
  ProductImage,
  Title,
} from "@/shared/components/shared"
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
      <div className="flex flex-1">
        <ProductImage
          imageUrl={product.imageUrl}
          alt={product.name}
          size={20}
          className=""
        />

        <div className="w-[490px] bg-[#F3F4F6] p-7">
          <Title
            text={product.name}
            size="md"
            className="mb-1 font-extrabold"
          />

          <p className="text-gray-400">{product.details || "Нет описания"}</p>

          <GroupVariants
            value="2"
            items={[
              {
                name: "Маленькая",
                value: "1",
              },
              {
                name: "Средняя",
                value: "2",
              },
              {
                name: "Большая",
                value: "3",
              },
            ]}
          />
        </div>
      </div>
    </Container>
  )
}
