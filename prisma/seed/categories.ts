import type { PrismaClient } from "@prisma/client";

export async function seedCategories(prisma: PrismaClient) {
  const categories = [
    {
      name: "T-Shirts",
      slug: "t-shirts",
      image: "/static/images/categories/tshirts.webp",
    },
    {
      name: "Accessories",
      slug: "accessories",
      image: "/static/images/categories/accessories.webp",
    },
    {
      name: "Smartphones",
      slug: "smartphones",
      image: "/static/images/categories/smartphones.webp",
    },
    {
      name: "Tablets",
      slug: "tablets",
      image: "/static/images/categories/tablets.webp",
    },
    {
      name: "Laptops",
      slug: "laptops",
      image: "/static/images/categories/laptops.webp",
    },
    {
      name: "Featured",
      slug: "featured",
      image: "/static/images/categories/featured.webp",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories seeded");
}
