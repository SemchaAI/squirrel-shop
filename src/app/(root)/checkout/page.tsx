import prisma from "@/prismaClient";
import { auth } from "@/auth";

import { EmptyCart } from "@/components/entities/cart/EmptyCart";
import { OrderForm } from "@/components/entities/forms/OrderForm";
import { AccessDenied } from "@/components/shared/placeholders/AccessDenied";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) return <EmptyCart title="Checkout" />;
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
  if (!user)
    return <AccessDenied text="Something went wrong. User not found" />;
  if (!items.length) return <EmptyCart title="Checkout" />;
  return (
    <section className="wrapper mt-5 pb-5">
      <OrderForm items={items} user={user} />
    </section>
  );
}
