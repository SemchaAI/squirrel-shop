import type { PrismaClient } from "@prisma/client";

const variationSeeds = [
  {
    name: "Size",
    options: [{ value: "S" }, { value: "M" }, { value: "L" }],
  },
  {
    name: "Color",
    options: [
      { value: "White", hexCode: "#FFFFFF" },
      { value: "Black", hexCode: "#000000" },
      { value: "Red", hexCode: "#FF0000" },
      { value: "Green", hexCode: "#00FF00" },
      { value: "LemonGreen", hexCode: "#B5BA8F" },
      { value: "Blue", hexCode: "#395481" },
      { value: "Purple", hexCode: "#ff00ff" },
      { value: "Silver", hexCode: "#C0C0C0" },
      { value: "Gray", hexCode: "#6e6e6e" },
      { value: "Gold", hexCode: "#ffd700" },
    ],
  },
  {
    name: "RAM",
    options: [
      { value: "4GB" },
      { value: "8GB" },
      { value: "12GB" },
      { value: "16GB" },
      { value: "32GB" },
    ],
  },
  {
    name: "Storage",
    options: [
      { value: "64GB" },
      { value: "128GB" },
      { value: "256GB" },
      { value: "512GB" },
      { value: "1TB" },
    ],
  },
];

export async function seedVariationsWithOptions(prisma: PrismaClient) {
  for (const variation of variationSeeds) {
    const createdVariation = await prisma.variations.upsert({
      where: { name: variation.name },
      update: {},
      create: { name: variation.name },
    });

    await Promise.all(
      variation.options.map((option: { value: string; hexCode?: string }) =>
        prisma.variationOptions.upsert({
          where: { value: option.value },
          update: {},
          create: {
            value: option.value,
            hexCode: option.hexCode,
            variationId: createdVariation.id,
          },
        }),
      ),
    );
  }

  console.log("✅ Variations and their options seeded successfully.");
}
