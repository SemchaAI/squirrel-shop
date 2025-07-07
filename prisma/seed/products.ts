import type { PrismaClient } from "@prisma/client";
import seedPoco from "./products/poco";
import seedPads from "./products/pads";
import seedTSerie from "./products/TSerie";
import seedAccessories from "./products/accessories";
import prisma from "@/prismaClient";

export type TCreateImageForVariants = ({
  url,
  alt,
  variantIds,
}: {
  url: string;
  alt: string;
  variantIds: string[];
}) => Promise<{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  alt: string | null;
  url: string;
}>;

export async function createImageForVariants({
  url,
  alt,
  variantIds,
}: {
  url: string;
  alt: string;
  variantIds: string[];
}) {
  return await prisma.productImage.create({
    data: {
      url,
      alt,
      variants: {
        connect: variantIds.map((id) => ({ id })),
      },
    },
  });
}

export default async function seedProducts(prisma: PrismaClient) {
  // helpers for info
  const smartphoneCategory = await prisma.category.findUnique({
    where: { slug: "smartphones" },
  });
  if (!smartphoneCategory) return;
  const tabletsCategory = await prisma.category.findUnique({
    where: { slug: "tablets" },
  });
  if (!tabletsCategory) return;
  const featuredCategory = await prisma.category.findUnique({
    where: { slug: "featured" },
  });
  if (!featuredCategory) return;
  const accessoriesCategory = await prisma.category.findUnique({
    where: { slug: "accessories" },
  });
  if (!accessoriesCategory) return;

  //ready functions
  await seedPoco(prisma, smartphoneCategory, createImageForVariants);
  await seedPads(prisma, tabletsCategory, createImageForVariants);
  await seedTSerie(
    prisma,
    [smartphoneCategory, featuredCategory],
    createImageForVariants,
  );
  await seedAccessories(prisma, accessoriesCategory);

  //1.Product + description
  const REDMI13C = await prisma.product.create({
    data: {
      title: "Redmi 13C",
      categories: {
        connect: [{ id: smartphoneCategory.id }],
      },
      ProductDescription: {
        createMany: {
          data: [
            { title: "Brand", description: "Xiaomi" },
            { title: "Weight", description: "192g" },
            { title: "Display Type", description: "IPS LCD" },
            { title: "Display Size", description: '6.74"' },
            { title: "Display Resolution", description: "720 x 1600 pixels" },
            { title: "Display Refresh Rate", description: "90Hz" },
          ],
        },
      },
    },
  });
  const IPHONE16 = await prisma.product.create({
    data: {
      title: "iPhone 16",
      categories: {
        connect: [{ id: smartphoneCategory.id }],
      },
      ProductDescription: {
        createMany: {
          data: [
            { title: "Brand", description: "Apple" },
            { title: "Weight", description: "170g" },
            { title: "Display Type", description: "Super Retina XDR OLED" },
            { title: "Display Size", description: '6.1"' },
            { title: "Display Resolution", description: "2556 x 1179 pixels" },
            { title: "Display Refresh Rate", description: "60Hz" },
          ],
        },
      },
    },
  });

  //2.Product variants with options
  const REDMI13C_4GB_128GB_black = await prisma.productVariants.create({
    data: {
      productId: REDMI13C.id,
      slug: "redmi-13c-4gb-128gb-black",
      title: "Redmi 13C 4GB/128GB Black",
      sku: "REDMI13C-BLK-4/128GB",
      price: 2399,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9o5rykcJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "4GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "128GB" } },
          },
        ],
      },
    },
  });
  const REDMI13C_4GB_256GB_black = await prisma.productVariants.create({
    data: {
      productId: REDMI13C.id,
      slug: "redmi-13c-4gb-256gb-black",
      title: "Redmi 13C 4GB/256GB Black",
      sku: "REDMI13C-BLK-4/256GB",
      price: 3499,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9o5rykcJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "4GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const REDMI13C_4GB_128GB_green = await prisma.productVariants.create({
    data: {
      productId: REDMI13C.id,
      slug: "redmi-13c-4gb-128gb-green",
      title: "Redmi 13C 4GB/128GB Green",
      sku: "REDMI13C-GRN-4/128GB",
      price: 2399,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9jv0AjQMuRyd1ZMFDxmlno3246rNPab7zYkfw",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Green" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "4GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "128GB" } },
          },
        ],
      },
    },
  });
  const REDMI13C_4GB_256GB_green = await prisma.productVariants.create({
    data: {
      productId: REDMI13C.id,
      slug: "redmi-13c-4gb-256gb-green",
      title: "Redmi 13C 4GB/256GB Green",
      sku: "REDMI13C-GRN-4/256GB",
      price: 3499,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9jv0AjQMuRyd1ZMFDxmlno3246rNPab7zYkfw",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Green" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "4GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const REDMI13C_4GB_128GB_blue = await prisma.productVariants.create({
    data: {
      productId: REDMI13C.id,
      slug: "redmi-13c-4gb-128gb-blue",
      title: "Redmi 13C 4GB/128GB Blue",
      sku: "REDMI13C-BLU-4/128GB",
      price: 2399,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9eZ1dFaNbXECAg91P6aHlr4j0GmRxiFtKV7fh",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "4GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "128GB" } },
          },
        ],
      },
    },
  });
  const REDMI13C_4GB_256GB_blue = await prisma.productVariants.create({
    data: {
      productId: REDMI13C.id,
      slug: "redmi-13c-4gb-256gb-blue",
      title: "Redmi 13C 4GB/256GB Blue",
      sku: "REDMI13C-BLU-4/256GB",
      price: 3499,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9eZ1dFaNbXECAg91P6aHlr4j0GmRxiFtKV7fh",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "4GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });

  const IPHONE16_8gb_128gb_blue = await prisma.productVariants.create({
    data: {
      productId: IPHONE16.id,
      slug: "iphone-16-8gb-128gb-blue",
      title: "iPhone 16 8GB/128GB Blue",
      sku: "IPHONE16-BLU-8/128GB",
      price: 19999,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9HiyBWd1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
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
  const IPHONE16_8gb_256gb_blue = await prisma.productVariants.create({
    data: {
      productId: IPHONE16.id,
      slug: "iphone-16-8gb-256gb-blue",
      title: "iPhone 16 8GB/256GB Blue",
      sku: "IPHONE16-BLU-8/256GB",
      price: 22699,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9HiyBWd1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
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
  const IPHONE16_8gb_512gb_blue = await prisma.productVariants.create({
    data: {
      productId: IPHONE16.id,
      slug: "iphone-16-8gb-512gb-blue",
      title: "iPhone 16 8GB/512GB Blue",
      sku: "IPHONE16-BLU-8/512GB",
      price: 24999,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9HiyBWd1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "8GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "512GB" } },
          },
        ],
      },
    },
  });
  //----------------3 product images-----------------//
  //------
  const REDMI13C_black_VariantIds = [
    REDMI13C_4GB_128GB_black.id,
    REDMI13C_4GB_256GB_black.id,
  ];
  const REDMI13C_green_VariantIds = [
    REDMI13C_4GB_128GB_green.id,
    REDMI13C_4GB_256GB_green.id,
  ];
  const REDMI13C_blue_VariantIds = [
    REDMI13C_4GB_128GB_blue.id,
    REDMI13C_4GB_256GB_blue.id,
  ];
  const REDMI13C_black_images = [
    {
      url: "c2LiyIQeZxk9TFespCtjXtedOQLFsDPT72pJWv5IAbcK4k9B",
      alt: "Redmi 13C Black",
      variantIds: REDMI13C_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9M9edhtnnQfqFtB0V4phZS3Usvk67y9jr5J2K",
      alt: "Redmi 13C Black",
      variantIds: REDMI13C_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9xFXYZRerQYdwZOPo3x2nzKa6bANDyCkUISLV",
      alt: "Redmi 13C Black",
      variantIds: REDMI13C_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9o5rykcJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      alt: "Redmi 13C Black",
      variantIds: REDMI13C_black_VariantIds,
    },
  ];
  const REDMI13C_green_images = [
    {
      url: "c2LiyIQeZxk9sPqtPUr8mT8ZUoSrKHJQ1O734L2f6EDaFMRc",
      alt: "Redmi 13C Green",
      variantIds: REDMI13C_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk91C4uNW9CvIKdPj5q8Me6flyQaRZu4zXAs3iU",
      alt: "Redmi 13C Green",
      variantIds: REDMI13C_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9knwT9QmjeH3lvY0OIAKSdrRZ4m7Lt8ouyqcz",
      alt: "Redmi 13C Green",
      variantIds: REDMI13C_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9jv0AjQMuRyd1ZMFDxmlno3246rNPab7zYkfw",
      alt: "Redmi 13C Green",
      variantIds: REDMI13C_green_VariantIds,
    },
  ];
  const REDMI13C_blue_images = [
    {
      url: "c2LiyIQeZxk9cHZ0NJQeZxk9sGJn2YhruIWjTo7VzwmESDA1",
      alt: "Redmi 13C Blue",
      variantIds: REDMI13C_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9zoB6T2PNRumqOZQaHjwGXk5hl7I91cSnbV6M",
      alt: "Redmi 13C Blue",
      variantIds: REDMI13C_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9HrDRNn1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      alt: "Redmi 13C Blue",
      variantIds: REDMI13C_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9eZ1dFaNbXECAg91P6aHlr4j0GmRxiFtKV7fh",
      alt: "Redmi 13C Blue",
      variantIds: REDMI13C_blue_VariantIds,
    },
  ];
  REDMI13C_black_images.forEach((image) => createImageForVariants(image));
  REDMI13C_green_images.forEach((image) => createImageForVariants(image));
  REDMI13C_blue_images.forEach((image) => createImageForVariants(image));
  //------
  const IPHONE16_blue_VariantIds = [
    IPHONE16_8gb_128gb_blue.id,
    IPHONE16_8gb_256gb_blue.id,
    IPHONE16_8gb_512gb_blue.id,
  ];
  const IPHONE16_blue_images = [
    {
      url: "c2LiyIQeZxk9vwhBguTeiQPDpuY2Jf1MvRBWCmoZgdSGFj7O",
      alt: "Iphone 16 Blue",
      variantIds: IPHONE16_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk97RmNYd3UnY8EX3ImWcrphPfwKA47kd0zyFie",
      alt: "Iphone 16 Blue",
      variantIds: IPHONE16_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9ooWnsfJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      alt: "Iphone 16 Blue",
      variantIds: IPHONE16_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9qzZUjYfZinU0ubmlgXd9RwO7W54JpczLhDvE",
      alt: "Iphone 16 Blue",
      variantIds: IPHONE16_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9MpTpGCnnQfqFtB0V4phZS3Usvk67y9jr5J2K",
      alt: "Iphone 16 Blue",
      variantIds: IPHONE16_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9HiyBWd1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      alt: "Iphone 16 Blue",
      variantIds: IPHONE16_blue_VariantIds,
    },
  ];
  IPHONE16_blue_images.forEach((image) => createImageForVariants(image));

  // await createImageForVariants({
  //   url: "c2LiyIQeZxk9J1kz6Lxy8MpKxvd537kq0P1fW6RwScGiUZJa",
  //   alt: "Poco X6 Black",
  //   variantIds: POCOX6_black_VariantIds,
  // });
  console.log("✅ Products and variants seeded");
}
