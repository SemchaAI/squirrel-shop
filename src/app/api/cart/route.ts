import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

import prisma from "@/prismaClient";
import { createNextResponse } from "@/utils/helpers";

import type { IDataResponse, IResponse } from "@/models/response";
import type { IAddCartProduct, ICartItem, ICartResponse } from "@/models/cart";

// ok
export const POST = async (
  req: NextRequest,
): Promise<NextResponse<IDataResponse<ICartResponse | null>>> => {
  const session = await auth();
  if (!session) return createNextResponse(null, "User not found", false, 401);

  const data = (await req.json()) as IAddCartProduct;

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

  // Check if item is already in cart
  const existingItem = cart.cartProducts.find(
    (item) => item.productVariantId === data.id,
  );

  let updatedProducts;
  if (existingItem) {
    // Update quantity
    const updatedItem = await prisma.cartProduct.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + data.quantity,
      },
      include: { productVariant: true },
    });
    updatedProducts = cart.cartProducts.map((item) =>
      item.id === existingItem.id ? updatedItem : item,
    );
  } else {
    // Add new product
    const newProduct = await prisma.cartProduct.create({
      data: {
        cartId: cart.id,
        productVariantId: data.id,
        quantity: data.quantity,
      },
      include: {
        productVariant: true,
      },
    });
    updatedProducts = [...cart.cartProducts, newProduct];
  }

  return createNextResponse(
    { cartProducts: updatedProducts },
    "Product added to cart",
    true,
    200,
  );
};

// ok
export const DELETE = async (): Promise<NextResponse<IResponse>> => {
  const session = await auth();
  if (!session) return createNextResponse(null, "User not found", false, 401);

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    // include: {
    //   cartProducts: {
    //     include: {
    //       productVariant: true,
    //     },
    //   },
    // },
  });
  if (!cart) return createNextResponse(null, "Cart not found", false, 404);

  await prisma.cartProduct.deleteMany({
    where: { cartId: cart.id },
  });

  return createNextResponse(null, "Cart cleared", true, 200);
};

//
export const PATCH = async (
  req: NextRequest,
): Promise<NextResponse<IDataResponse<ICartItem | null>>> => {
  try {
    const body = await req.json();
    const { id, quantity } = body;
    if (!id || typeof quantity !== "number" || quantity <= 0) {
      return createNextResponse(null, "Invalid request", false, 400);
    }

    const session = await auth();
    if (!session) {
      return createNextResponse(null, "User not found", false, 401);
    }
    // Update quantity in DB
    const updatedCart = await prisma.cartProduct.update({
      where: { id },
      data: { quantity },
      include: { productVariant: true },
    });

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return createNextResponse(
      updatedCart,
      "Product quantity updated",
      true,
      200,
    );
  } catch (error) {
    console.log("[CART_PUT] Something went wrong", error);
    return createNextResponse(null, "Something went wrong", false, 500);
  }
};
