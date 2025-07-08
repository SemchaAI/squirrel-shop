"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/prismaClient";

import { ADMIN_ROUTES } from "@/utils/config";
import { createResponse } from "@/utils/helpers";
import { utapi } from "@/utils/utapi";
import { ProductImage } from "@prisma/client";

import type {
  TCreateProductVariantSchema,
  TProductDescriptionSchema,
  TProductOptionsSchema,
} from "@/utils/config";

export const SwitchPreviewImage = async (id: string, url: string) => {
  try {
    const product = await prisma.productVariants.findUnique({ where: { id } });
    if (!product) return createResponse(null, "Product not found", false);
    const productImage = await prisma.productImage.findUnique({
      where: { url },
    });
    if (!productImage) return createResponse(null, "Image not found", false);

    // Update product
    await prisma.productVariants.update({
      where: { id },
      data: { previewImage: productImage.url },
    });
    // if (product.previewImage) {
    //   await prisma.productImage.update({
    //     where: { url: product.previewImage },
    //     data: { url },
    //   });
    // }

    return createResponse(null, "Product image updated", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
export const SetProductImages = async (id: string, images: ProductImage[]) => {
  console.log("id", id);

  try {
    const current = await prisma.productVariants.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!current) return createResponse(null, "Product not found", false);

    const existingUrls = current.images.map((img) => img.url);
    const newImages = images.filter((img) => !existingUrls.includes(img.url));

    if (newImages.length === 0)
      return createResponse(null, "No new images", false);
    // Update product

    const imagesToConnect = await prisma.productImage.findMany({
      where: {
        url: {
          in: newImages.map((img) => img.url),
        },
      },
    });
    await prisma.productVariants.update({
      where: { id },
      data: {
        images: {
          connect: imagesToConnect.map((img) => ({ id: img.id })),
        },
      },
    });

    return createResponse(null, "Product images updated", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
export const DeleteProductImage = async (id: string, url: string) => {
  try {
    const product = await prisma.productVariants.findUnique({ where: { id } });
    if (!product) return createResponse(null, "Product not found", false);
    const productImage = await prisma.productImage.findUnique({
      where: { url },
    });
    if (!productImage) return createResponse(null, "Image not found", false);

    // Update product
    await prisma.productVariants.update({
      where: { id },
      data: {
        images: {
          disconnect: [{ id: productImage.id }],
        },
      },
    });
    // Check if image is used in any other variant
    const otherUses = await prisma.productVariants.findFirst({
      where: {
        images: {
          some: {
            id: productImage.id,
          },
        },
      },
    });
    let msg = "Product image deleted";
    if (!otherUses) {
      await prisma.productImage.delete({
        where: { id: productImage.id },
      });

      try {
        utapi.deleteFiles(productImage.url);
        msg = "Product image fully deleted";
      } catch (err) {
        console.error("Failed to delete from Uploadthing", err);
      }
    }

    return createResponse(null, msg, true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};

export const CreateProduct = async (title: string) => {
  try {
    const isExist = await prisma.product.findUnique({ where: { title } });
    if (isExist) return createResponse(null, "Product already exists", false);
    const product = await prisma.product.create({ data: { title } });
    revalidatePath(ADMIN_ROUTES.ADMIN);
    return createResponse(product, "Product created", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
export const DeleteProduct = async (id: string) => {
  try {
    const isExist = await prisma.product.findUnique({ where: { id } });
    if (!isExist) return createResponse(null, "Product does not exist", false);
    const product = await prisma.product.delete({ where: { id } });
    revalidatePath(ADMIN_ROUTES.ADMIN);
    return createResponse(product, "Product deleted", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};

export const ModifyProductDescription = async (
  id: string,
  data: TProductDescriptionSchema,
) => {
  try {
    const isExist = await prisma.product.findUnique({
      where: { id },
      include: { ProductDescription: true },
    });
    if (!isExist) return createResponse(null, "Product does not exist", false);

    const receivedIds = data.info
      .map((item) => item.id)
      .filter((id) => id !== undefined);

    await prisma.productDescription.deleteMany({
      where: {
        productId: id,
        id: {
          notIn: receivedIds,
        },
      },
    });

    // Store updated/created IDs
    for (const item of data.info) {
      if (item.id) {
        await prisma.productDescription.update({
          where: { id: item.id },
          data: { title: item.title, description: item.description },
        });
      } else {
        await prisma.productDescription.create({
          data: {
            title: item.title,
            description: item.description,
            product: { connect: { id } },
          },
        });
      }
    }

    revalidatePath(ADMIN_ROUTES.ADMIN);
    return createResponse(null, "Product Description updated", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};

export const CreateProductVariant = async (
  data: TCreateProductVariantSchema,
  id: string,
) => {
  try {
    const isExist = await prisma.productVariants.findUnique({
      where: { slug: data.slug },
    });
    if (isExist)
      return createResponse(null, "Product variant already exists", false);
    const product = await prisma.productVariants.create({
      data: {
        slug: data.slug,
        title: data.title,
        seoTitle: data.seoTitle ? data.seoTitle : null,
        sku: data.sku,
        price: data.price,
        previousPrice: data.previousPrice ? data.previousPrice : null,
        stock: data.stock,
        product: {
          connect: { id },
        },
      },
    });
    revalidatePath(ADMIN_ROUTES.ADMIN);
    return createResponse(product, "Product created", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
export const DeleteProductVariant = async (id: string) => {
  try {
    const isExist = await prisma.productVariants.findUnique({ where: { id } });
    if (!isExist)
      return createResponse(null, "Product Variant does not exist", false);
    const product = await prisma.productVariants.delete({ where: { id } });
    revalidatePath(ADMIN_ROUTES.ADMIN);
    return createResponse(product, "Product deleted", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};

export const CreateVariantOption = async (
  data: TProductOptionsSchema,
  id: string,
) => {
  try {
    const isDuplicate = await prisma.productVariantsOptions.findUnique({
      where: {
        variationName_variationOptionValue_productVariantId: {
          productVariantId: id,
          variationName: data.label,
          variationOptionValue: data.value,
        },
      },
    });
    if (isDuplicate)
      return createResponse(null, "This variant option already exists", false);

    const isSameType = await prisma.productVariantsOptions.findMany({
      where: {
        AND: [{ variationName: data.label }, { productVariantId: id }],
      },
    });
    if (isSameType.length > 0) {
      await prisma.productVariantsOptions.deleteMany({
        where: {
          variationName: data.label,
          productVariantId: id,
        },
      });
    }
    const created = await prisma.productVariantsOptions.create({
      data: {
        variationName: data.label,
        variationOptionValue: data.value,
        productVariantId: id,
      },
      include: { productVariant: true },
    });

    revalidatePath(`${ADMIN_ROUTES.PRODUCT}/${created.productVariant.slug}`);
    return createResponse(null, "Product created", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
export const DeleteVariantOption = async (id: string, slug: string) => {
  try {
    const isExist = await prisma.productVariantsOptions.findUnique({
      where: { id },
    });
    if (!isExist)
      return createResponse(
        null,
        "Product Variant Option does not exist",
        false,
      );
    const product = await prisma.productVariantsOptions.delete({
      where: { id },
    });
    revalidatePath(`${ADMIN_ROUTES.PRODUCT}/${slug}`);
    return createResponse(product, "Product deleted", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
