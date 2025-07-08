import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { createNextResponse } from "@/utils/helpers";

import type { ICartResponse } from "@/models/cart";
import type { IDataResponse } from "@/models/response";

// ok
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<IDataResponse<ICartResponse | null>>> => {
  const session = await auth();
  if (!session) return createNextResponse(null, "User not found", false, 401);
  const { id } = await params;

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      cartProducts: {
        include: {
          productVariant: true,
        },
      },
    },
  });
  if (!cart) return createNextResponse(null, "Cart not found", false, 404);

  const currentItem = cart.cartProducts.find((item) => item.id === id);
  if (!currentItem)
    return createNextResponse(null, "Item not found", false, 404);

  await prisma.cartProduct.delete({
    where: { id },
  });
  const cartProducts = cart.cartProducts.filter((item) => item.id !== id);

  return createNextResponse({ cartProducts }, "Product removed", true, 200);
};
