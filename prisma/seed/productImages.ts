import prisma from "@/prismaClient";
import type { ProductVariants } from "@prisma/client";

export async function ProductImagesInit(variant: ProductVariants) {
  await Promise.all([
    prisma.productImage.upsert({
      where: { url: "./static/images/placeholder.webp" },
      update: {},
      create: {
        url: "./static/images/placeholder.webp",
        alt: "T-Shirt",
        variants: { connect: { id: variant.id } },
      },
    }),
    prisma.productImage.upsert({
      where: { url: "./static/images/placeholder.webp?thumb=1" },
      update: {},
      create: {
        url: "./static/images/placeholder.webp?thumb=1",
        alt: "T-Shirt Thumb",
        variants: { connect: { id: variant.id } },
      },
    }),
  ]);
}
