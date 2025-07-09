import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { EmptyCart, OrderForm } from "@/components/entities";
import prisma from "@/prismaClient";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) return notFound();
  const [items, user] = await prisma.$transaction([
    prisma.cartProduct.findMany({
      where: {
        cart: {
          userId: session.user.id,
        },
      },
      include: {
        productVariant: {
          select: {
            id: true,
            title: true,
            price: true,
            previewImage: true,
            previousPrice: true,
            sku: true,
          },
        },
      },
    }),
    prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    }),
  ]);
  if (!user) return notFound();
  if (!items.length) return <EmptyCart title="Checkout" />;
  return (
    <section className="wrapper mt-5 pb-5">
      <OrderForm items={items} user={user} />
    </section>
  );
}
