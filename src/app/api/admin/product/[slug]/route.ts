import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";

import type { IRedactProductReq } from "@/models/requests";

export async function GET(
  req: NextRequest,
  {
    params,
  }: Readonly<{
    params: Promise<{ slug: string }>;
  }>,
) {
  const { slug } = await params;
  const product = await prisma.productVariants.findUnique({
    where: { slug },
    include: { product: true, images: true, options: true },
  });
  if (!product) return NextResponse.json(null, { status: 404 });
  //  return createNextResponse(null, "Product not found", false, 404);
  return NextResponse.json(product);
}
export async function PUT(
  req: NextRequest,
  {
    params,
  }: Readonly<{
    params: Promise<{ slug: string }>;
  }>,
) {
  const { slug } = await params;
  const data = (await req.json()) as IRedactProductReq;
  const existing = await prisma.productVariants.findUnique({
    where: { slug },
    include: {
      product: {
        include: {
          categories: true,
        },
      },
      images: true,
      options: true,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Product variant not found" },
      { status: 404 },
    );
  }

  const existingCategoryIds =
    existing.product.categories.map((c) => c.id) ?? [];
  const newCategoryIds = data.categories;

  const categoriesToConnect = newCategoryIds.filter(
    (id) => !existingCategoryIds.includes(id),
  );
  const categoriesToDisconnect = existingCategoryIds.filter(
    (id) => !newCategoryIds.includes(id),
  );

  const updated = await prisma.productVariants.update({
    where: { slug },
    data: {
      previousPrice: data.previousPrice,
      price: data.price,
      title: data.title,
      seoTitle: data.seoTitle,
      sku: data.sku,
      stock: data.stock,
      visible: data.visible,
      product: {
        update: {
          categories: {
            connect: categoriesToConnect.map((id) => ({ id })),
            disconnect: categoriesToDisconnect.map((id) => ({ id })),
          },
        },
      },
    },
  });

  return NextResponse.json(updated);
}
