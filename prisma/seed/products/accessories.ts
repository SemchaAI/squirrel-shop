import { type Category, PrismaClient } from "@prisma/client";
import { createImageForVariants } from "../products";
// import type { TCreateImageForVariants } from "../products";
export default async function seedAccessories(
  prisma: PrismaClient,
  accessoriesCategory: Category,
  // createImageForVariants: TCreateImageForVariants,
) {
  //1.Product + description
  const Mi_POWER_BANK_20K = await prisma.product.create({
    data: {
      title: "Mi Power Bank 20000mah",
      categories: {
        connect: [{ id: accessoriesCategory.id }],
      },
    },
  });
  const Mi_POWER_BANK_10K = await prisma.product.create({
    data: {
      title: "Mi Power Bank 10000mah",
      categories: {
        connect: [{ id: accessoriesCategory.id }],
      },
    },
  });
  const Mi_SMART_SPEAKER = await prisma.product.create({
    data: {
      title: "Mi Smart Speaker with ir control",
      categories: {
        connect: [{ id: accessoriesCategory.id }],
      },
    },
  });
  const Mi_BUDS_5 = await prisma.product.create({
    data: {
      title: "Mi buds 5",
      categories: {
        connect: [{ id: accessoriesCategory.id }],
      },
    },
  });
  const Mi_BUDS_5_PRO = await prisma.product.create({
    data: {
      title: "Mi buds 5 pro",
      categories: {
        connect: [{ id: accessoriesCategory.id }],
      },
    },
  });

  const Mi_POWER_BANK_20K_VARIANT1 = await prisma.productVariants.create({
    data: {
      productId: Mi_POWER_BANK_20K.id,
      slug: "mi-power-bank-20000mah",
      title: "Mi Power Bank 20000mah",
      sku: "MI-PB-20000MAH",
      price: 1499,
      previousPrice: 1299.99,
      stock: 10,
      visible: true,
      previewImage: "c2LiyIQeZxk9jhPyDVMuRyd1ZMFDxmlno3246rNPab7zYkfw",
    },
  });
  const Mi_POWER_BANK_20K_Ids = [Mi_POWER_BANK_20K_VARIANT1.id];
  const Mi_POWER_BANK_20K__images = [
    {
      url: "c2LiyIQeZxk9jhPyDVMuRyd1ZMFDxmlno3246rNPab7zYkfw",
      alt: "Mi Power Bank 20000mah",
      variantIds: Mi_POWER_BANK_20K_Ids,
    },
  ];
  Mi_POWER_BANK_20K__images.forEach((image) => createImageForVariants(image));

  const Mi_POWER_BANK_10K_Silver = await prisma.productVariants.create({
    data: {
      productId: Mi_POWER_BANK_10K.id,
      slug: "mi-3-silver-power-bank-10000mah",
      title: "Mi 3 Power Bank 10000mah",
      sku: "MI-PB-10000MAH",
      price: 399,
      stock: 3,
      visible: true,
      previewImage: "c2LiyIQeZxk9wMfxGhXtQErTylSsjOWInL7vRFmgk45UKG8X",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Silver" } },
          },
        ],
      },
    },
  });
  const Mi_POWER_BANK_10K_Silver_Ids = [Mi_POWER_BANK_10K_Silver.id];
  const Mi_POWER_BANK_10K_Silver__images = [
    {
      url: "c2LiyIQeZxk9wMfxGhXtQErTylSsjOWInL7vRFmgk45UKG8X",
      alt: "Mi 3 Power Bank 10000mah Silver",
      variantIds: Mi_POWER_BANK_10K_Silver_Ids,
    },
  ];
  Mi_POWER_BANK_10K_Silver__images.forEach((image) =>
    createImageForVariants(image),
  );

  const Mi_SMART_SPEAKER_Black = await prisma.productVariants.create({
    data: {
      productId: Mi_SMART_SPEAKER.id,
      slug: "mi-smart-speaker-ir-control",
      title: "Mi Smart Speaker with ir control",
      sku: "MI-IRC-SPEAKER",
      price: 799,
      stock: 2,
      visible: true,
      previewImage: "c2LiyIQeZxk9p3W3QoakzPMHdypIquo3XiDb19nsOFQNThxS",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
          },
        ],
      },
    },
  });
  const Mi_SMART_SPEAKER_Black_Ids = [Mi_SMART_SPEAKER_Black.id];
  const Mi_SMART_SPEAKER_Black__images = [
    {
      url: "c2LiyIQeZxk9p3W3QoakzPMHdypIquo3XiDb19nsOFQNThxS",
      alt: "Mi Smart Speaker with ir control Black",
      variantIds: Mi_SMART_SPEAKER_Black_Ids,
    },
  ];
  Mi_SMART_SPEAKER_Black__images.forEach((image) =>
    createImageForVariants(image),
  );

  const Mi_BUDS_5_Black = await prisma.productVariants.create({
    data: {
      productId: Mi_BUDS_5.id,
      slug: "mi-buds-5-black",
      title: "Buds 5 black",
      sku: "MI-BUDS-5",
      price: 1999,
      previousPrice: 1699.99,
      stock: 2,
      visible: true,
      previewImage: "c2LiyIQeZxk99NfVXvbs80dW71GpBKERkrqwObfl9ySTazeu",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Black" } },
          },
        ],
      },
    },
  });
  const Mi_BUDS_5_Black_Ids = [Mi_BUDS_5_Black.id];
  const Mi_BUDS_5_Black__images = [
    {
      url: "c2LiyIQeZxk99NfVXvbs80dW71GpBKERkrqwObfl9ySTazeu",
      alt: "Buds 5 black",
      variantIds: Mi_BUDS_5_Black_Ids,
    },
  ];
  Mi_BUDS_5_Black__images.forEach((image) => createImageForVariants(image));

  const Mi_BUDS_5_Sky = await prisma.productVariants.create({
    data: {
      productId: Mi_BUDS_5.id,
      slug: "mi-buds-5-sky-blue",
      title: "Redmi Buds 5 Sky Blue",
      sku: "MI-BUDS-5-SKY-BLUE",
      price: 1999,
      previousPrice: 699.99,
      stock: 1,
      visible: true,
      previewImage: "c2LiyIQeZxk9Zpi33iKy7wLRH6FidQeNWP915lbVEM3og4Tp",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Blue" } },
          },
        ],
      },
    },
  });
  const Mi_BUDS_5_Sky_Ids = [Mi_BUDS_5_Sky.id];
  const Mi_BUDS_5_Sky__images = [
    {
      url: "c2LiyIQeZxk9Zpi33iKy7wLRH6FidQeNWP915lbVEM3og4Tp",
      alt: "Buds 5 black",
      variantIds: Mi_BUDS_5_Sky_Ids,
    },
  ];
  Mi_BUDS_5_Sky__images.forEach((image) => createImageForVariants(image));

  const Mi_BUDS_5_PRO_Purple = await prisma.productVariants.create({
    data: {
      productId: Mi_BUDS_5_PRO.id,
      slug: "mi-buds-5-pro-aurora-purple",
      title: "Redmi Buds 5 Pro Aurora Purple",
      sku: "MI-BUDS-5-PRO-PURPLE",
      price: 1599,
      previousPrice: 1499.99,
      stock: 1,
      visible: true,
      previewImage: "c2LiyIQeZxk9k8R628jeH3lvY0OIAKSdrRZ4m7Lt8ouyqczg",
      options: {
        create: [
          {
            variation: { connect: { name: "Color" } },
            variationOption: { connect: { value: "Purple" } },
          },
        ],
      },
    },
  });
  const Mi_BUDS_5_PRO_Purple_Ids = [Mi_BUDS_5_PRO_Purple.id];
  const Mi_BUDS_5_PRO_Purple__images = [
    {
      url: "c2LiyIQeZxk9k8R628jeH3lvY0OIAKSdrRZ4m7Lt8ouyqczg",
      alt: "Buds 5 black",
      variantIds: Mi_BUDS_5_PRO_Purple_Ids,
    },
  ];
  Mi_BUDS_5_PRO_Purple__images.forEach((image) =>
    createImageForVariants(image),
  );
}
