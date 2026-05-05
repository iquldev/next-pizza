import { prisma } from "@/prisma/prisma-client"
import { Container, OrderItem, Title } from "@/shared/components/shared"
import { getUserSession } from "@/shared/lib/get-user-session"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import { cookies } from "next/headers"

export default async function OrdersPage() {
  const session = await getUserSession()
  const t = await getTranslations("Orders")

  if (!session) {
    return redirect("/")
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("cartToken")?.value

  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { token: token },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <Container className="my-10">
      <Title text={t("title")} size="lg" className="font-extrabold" />

      <div className="mt-10 flex flex-col gap-10">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              id={order.id}
              status={order.status}
              createdAt={order.createdAt}
              totalAmount={order.totalAmount}
              items={JSON.parse(order.items as string)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-white py-20 shadow-sm">
            <Image
              src="/assets/images/empty-box.png"
              alt="Empty orders"
              width={120}
              height={120}
            />
            <Title text={t("empty")} size="md" className="mt-5 font-bold" />
          </div>
        )}
      </div>
    </Container>
  )
}

