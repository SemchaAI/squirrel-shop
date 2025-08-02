import Image from "next/image";
import Link from "next/link";
import { EyeIcon, Pen } from "lucide-react";

import prisma from "@/prismaClient";
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
import { ROUTES } from "@/utils/config/routes/routes";
import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";

const headers = [
  "Preview",
  "Title",
  "SKU",
  "Price",
  "Stock",
  "Created",
  "Actions",
];

export default async function AdminProducts({
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
    prisma.productVariants.findMany({
      take,
      skip,
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            sku: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
        ...(category && {
          product: { categories: { some: { slug: category } } },
        }),
      },
      orderBy: {
        createdAt: order === "desc" ? "desc" : "asc",
      },
    }),
    prisma.productVariants.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            sku: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
        ...(category && {
          product: { categories: { some: { slug: category } } },
        }),
      },
    }),
  ]);

  return (
    <div className="flex flex-col justify-start gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Product Variants{" "}
          <span className="align-top text-sm text-primary">({total})</span>
        </h1>

        <div className="flex items-center gap-2">
          <SearchFilter />
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
              const url = product.previewImage
                ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + product.previewImage
                : "/static/images/placeholder.webp";
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
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    {product.previousPrice && (
                      <span className="mr-1 text-sm text-gray-400 line-through">
                        {product.previousPrice} MDL
                      </span>
                    )}
                    <span
                      className={
                        product.previousPrice
                          ? "font-bold text-error"
                          : "font-medium"
                      }
                    >
                      {product.price} MDL
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock > 0 ? "text-success" : "text-error"
                      }
                    >
                      {product.stock > 0 ? "In stock" : "Out of stock"} (
                      {product.stock})
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`${ADMIN_ROUTES.PRODUCT}/${product.slug}`}
                        className="rounded-full bg-app p-1.5 transition-colors hover:text-primary"
                      >
                        <Pen size={20} />
                      </Link>
                      <Link
                        href={`${ROUTES.PRODUCT}/${product.slug}`}
                        className="rounded-full bg-app p-1.5 transition-colors hover:text-primary"
                      >
                        <EyeIcon size={20} />
                      </Link>
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
