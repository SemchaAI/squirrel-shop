import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./seed/categories";
import { seedVariationsWithOptions } from "./seed/variationOptions";
import seedProducts from "./seed/products";

export interface ISeedProps {
  categories: Awaited<ReturnType<typeof seedCategories>>;
  options: Awaited<ReturnType<typeof seedVariationsWithOptions>>;
}

const prisma = new PrismaClient();

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "ProductImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariantsOptions" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariants" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "VariationOptions" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variations" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
}

async function up() {
  await seedCategories(prisma);
  await seedVariationsWithOptions(prisma);
  await seedProducts(prisma);
  // const { tShirtRedSmall } = await ProductsInit({
  //   categories,
  //   variations,
  //   variationOptions,
  // });
  // await ProductImagesInit(tShirtRedSmall);
}

async function main() {
  try {
    await down();
    await up();
    console.log("🌱 Seed completed.");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
