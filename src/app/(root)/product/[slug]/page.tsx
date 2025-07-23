import { notFound } from "next/navigation";

import prisma from "@/prismaClient";
import { ProductControls } from "@/components/entities/product/ProductControls";
import { ProductInfo } from "@/components/entities/product/ProductInfo";
import { VariantSwitcher } from "@/components/features/product/VariantSwitcher";
import { ProductImagesCarousel } from "@/components/features/carousels/ProductImagesCarousel";

interface IProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: IProps) {
  const { slug } = await params;
  const productVariant = await prisma.productVariants.findUnique({
    where: {
      slug,
    },
    include: {
      options: {
        include: {
          variationOption: {
            select: {
              hexCode: true,
            },
          },
        },
      },
      images: true,
      product: {
        include: {
          // category: true,
          categories: true,
          ProductDescription: true,
        },
      },
    },
  });
  if (!productVariant || !productVariant.visible) return notFound();
  const variants = await prisma.productVariants.findMany({
    where: {
      productId: productVariant.productId,
    },
    include: {
      options: {
        include: {
          variationOption: {
            select: {
              hexCode: true,
            },
          },
        },
      },
    },
  });
  const isSimpleProduct = productVariant.options.length === 0;

  return (
    <div className="wrapper">
      <section className="relative flex flex-col gap-4 py-4 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <div className="h-fit lg:sticky lg:top-24">
            <ProductImagesCarousel
              slides={productVariant.images.map((image) => image.url) ?? []}
              options={{ loop: false, align: "start" }}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-2/3">
          <h1 className="text-4xl font-medium text-text-high capitalize">
            {productVariant.title}
          </h1>
          <p className="text-text-low uppercase">Sku: {productVariant.sku}</p>
          <hr className="border-t-2 border-border" />
          {!productVariant.previousPrice ? (
            <p className="text-2xl font-medium">{productVariant.price} MDL</p>
          ) : (
            <p className="flex items-center gap-4 text-2xl font-medium">
              <span className="text-xl text-gray-500 line-through">
                {productVariant.price} MDL
              </span>
              {productVariant.previousPrice} MDL
            </p>
          )}
          {!isSimpleProduct && (
            <>
              <hr className="border-t-2 border-border" />
              <VariantSwitcher
                options={variants}
                currentOption={productVariant.options}
              />
            </>
          )}

          <hr className="border-t-2 border-border" />
          <ProductControls
            id={productVariant.id}
            stock={productVariant.stock}
            title={productVariant.title}
          />
          {/* </div> */}
          <hr className="border-t-2 border-border" />
          <ProductInfo items={productVariant.product.ProductDescription} />
        </div>
      </section>
    </div>
  );
}
