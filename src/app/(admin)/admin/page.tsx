import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import clsx from "clsx";
import prisma from "@/prismaClient";

import { DeleteProduct } from "@/actions/AdminProducts";
import { CreateProductModal } from "@/components/entities/(admin)/modals/CreateProductModal";
import { ProductDescriptionModal } from "@/components/entities/(admin)/modals/ProductDescriptionModal";
import { CreateProductVariantModal } from "@/components/entities/(admin)/modals/CreateProductVariantModal";
import { DeleteModal } from "@/components/entities/forms/DeleteModal";

import { OrderFilter } from "@/components/features/filters/OrderFilter";
import { Pagination } from "@/components/features/pagination/Pagination";
import { SearchFilter } from "@/components/features/filters/SearchFilter";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table/table";

const headers = [
  "Preview",
  "Title",
  "Number of variations",
  "Created",
  "Actions",
];

export default async function AdminHome({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | undefined>>; //string[]
}>) {
  const search = await searchParams;

  //search
  const query = search.q || "";
  const order = search.order || "desc";
  const category = search.category;

  //pagination
  const pageNumber = parseInt(search.page || "1", 10);
  const take = 11;
  const skip = (pageNumber - 1) * take;

  //filter
  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      take,
      skip,
      where: {
        title: { contains: query, mode: "insensitive" },
        ...(category && { categories: { some: { slug: category } } }),
      },
      orderBy: {
        createdAt: order === "desc" ? "desc" : "asc",
      },
      include: {
        ProductDescription: true,
        variants: {
          select: {
            previewImage: true,
          },
        },
      },
    }),
    prisma.product.count({
      where: {
        title: { contains: query, mode: "insensitive" },
        ...(category && { categories: { some: { slug: category } } }),
      },
    }),
  ]);
  return (
    <div className="flex flex-col justify-start gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Products{" "}
          <span className="align-top text-sm text-primary">({total})</span>
        </h1>

        <div className="flex items-center gap-2">
          <SearchFilter />
          <CreateProductModal />
          <OrderFilter />
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const url = product.variants[0]?.previewImage
                ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL +
                  product.variants[0].previewImage
                : "/static/images/no-image360.webp";
              const count = product.variants.length;
              return (
                <TableRow
                  key={product.id}
                  className="transition-colors hover:bg-ui-hover"
                >
                  <TableCell>
                    <Image
                      src={url}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded border border-border bg-white object-contain"
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    <span
                      className={clsx(
                        "font-bold",
                        count > 0 ? "text-success" : "text-error",
                      )}
                    >
                      {count}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <ProductDescriptionModal
                        description={product?.ProductDescription}
                        id={product.id}
                      />
                      <CreateProductVariantModal id={product.id} />
                      <DeleteModal
                        button={
                          <Trash2Icon
                            className="h-8 w-8 rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
                            size={20}
                          />
                        }
                        id={product.id}
                        title="Delete product"
                        confirmText="Are you sure you want to delete this product?"
                        onDelete={DeleteProduct}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Pagination currPage={pageNumber} count={total} limit={take} />
      </div>
    </div>
  );
}
