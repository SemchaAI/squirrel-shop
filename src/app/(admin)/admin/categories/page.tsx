import Image from "next/image";
import Link from "next/link";
import { ArrowRightLeft, EyeIcon, Trash2Icon } from "lucide-react";

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

import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";
import { DeleteModal } from "@/components/entities/forms/DeleteModal";
import { DeleteCategory } from "@/actions/AdminCategories";
import { CategoryModal } from "@/components/entities/(admin)/modals/CategoryModal";
import { MediaModal } from "@/components/entities/(admin)/modals/MediaModal";
import Tooltip from "@/components/shared/tooltip/Tooltip";

const headers = [
  "Preview",
  "Name",
  "SLug",
  "Number of products",
  "Created",
  "Updated",
  "Actions",
];

export default async function AdminCategories({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | undefined>>; //string[]
}>) {
  const search = await searchParams;

  //search
  const query = search.q || "";
  const order = search.order || "desc";

  //pagination
  const pageNumber = parseInt(search.page || "1", 10);
  const take = 11;
  const skip = (pageNumber - 1) * take;

  //filter
  const [categories, total] = await prisma.$transaction([
    prisma.category.findMany({
      take,
      skip,
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
            slug: { contains: query, mode: "insensitive" },
          },
        ],
      },
      orderBy: {
        updatedAt: order === "desc" ? "desc" : "asc",
      },
      include: {
        products: {
          select: {
            _count: {
              select: {
                variants: true,
              },
            },
            title: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    }),
    prisma.category.count({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
            slug: { contains: query, mode: "insensitive" },
          },
        ],
      },
    }),
  ]);
  return (
    <div className="flex flex-col justify-start gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories{" "}
          <span className="align-top text-sm text-primary">({total})</span>
        </h1>

        <div className="flex items-center gap-2">
          <SearchFilter />
          <CategoryModal title="Create Category" />
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
            {categories.map((category) => {
              //process.env.NEXT_PUBLIC_IMAGE_CDN_URL
              const url = category.image
                ? `${process.env.NEXT_PUBLIC_IMAGE_CDN_URL}${category.image}`
                : "/static/images/no-image360.webp";
              const productCount = category._count.products;
              const productVariantsCount = category.products.reduce(
                (acc, product) => acc + product._count.variants,
                0,
              );
              return (
                <TableRow
                  key={category.id}
                  className="transition-colors hover:bg-ui-hover"
                >
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Image
                        src={url}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded border border-border bg-white object-contain"
                      />
                      <MediaModal
                        id={category.id}
                        uploadEndpoint="categoryImageUploader"
                        button={
                          <Tooltip content="Change image">
                            <ArrowRightLeft
                              className="h-6 w-6 rounded-md bg-ui p-1 transition-colors hover:text-primary"
                              size={20}
                            />
                          </Tooltip>
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2">
                        <p>
                          Products:{" "}
                          <span
                            className={`${productCount > 0 ? "text-success" : "text-warning"}`}
                          >
                            {productCount}
                          </span>
                        </p>
                        <Link
                          href={`${ADMIN_ROUTES.ADMIN}?category=${category.slug}`}
                          className="rounded-md transition-colors hover:text-primary"
                        >
                          <EyeIcon size={20} />
                        </Link>
                      </div>
                      <div className="flex gap-2">
                        <p>
                          Variants:{" "}
                          <span
                            className={`${productVariantsCount > 0 ? "text-success" : "text-warning"}`}
                          >
                            {productVariantsCount}
                          </span>
                        </p>

                        <Link
                          href={`${ADMIN_ROUTES.PRODUCTS}?category=${category.slug}`}
                          className="rounded-md transition-colors hover:text-primary"
                        >
                          <EyeIcon size={20} />
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(category.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <CategoryModal
                        id={category.id}
                        title="Update Category"
                        defaultValues={{
                          name: category.name,
                          slug: category.slug,
                        }}
                      />
                      <DeleteModal
                        button={
                          <Trash2Icon
                            className="h-8 w-8 rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
                            size={20}
                          />
                        }
                        id={category.id}
                        title="Delete product"
                        confirmText="Are you sure you want to delete this product?"
                        onDelete={DeleteCategory}
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
