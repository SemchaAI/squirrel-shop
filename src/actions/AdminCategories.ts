"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/prismaClient";
import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";
import { createResponse } from "@/utils/helpers/createNextResponse";
import { utapi } from "@/utils/utapi";
import type { UploadFileResult } from "uploadthing/types";

interface ICreateCategorySchema {
  name: string;
  slug: string;
  image?: File[];
}

export const DeleteCategory = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    if (!category)
      return createResponse(null, "Category does not exist", false);
    if (category._count.products > 0)
      return createResponse(null, "Category has products", false);

    if (category.image) {
      await utapi.deleteFiles(category.image);
    }
    const product = await prisma.category.delete({ where: { id } });
    revalidatePath(ADMIN_ROUTES.CATEGORIES);
    return createResponse(product, "Product deleted", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};

export const createCategory = async (data: ICreateCategorySchema) => {
  try {
    const { name, image, slug } = data;
    const isExist = await prisma.category.findUnique({
      where: {
        name_slug: { name, slug },
      },
    });
    if (isExist) return createResponse(null, "Category already exists", false);

    let uploaded: UploadFileResult[] | undefined;
    if (image && image.length > 0) {
      if (image.length > 1)
        return createResponse(null, "Please select only one image", false);
      uploaded = await utapi.uploadFiles(image);
      if (!uploaded) return createResponse(null, "Something went wrong", false);
    }

    const product = await prisma.category.create({
      data: {
        name,
        slug,
        image: uploaded ? uploaded[0].data?.key : undefined,
      },
    });
    revalidatePath(ADMIN_ROUTES.CATEGORIES);
    return createResponse(product, "Category created", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};

export const modifyCategory = async (
  data: ICreateCategorySchema,
  id: string,
) => {
  try {
    const { name, image, slug } = data;
    const isExist = await prisma.category.findUnique({
      where: {
        name_slug: { name, slug },
        NOT: { id },
      },
    });
    if (isExist) return createResponse(null, "Category already exists", false);

    const currentCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!currentCategory)
      return createResponse(null, "Category does not exists", false);

    let uploaded: UploadFileResult[] | undefined;
    if (image && image.length > 0) {
      if (image.length > 1)
        return createResponse(null, "Please select only one image", false);
      uploaded = await utapi.uploadFiles(image);
      if (!uploaded) return createResponse(null, "Something went wrong", false);
      if (currentCategory.image) await utapi.deleteFiles(currentCategory.image);
    }

    const product = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        ...(uploaded && { image: uploaded[0].data?.key }),
      },
    });
    revalidatePath(ADMIN_ROUTES.CATEGORIES);
    return createResponse(product, "Category updated", true);
  } catch (error) {
    console.log(error);
    return createResponse(null, "Something went wrong", false);
  }
};
