import { Container, ProductFormSkeleton } from "@/shared/components/shared"

export default function Loading() {
  return (
    <Container className="my-10 flex flex-col">
      <ProductFormSkeleton />
    </Container>
  )
}
