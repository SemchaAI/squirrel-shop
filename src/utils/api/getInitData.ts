"use server";
import { auth } from "@/auth";
import prisma from "@/prismaClient";

export const getInitData = async () => {
  const session = await auth();
  try {
    const [cart, favorite] = session
      ? await prisma.$transaction([
          prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: {
              cartProducts: {
                include: {
                  productVariant: true,
                },
              },
            },
          }),
          prisma.favorite.findUnique({
            where: { userId: session.user.id },
            select: {
              favoriteProducts: {
                select: {
                  productVariantId: true,
                },
              },
            },
          }),
        ])
      : [null, null];

    const cartProducts = cart?.cartProducts || null;
    const favoriteProducts = favorite?.favoriteProducts || null;
    return { cartProducts, favoriteProducts };
  } catch (error) {
    console.log("[getInitData]", error);
    throw new Error("Database error. Please try later");
  }
};
