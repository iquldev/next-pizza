import { Header } from "@/shared/components/shared/header"

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-background-checkout">
      <Header hasSearch={false} hasCart={false} />
      {children}
      {modal}
    </main>
  )
}
