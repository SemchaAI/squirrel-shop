import { type Category, PrismaClient } from "@prisma/client";
import type { TCreateImageForVariants } from "../products";

export default async function seedPoco(
  prisma: PrismaClient,
  smartphoneCategory: Category,
  createImageForVariants: TCreateImageForVariants,
) {
  //1.Product + description
  const POCOX6 = await prisma.product.create({
    data: {
      title: "Xiaomi Poco X6",
      categories: {
        connect: [{ id: smartphoneCategory.id }],
      },
      ProductDescription: {
        createMany: {
          data: [
            { title: "Brand", description: "Xiaomi" },
            { title: "Weight", description: "181g" },
            { title: "Display Type", description: "Amoled" },
            { title: "Display Size", description: '6.74"' },
            { title: "Display Resolution", description: "2712 x 1220 pixels" },
            { title: "Display Refresh Rate", description: "120Hz" },
          ],
        },
      },
    },
  });
  const POCOC65 = await prisma.product.create({
    data: {
      title: "Xiaomi Poco C65",
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
  //2.Product variants with options
  const POCOX6_8gb_256gb_black = await prisma.productVariants.create({
    data: {
      productId: POCOX6.id,
      slug: "poco-x6-8gb-256gb-black",
      title: "Poco X6 8GB/256GB Black",
      sku: "POCOX6-BLK-8/256GB",
      price: 6099,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9yK9aOoBU1AriDJaETwj8KdPqmekRYn6hZSoX",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
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
  const POCOX6_8gb_512gb_black = await prisma.productVariants.create({
    data: {
      productId: POCOX6.id,
      slug: "poco-x6-8gb-512gb-black",
      title: "Poco X6 8GB/512GB Black",
      sku: "POCOX6-BLK-8/512GB",
      price: 6999,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9yK9aOoBU1AriDJaETwj8KdPqmekRYn6hZSoX",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
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
  const POCOX6_12gb_512gb_black = await prisma.productVariants.create({
    data: {
      productId: POCOX6.id,
      slug: "poco-x6-12gb-512gb-black",
      title: "Poco X6 12GB/512GB Black",
      sku: "POCOX6-BLK-12/512GB",
      price: 7999,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9yK9aOoBU1AriDJaETwj8KdPqmekRYn6hZSoX",
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
  const POCOX6_12gb_1TB_black = await prisma.productVariants.create({
    data: {
      productId: POCOX6.id,
      slug: "poco-x6-12gb-1tb-black",
      title: "Poco X6 12GB/1TB Black",
      sku: "POCOX6-BLK-12/1TB",
      price: 8999,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9yK9aOoBU1AriDJaETwj8KdPqmekRYn6hZSoX",
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
            variationOption: { connect: { value: "1TB" } },
          },
        ],
      },
    },
  });

  const POCOC65_8gb_128gb_black = await prisma.productVariants.create({
    data: {
      productId: POCOC65.id,
      slug: "poco-c65-8gb-128gb-black",
      title: "Poco C65 8GB/128GB Black",
      sku: "POCOC65-BLK-8/128GB",
      price: 3099,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9Nl1qDDd7SCtIDplP3F8wAR56f1TVn9McYBdL",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
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
  const POCOC65_8gb_256gb_black = await prisma.productVariants.create({
    data: {
      productId: POCOC65.id,
      slug: "poco-c65-8gb-256gb-black",
      title: "Poco C65 8GB/256GB Black",
      sku: "POCOC65-BLK-8/256GB",
      price: 3499,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9Nl1qDDd7SCtIDplP3F8wAR56f1TVn9McYBdL",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
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
  const POCOC65_8gb_128gb_blue = await prisma.productVariants.create({
    data: {
      productId: POCOC65.id,
      slug: "poco-c65-8gb-128gb-blue",
      title: "Poco C65 8GB/128GB Blue",
      sku: "POCOC65-BLU-8/128GB",
      price: 3099,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9ulekTlLLDovfsqBmIAXw7U51nTxV8gcGhPM6",
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
  const POCOC65_8gb_256gb_blue = await prisma.productVariants.create({
    data: {
      productId: POCOC65.id,
      slug: "poco-c65-8gb-256gb-blue",
      title: "Poco C65 8GB/256GB Blue",
      sku: "POCOC65-BLU-8/256GB",
      price: 3499,
      stock: 5,
      visible: true,
      previewImage: "c2LiyIQeZxk9ulekTlLLDovfsqBmIAXw7U51nTxV8gcGhPM6",
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

  const POCOX6_black_VariantIds = [
    POCOX6_8gb_256gb_black.id,
    POCOX6_8gb_512gb_black.id,
    POCOX6_12gb_512gb_black.id,
    POCOX6_12gb_1TB_black.id,
  ];
  const POCOX6_black_images = [
    {
      url: "c2LiyIQeZxk9JZ8maDxy8MpKxvd537kq0P1fW6RwScGiUZJa",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9J1kz6Lxy8MpKxvd537kq0P1fW6RwScGiUZJa",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9MFmPdLnnQfqFtB0V4phZS3Usvk67y9jr5J2K",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9B1h1xxkU1S0Vqz9FTmYRLrtxy4DIu56pHwkZ",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9xCwtAcerQYdwZOPo3x2nzKa6bANDyCkUISLV",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9tx81r0i7DncJUwgOem4FN2lZ5PrdiEK9WyBG",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9RZEwrfZ5L2rDA8hMU13s5pSedxcbofG9KRQZ",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9yK9aOoBU1AriDJaETwj8KdPqmekRYn6hZSoX",
      alt: "Poco X6 Black",
      variantIds: POCOX6_black_VariantIds,
    },
  ];
  POCOX6_black_images.forEach((image) => createImageForVariants(image));
  //------
  const POCOC65_black_VariantIds = [
    POCOC65_8gb_128gb_black.id,
    POCOC65_8gb_256gb_black.id,
  ];
  const POCOC65_blue_VariantIds = [
    POCOC65_8gb_128gb_blue.id,
    POCOC65_8gb_256gb_blue.id,
  ];
  const POCOC65_black_images = [
    {
      url: "c2LiyIQeZxk9qGgQVNofZinU0ubmlgXd9RwO7W54JpczLhDv",
      alt: "Poco C65 Black",
      variantIds: POCOC65_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk91soB2O9CvIKdPj5q8Me6flyQaRZu4zXAs3iU",
      alt: "Poco C65 Black",
      variantIds: POCOC65_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9nxNc54voPa2ydcfCKgL1Fpi5Avox6qDVWUQG",
      alt: "Poco C65 Black",
      variantIds: POCOC65_black_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9Nl1qDDd7SCtIDplP3F8wAR56f1TVn9McYBdL",
      alt: "Poco C65 Black",
      variantIds: POCOC65_black_VariantIds,
    },
  ];
  POCOC65_black_images.forEach((image) => createImageForVariants(image));
  const POCOC65_blue_images = [
    {
      url: "c2LiyIQeZxk9YBcjx1RsPG3fqFBVUh5lQAmeZ8dEgHuIRC6n",
      alt: "Poco C65 Blue",
      variantIds: POCOC65_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk94vsMnGtuCyXbLJjZt2Ndi51Kn6sm3YHSuTVp",
      alt: "Poco C65 Blue",
      variantIds: POCOC65_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk94h9TD5uCyXbLJjZt2Ndi51Kn6sm3YHSuTVpO",
      alt: "Poco C65 Blue",
      variantIds: POCOC65_blue_VariantIds,
    },
    {
      url: "c2LiyIQeZxk9ulekTlLLDovfsqBmIAXw7U51nTxV8gcGhPM6",
      alt: "Poco C65 Blue",
      variantIds: POCOC65_blue_VariantIds,
    },
  ];
  POCOC65_blue_images.forEach((image) => createImageForVariants(image));
}
