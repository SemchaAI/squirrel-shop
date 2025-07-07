import type { Category, PrismaClient } from "@prisma/client";
import type { TCreateImageForVariants } from "../products";

export default async function seedTSerie(
  prisma: PrismaClient,
  categories: Category[],
  createImageForVariants: TCreateImageForVariants,
) {
  //1.Product + description
  const Xiaomi14T = await prisma.product.create({
    data: {
      title: "Xiaomi 14T",
      categories: {
        connect: categories.map((category) => ({ id: category.id })),
      },
      ProductDescription: {
        createMany: {
          data: [
            { title: "Brand", description: "Xiaomi" },
            { title: "Weight", description: "195g" },
            { title: "Display Type", description: "OLED" },
            { title: "Display Size", description: '6.67"' },
            { title: "Display Resolution", description: "1220 x 2712 pixels" },
            { title: "Display Refresh Rate", description: "144Hz" },
          ],
        },
      },
    },
  });
  //2.Product variants with options
  const Xiaomi14T_12gb_256gb_blue = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-256gb-blue",
      title: "Xiaomi 14T 12GB/256GB Blue",
      sku: "XIA14T-BLU-12/256GB",
      price: 10299,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk947cpiduCyXbLJjZt2Ndi51Kn6sm3YHSuTVpO",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_512gb_blue = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-512gb-blue",
      title: "Xiaomi 14T 12GB/512GB Blue",
      sku: "XIA14T-BLU-12/512GB",
      price: 11999,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk947cpiduCyXbLJjZt2Ndi51Kn6sm3YHSuTVpO",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "512GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_256gb_gray = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-256gb-gray",
      title: "Xiaomi 14T 12GB/256GB Gray",
      sku: "XIA14T-GRY-12/256GB",
      price: 10299,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk9M7gQFennQfqFtB0V4phZS3Usvk67y9jr5J2K",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Gray" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_512gb_gray = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-512gb-gray",
      title: "Xiaomi 14T 12GB/512GB Gray",
      sku: "XIA14T-GRY-12/512GB",
      price: 11999,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk9M7gQFennQfqFtB0V4phZS3Usvk67y9jr5J2K",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Gray" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "512GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_256gb_black = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-256gb-black",
      title: "Xiaomi 14T 12GB/256GB Black",
      sku: "XIA14T-BLK-12/256GB",
      price: 10299,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk99VZautlbs80dW71GpBKERkrqwObfl9ySTaze",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_512gb_black = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-512gb-black",
      title: "Xiaomi 14T 12GB/512GB Black",
      sku: "XIA14T-BLK-12/512GB",
      price: 11999,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk99VZautlbs80dW71GpBKERkrqwObfl9ySTaze",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "512GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_256gb_lemon_green = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-256gb-lemon-green",
      title: "Xiaomi 14T 12GB/256GB Lemon Green",
      sku: "XIA14T-LGN-12/256GB",
      price: 10299,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk9HTb2JF1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "LemonGreen" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "256GB" } },
          },
        ],
      },
    },
  });
  const Xiaomi14T_12gb_512gb_lemon_green = await prisma.productVariants.create({
    data: {
      productId: Xiaomi14T.id,
      slug: "xiaomi-14t-12gb-512gb-lemon-green",
      title: "Xiaomi 14T 12GB/512GB Lemon Green",
      sku: "XIA14T-LGN-12/512GB",
      price: 11999,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk9HTb2JF1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "LemonGreen" } },
          },
          {
            variation: { connect: { name: "RAM" } },
            variationOption: { connect: { value: "12GB" } },
          },
          {
            variation: { connect: { name: "Storage" } },
            variationOption: { connect: { value: "512GB" } },
          },
        ],
      },
    },
  });
  //3.Images
  const Xiaomi14T_lemon_green_VariantIds = [
    Xiaomi14T_12gb_256gb_lemon_green.id,
    Xiaomi14T_12gb_512gb_lemon_green.id,
  ];
  const Xiaomi14T_black_VariantIds = [
    Xiaomi14T_12gb_256gb_black.id,
    Xiaomi14T_12gb_512gb_black.id,
  ];
  const Xiaomi14T_gray_VariantIds = [
    Xiaomi14T_12gb_256gb_gray.id,
    Xiaomi14T_12gb_512gb_gray.id,
  ];
  const Xiaomi14T_blue_VariantIds = [
    Xiaomi14T_12gb_256gb_blue.id,
    Xiaomi14T_12gb_512gb_blue.id,
  ];
  const Xiaomi14T_lemon_green_images = [
    {
      url: "c2LiyIQeZxk9viiyqcbTeiQPDpuY2Jf1MvRBWCmoZgdSGFj7",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9oPAVvtJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk95KukwughyHJGMCivfF2X4l7kQYzZbKt1NRVx",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9oG4jPgJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk91n0NXZ9CvIKdPj5q8Me6flyQaRZu4zXAs3iU",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9zAfZoCzPNRumqOZQaHjwGXk5hl7I91cSnbV6",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9HTb2JF1BZelTOCYxgIW3rD9AVMu1QjEcwm40",
      alt: "Xiaomi 14T Lemon Green",
      variantIds: Xiaomi14T_lemon_green_VariantIds,
    },
  ];
  const Xiaomi14T_black_images = [
    {
      url: "c2LiyIQeZxk9Ju9bJYxy8MpKxvd537kq0P1fW6RwScGiUZJa",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9ewBKxdwNbXECAg91P6aHlr4j0GmRxiFtKV7f",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9nAWEVaoPa2ydcfCKgL1Fpi5Avox6qDVWUQGT",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9tnT8vgi7DncJUwgOem4FN2lZ5PrdiEK9WyBG",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9hITyNqZmrG3l4CeIQXWBsTLK6DA1avkxgpNt",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9YWIWXtRsPG3fqFBVUh5lQAmeZ8dEgHuIRC6n",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk99VZautlbs80dW71GpBKERkrqwObfl9ySTaze",
      alt: "Xiaomi 14T Black",
      variantIds: Xiaomi14T_black_VariantIds,
    },
  ];
  const Xiaomi14T_gray_images = [
    {
      url: "c2LiyIQeZxk9z4vvbKPNRumqOZQaHjwGXk5hl7I91cSnbV6M",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9nQIpMdoPa2ydcfCKgL1Fpi5Avox6qDVWUQGT",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9X7FL1hcyY4bPvfBhG3OK9CAiFtIw8UHmacLQ",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9MFcvyhnnQfqFtB0V4phZS3Usvk67y9jr5J2K",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9hn29AdZmrG3l4CeIQXWBsTLK6DA1avkxgpNt",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9J2TFdYxy8MpKxvd537kq0P1fW6RwScGiUZJa",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9M7gQFennQfqFtB0V4phZS3Usvk67y9jr5J2K",
      alt: "Xiaomi 14T Gray",
      variantIds: Xiaomi14T_gray_VariantIds,
    },
  ];
  const Xiaomi14T_blue_images = [
    {
      url: "c2LiyIQeZxk9zqeHs3PNRumqOZQaHjwGXk5hl7I91cSnbV6M",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9oSdwnnJGVzDHSkMLAtCjF5u6lpbBR48mys3N",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9QUdVjfyYC07Aa4m3OfPRyi2vcqspdleHMtuT",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9BosuQ5U1S0Vqz9FTmYRLrtxy4DIu56pHwkZb",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9aq6Ll1WYM97loCqdeSPWFnwRUEim81pk2zbG",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9Tw2IFOtjXtedOQLFsDPT72pJWv5IAbcK4k9B",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk947cpiduCyXbLJjZt2Ndi51Kn6sm3YHSuTVpO",
      alt: "Xiaomi 14T Blue",
      variantIds: Xiaomi14T_blue_VariantIds,
    },
  ];
  Xiaomi14T_blue_images.forEach((image) => createImageForVariants(image));
  Xiaomi14T_gray_images.forEach((image) => createImageForVariants(image));
  Xiaomi14T_black_images.forEach((image) => createImageForVariants(image));
  Xiaomi14T_lemon_green_images.forEach((image) =>
    createImageForVariants(image),
  );
}
