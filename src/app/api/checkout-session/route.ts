import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { stripe } from "@/utils/stripe";
import { createNextResponse } from "@/utils/helpers";

import type { IOrder } from "@/models/orders";
import type { IDataResponse } from "@/models/response";

const SHIPPING_COST = 100; // 100 MDL
const FREE_SHIPPING_THRESHOLD = 1000; // 1000 MDL

export async function POST(
  req: Request,
): Promise<NextResponse<IDataResponse<{ url: string | null } | null>>> {
  const data = await auth();
  if (!data) return createNextResponse(null, "User not found", false, 401);
  const { payload } = (await req.json()) as { payload: IOrder }; // [{ name: string, price: number (mdl), quantity: number }]

  try {
    if (!payload || !payload.items.length)
      return createNextResponse(null, "No items in cart", false, 400);

    const totalAmount = payload.items.reduce((acc, item) => {
      return acc + item.productVariant.price * item.quantity;
    }, 0);
    const serializeItems = payload.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      productVariantId: item.productVariantId,
      cartId: item.cartId,
      productVariant: {
        id: item.productVariant.id,
        title: item.productVariant.title,
        price: item.productVariant.price,
        previousPrice: item.productVariant.previousPrice,
        previewImage: item.productVariant.previewImage,
        sku: item.productVariant.sku,
      },
    }));

    const order = await prisma.order.create({
      data: {
        name: payload.name,
        email: payload.email,
        address: payload.address,
        phone: payload.phone,
        comment: payload.comment,

        items: serializeItems,

        totalAmount,
        shippingFee: totalAmount < FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0,
        userId: data.user.id,
      },
    });

    // Build line_items
    const line_items = payload.items.map((item) => ({
      price_data: {
        currency: "mdl",
        product_data: {
          name: item.productVariant.title,
        },
        unit_amount: item.productVariant.price * 100,
      },
      quantity: item.quantity,
    }));

    //  add shipping
    if (totalAmount < FREE_SHIPPING_THRESHOLD) {
      line_items.push({
        price_data: {
          currency: "mdl",
          product_data: {
            name: "Shipping",
          },
          unit_amount: SHIPPING_COST * 100,
        },
        quantity: 1,
      });
    }

    if (!order)
      return createNextResponse(null, "Order not created", false, 400);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      currency: "mdl",
      line_items,
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      metadata: {
        orderId: order.id,
        userId: data.user.id,
      },
    });

    return createNextResponse({ url: session.url }, "Success", true, 200);
  } catch (error) {
    console.error("Checkout error:", error);
    return createNextResponse(null, "Something went wrong", false, 500);
  }
}
