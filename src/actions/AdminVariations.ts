"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/prismaClient";
import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";
import { createResponse } from "@/utils/helpers/createNextResponse";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface IVariationSchema {
  name: string;
}
interface IVariationOptionSchema {
  value: string;
  hexCode?: string;
  variationId: string;
}

// DELETE
export const deleteVariation = async (id: string) => {
  try {
    const variation = await prisma.variations.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            options: true,
          },
        },
      },
    });
    if (!variation) {
      return createResponse(null, "Variation does not exist", false);
    }
    if (variation._count.options > 0) {
      return createResponse(
        null,
        "Variation has options, delete them first",
        false,
      );
    }

    const deleted = await prisma.variations.delete({ where: { id } });

    revalidatePath(ADMIN_ROUTES.VARIATIONS);
    return createResponse(deleted, "Variation deleted", true);
  } catch (error) {
    console.error("[deleteVariation]", error);
    return createResponse(null, "Something went wrong", false);
  }
};

// CREATE
export const createVariation = async (data: IVariationSchema) => {
  try {
    const { name } = data;

    const isExist = await prisma.variations.findUnique({
      where: { name },
    });
    if (isExist) {
      return createResponse(null, "Variation already exists", false);
    }

    const variation = await prisma.variations.create({
      data: { name },
    });

    revalidatePath(ADMIN_ROUTES.VARIATIONS);
    return createResponse(variation, "Variation created", true);
  } catch (error) {
    console.error("[createVariation]", error);
    return createResponse(null, "Something went wrong", false);
  }
};

// UPDATE
export const modifyVariation = async (data: IVariationSchema, id: string) => {
  try {
    const { name } = data;

    const isExist = await prisma.variations.findUnique({
      where: { name },
    });

    if (isExist && isExist.id !== id) {
      return createResponse(
        null,
        "Variation with this name already exists",
        false,
      );
    }

    const current = await prisma.variations.findUnique({ where: { id } });
    if (!current) {
      return createResponse(null, "Variation does not exist", false);
    }

    const variation = await prisma.variations.update({
      where: { id },
      data: { name },
    });

    revalidatePath(ADMIN_ROUTES.VARIATIONS);
    return createResponse(variation, "Variation updated", true);
  } catch (error) {
    console.error("[modifyVariation]", error);
    return createResponse(null, "Something went wrong", false);
  }
};

// CREATE
export const createVariationOption = async (data: IVariationOptionSchema) => {
  try {
    console.log("data", data);
    const { value, hexCode, variationId } = data;

    const isExist = await prisma.variationOptions.findUnique({
      where: { value },
    });
    if (isExist) {
      return createResponse(null, "Variation option already exists", false);
    }

    const option = await prisma.variationOptions.create({
      data: { value, hexCode, variationId },
    });

    revalidatePath(ADMIN_ROUTES.VARIATIONS_OPTIONS);
    return createResponse(option, "Variation option created", true);
  } catch (error) {
    console.error("[createVariationOption]", error);
    return createResponse(null, "Something went wrong", false);
  }
};

// UPDATE
export const modifyVariationOption = async (
  data: IVariationOptionSchema,
  id: string,
) => {
  try {
    const { value, hexCode } = data;

    const isExist = await prisma.variationOptions.findUnique({
      where: { value },
    });

    if (isExist && isExist.id !== id) {
      return createResponse(null, "Variation option already exists", false);
    }

    const current = await prisma.variationOptions.findUnique({ where: { id } });
    if (!current) {
      return createResponse(null, "Variation option does not exist", false);
    }

    const option = await prisma.variationOptions.update({
      where: { id },
      data: { value, hexCode },
    });

    revalidatePath(ADMIN_ROUTES.VARIATIONS_OPTIONS);
    return createResponse(option, "Variation option updated", true);
  } catch (error) {
    console.error("[modifyVariationOption]", error);
    return createResponse(null, "Something went wrong", false);
  }
};

//DELETE
export const deleteVariationOption = async (id: string) => {
  try {
    const option = await prisma.variationOptions.findUnique({ where: { id } });

    if (!option) {
      return createResponse(null, "Variation option does not exist", false);
    }

    await prisma.variationOptions.delete({ where: { id } });

    revalidatePath(ADMIN_ROUTES.VARIATIONS_OPTIONS);
    return createResponse(null, "Variation option deleted", true);
  } catch (error) {
    // Handle foreign key constraint error
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return createResponse(
        null,
        "Cannot delete variation option because it is linked to product variants",
        false,
      );
    }
    console.error("[deleteVariationOption]", error);
    return createResponse(null, "Something went wrong", false);
  }
};
