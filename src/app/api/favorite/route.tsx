import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prismaClient";

import { createNextResponse } from "@/utils/helpers/createNextResponse";
import { Role } from "@prisma/client";

import type { IDataResponse, IResponse } from "@/models/response";
import type { IFavoriteItems } from "@/models/favorite";
// import { IFavoriteResponse } from "@/models/favorite";

// ok
export const POST = async (
  req: NextRequest,
): Promise<NextResponse<IDataResponse<IFavoriteItems[] | null>>> => {
  const session = await auth();
  if (!session) return createNextResponse(null, "User not found", false, 401);
  if (session.user.role === Role.GUEST)
    return createNextResponse(null, "Guests cant use favorite", false, 401);

  const data = (await req.json()) as { id: string };
  if (!data.id) return createNextResponse(null, "Item not found", false, 404);

  const favorite = await prisma.favorite.findUnique({
    where: { userId: session.user.id },
    include: {
      favoriteProducts: {
        select: {
          productVariantId: true,
        },
      },
    },
  });
  if (!favorite)
    return createNextResponse(null, "Favorite not found", false, 404);

  const newProduct = await prisma.favoriteProduct.create({
    data: {
      favoriteId: favorite.id,
      productVariantId: data.id,
    },
    select: {
      productVariant: true,
    },
  });

  const favoriteItems = [
    ...favorite.favoriteProducts,
    { productVariantId: newProduct.productVariant.id },
  ];

  return createNextResponse(favoriteItems, "Product added to cart", true, 200);
};

//tmp
export const DELETE = async (): Promise<NextResponse<IResponse>> => {
  const session = await auth();
  if (!session) return createNextResponse(null, "User not found", false, 401);
  if (session.user.role === Role.GUEST)
    return createNextResponse(null, "Guests cant use favorite", false, 401);

  const favorite = await prisma.favorite.findUnique({
    where: { userId: session.user.id },
  });
  if (!favorite)
    return createNextResponse(null, "Favorite not found", false, 404);

  await prisma.favoriteProduct.deleteMany({
    where: { favoriteId: favorite.id },
  });
  return createNextResponse(null, "Product removed from cart", true, 200);
};

//tmp
// export const GET = async (): Promise<
//   NextResponse<IDataResponse<ProductVariants[] | null>>
// > => {
//   const session = await auth();
//   if (!session || session.user.role === Role.GUEST)
//     return createNextResponse(null, "Guests cant use favorite", false, 401);
//   // if (!session) return redirect(`${ROUTES.SIGNIN}`);

//   const favorite = session
//     ? await prisma.favorite.findUnique({
//         where: { userId: session.user.id },
//         include: {
//           favoriteProducts: {
//             include: {
//               productVariant: true,
//             },
//           },
//         },
//       })
//     : null;

//   if (!favorite || favorite.favoriteProducts.length === 0)
//     return createNextResponse(null, "No favorites", false, 404);

//   const favoriteProducts = favorite.favoriteProducts.map(
//     (item) => item.productVariant,
//   );

//   return createNextResponse(favoriteProducts, "Favorites found", true, 200);
// };
