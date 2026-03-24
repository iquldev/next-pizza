import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/components/shared"

export default function Page() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters></Filters>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: "1",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                  {
                    id: "2",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                  {
                    id: "3",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: "1",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                  {
                    id: "2",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                  {
                    id: "3",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                ]}
                categoryId={2}
              />
              <ProductsGroupList
                title="Закуски"
                items={[
                  {
                    id: "1",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                  {
                    id: "2",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                  {
                    id: "3",
                    name: "Пепперони",
                    price: 10,
                    imageUrl: "/pizza.png",
                    items: [
                      {
                        id: "1",
                        name: "Пепперони",
                        price: 10,
                        imageUrl: "/pizza.png",
                      },
                    ],
                  },
                ]}
                categoryId={3}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
