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
import { DeleteModal } from "@/components/entities/forms/DeleteModal";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { deleteVariation } from "@/actions/AdminVariations";
import { VariationModal } from "@/components/entities/(admin)/modals/VariationModal";
import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";
import Link from "next/link";
import { VariationOptionModal } from "@/components/entities/(admin)/modals/VariationOptionModal";

const headers = ["Product", "Options Number", "Updated", "Created", "Actions"];

export default async function AdminVariants({
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
  const [variations, total] = await prisma.$transaction([
    prisma.variations.findMany({
      take,
      skip,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: order === "desc" ? "desc" : "asc",
      },
      include: {
        _count: {
          select: {
            options: true,
          },
        },
      },
    }),
    prisma.variations.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    }),
  ]);

  return (
    <div className="flex flex-col justify-start gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Variations{" "}
          <span className="align-top text-sm text-primary">
            ({variations.length})
          </span>
        </h1>

        <div className="flex items-center gap-2">
          <SearchFilter />
          <VariationModal title="Create Variation" />
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
            {variations.map((variation) => {
              return (
                <TableRow
                  key={variation.id}
                  className="transition-colors hover:bg-ui-hover"
                >
                  <TableCell>{variation.name}</TableCell>
                  <TableCell>{variation._count.options}</TableCell>
                  <TableCell>
                    {new Date(variation.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(variation.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`${ADMIN_ROUTES.VARIATIONS_OPTIONS}?q=${variation.name}`}
                        className="rounded-full bg-app p-1.5 transition-colors hover:text-primary"
                      >
                        <EyeIcon size={20} />
                      </Link>
                      <VariationModal
                        id={variation.id}
                        title="Edit Variation"
                        defaultValues={variation}
                      />
                      <VariationOptionModal
                        title="Create Variation Option"
                        defaultValues={{
                          value: "",
                          variationId: variation.id,
                        }}
                      />
                      <DeleteModal
                        button={
                          <Trash2Icon
                            className="h-8 w-8 rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
                            size={20}
                          />
                        }
                        id={variation.id}
                        title="Delete Variation"
                        confirmText="Are you sure you want to delete this variation?"
                        onDelete={deleteVariation}
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
