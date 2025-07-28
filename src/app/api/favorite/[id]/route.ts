import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prismaClient";
import { auth } from "@/auth";
import { createNextResponse } from "@/utils/helpers";

import { Role } from "@prisma/client";
import type { IDataResponse } from "@/models/response";
import type { IFavoriteItems } from "@/models/favorite";
//tmp
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<IDataResponse<IFavoriteItems[] | null>>> => {
  const session = await auth();
  if (!session) return createNextResponse(null, "User not found", false, 401);
  if (session.user.role === Role.GUEST)
    return createNextResponse(null, "Guests cant use favorite", false, 401);

  const favorite = await prisma.favorite.findUnique({
    where: { userId: session.user.id },
    include: {
      favoriteProducts: {
        select: {
          id: true,
          productVariantId: true,
        },
      },
    },
  });

  if (!favorite)
    return createNextResponse(null, "Favorite not found", false, 404);

  const { id } = await params;
  const currentItem = favorite.favoriteProducts.find(
    (item) => item.productVariantId === id,
  );
  if (!currentItem)
    return createNextResponse(null, "Item not found", false, 404);

  await prisma.favoriteProduct.delete({
    where: { id: currentItem.id },
  });

  const favoriteProducts = favorite.favoriteProducts
    .filter((item) => item.productVariantId !== id)
    .map((item) => {
      return {
        productVariantId: item.productVariantId,
      };
    });

  return createNextResponse(
    favoriteProducts,
    "Product removed from cart",
    true,
    200,
  );
};
