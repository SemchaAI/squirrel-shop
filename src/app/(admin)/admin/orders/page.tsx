import clsx from "clsx";
import prisma from "@/prismaClient";

import { OrderFilter, Pagination, SearchFilter } from "@/components/features";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared";
import { OrderStatus } from "@prisma/client";

const headers = [
  "Buyer",
  "Email",
  "Total",
  "Phone",
  "Order Status",
  "Data",
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

  //pagination
  const pageNumber = parseInt(search.page || "1", 10);
  const take = 11;
  const skip = (pageNumber - 1) * take;

  //filter
  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      take,
      skip,
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: order === "desc" ? "desc" : "asc",
      },
    }),
    prisma.order.count({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  ]);
  return (
    <div className="flex flex-col justify-start gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Orders{" "}
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
            {orders.map((order) => {
              return (
                <TableRow
                  key={order.id}
                  className="transition-colors hover:bg-ui-hover"
                >
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.totalAmount}MDL</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>
                    <span
                      className={clsx(
                        "font-bold",
                        order.status === OrderStatus.SUCCEEDED
                          ? "text-success"
                          : "text-error",
                      )}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      actions
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
