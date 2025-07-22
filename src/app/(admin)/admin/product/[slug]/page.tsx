import prisma from "@/prismaClient";

import { ProductVariantForm } from "@/components/entities/(admin)/forms/ProductVariantForm";

interface IProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AdminProductPage({ params }: IProps) {
  const { slug } = await params;

  const [product, categories, variations] = await prisma.$transaction([
    prisma.productVariants.findUnique({
      where: { slug },
      include: {
        product: {
          include: {
            categories: true,
          },
        },
        images: true,
        options: true,
      },
    }),
    prisma.category.findMany(),
    prisma.variations.findMany({
      include: {
        options: true,
      },
    }),
  ]);
  console.log("variations");

  if (!product) return <div>Product not found</div>;
  return (
    <ProductVariantForm
      product={product}
      categories={categories}
      variations={variations}
      slug={slug}
    />
  );
}
