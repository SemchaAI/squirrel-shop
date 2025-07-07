import { type Category, PrismaClient } from "@prisma/client";
import type { TCreateImageForVariants } from "../products";

export default async function seedPads(
  prisma: PrismaClient,
  tabletsCategory: Category,
  createImageForVariants: TCreateImageForVariants,
) {
  //1.Product + description
  const PAD6 = await prisma.product.create({
    data: {
      title: "Xiaomi Pad 6",
      categories: {
        connect: [{ id: tabletsCategory.id }],
      },
      ProductDescription: {
        createMany: {
          data: [
            { title: "Brand", description: "Xiaomi" },
            { title: "Weight", description: "490g" },
            { title: "Display Type", description: "IPS LCD" },
            { title: "Display Size", description: '11"' },
            { title: "Display Resolution", description: "1800 x 2880 pixels" },
            { title: "Display Refresh Rate", description: "144Hz" },
          ],
        },
      },
    },
  });
  //2.Product variants with options
  const PAD6_8gb_128gb_gray = await prisma.productVariants.create({
    data: {
      productId: PAD6.id,
      slug: "pad6-8gb-128gb-gray",
      title: "Pad 6 8GB/128GB Gray",
      sku: "PAD6-GRY-8/128GB",
      price: 8099,
      previousPrice: 6999,
      stock: 2,
      visible: true,
      previewImage: "c2LiyIQeZxk9nMhDV0oPa2ydcfCKgL1Fpi5Avox6qDVWUQGT",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Gray" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "8GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "128GB" } },
          },
        ],
      },
    },
  });
  const PAD6_8gb_256gb_gray = await prisma.productVariants.create({
    data: {
      productId: PAD6.id,
      slug: "pad6-8gb-256gb-gray",
      title: "Pad 6 8GB/256GB Gray",
      sku: "PAD6-GRY-8/256GB",
      price: 8999,
      previousPrice: 7999,
      stock: 2,
      visible: true,
      previewImage: "c2LiyIQeZxk9nMhDV0oPa2ydcfCKgL1Fpi5Avox6qDVWUQGT",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Gray" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "8GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const PAD6_8gb_256gb_gold = await prisma.productVariants.create({
    data: {
      productId: PAD6.id,
      slug: "pad6-8gb-256gb-gold",
      title: "Pad 6 8GB/256GB Gold",
      sku: "PAD6-GOL-8/256GB",
      price: 8999,
      previousPrice: 7999,
      stock: 2,
      visible: true,
      previewImage: "c2LiyIQeZxk909lCreO5wsqKvzYDRiQGZmjMadfyoJBLUETc",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Gold" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "8GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  //3.Images
  const PAD6_gray_VariantIds = [PAD6_8gb_128gb_gray.id, PAD6_8gb_256gb_gray.id];
  const PAD6_gold_VariantIds = [PAD6_8gb_256gb_gold.id];

  const PAD6_gray_images = [
    {
      url: "c2LiyIQeZxk9kneUN6rjeH3lvY0OIAKSdrRZ4m7Lt8ouyqcz",
      alt: "Pad 6 Gray",
      variantIds: PAD6_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9kS6d05jeH3lvY0OIAKSdrRZ4m7Lt8ouyqczg",
      alt: "Pad 6 Gray",
      variantIds: PAD6_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9iJW8JLpHu6pqdbPcl87BWXz3giCf5VOSDYjJ",
      alt: "Pad 6 Gray",
      variantIds: PAD6_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9nMhDV0oPa2ydcfCKgL1Fpi5Avox6qDVWUQGT",
      alt: "Pad 6 Gray",
      variantIds: PAD6_gray_VariantIds,
    },
  ];
  const PAD6_gold_images = [
    {
      url: "c2LiyIQeZxk9mcEAVB7NM2vAfxRmB5X9ydPjso0gQwbVhF1z",
      alt: "Pad 6 Gold",
      variantIds: PAD6_gold_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9dcHIdV2wLW1abyHlgMvcuz6FnERAeGfTUiSB",
      alt: "Pad 6 Gold",
      variantIds: PAD6_gold_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9r3WJOvKmc4sivGrPSxTWlZ0gonu8V7CIkX95",
      alt: "Pad 6 Gold",
      variantIds: PAD6_gold_VariantIds,
    },
    {
      url: "c2LiyIQeZxk909lCreO5wsqKvzYDRiQGZmjMadfyoJBLUETc",
      alt: "Pad 6 Gold",
      variantIds: PAD6_gold_VariantIds,
    },
  ];

  PAD6_gray_images.forEach((image) => createImageForVariants(image));
  PAD6_gold_images.forEach((image) => createImageForVariants(image));
}
