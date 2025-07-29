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
import { StarRating } from "@/components/entities/product/StarRating";
import { PreviewReviewModal } from "@/components/entities/(admin)/modals/PreviewReviewModal";
import { UpdateStatusReview } from "@/components/entities/(admin)/review/UpdateStatusReview";

const headers = [
  "Product",
  "Rating",
  "STATUS",
  "Updated",
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

  //pagination
  const pageNumber = parseInt(search.page || "1", 10);
  const take = 11;
  const skip = (pageNumber - 1) * take;

  //filter
  const [reviews, total] = await prisma.$transaction([
    prisma.productReview.findMany({
      take,
      skip,
      where: {
        user: {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
      include: {
        product: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: order === "desc" ? "desc" : "asc",
      },
    }),
    prisma.productReview.count({
      where: {
        user: {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
    }),
  ]);

  return (
    <div className="flex flex-col justify-start gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Reviews{" "}
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
            {reviews.map((review) => {
              // const url = product.previewImage
              //   ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + product.previewImage
              //   : "/static/images/placeholder.webp";
              return (
                <TableRow
                  key={review.id}
                  className="transition-colors hover:bg-ui-hover"
                >
                  <TableCell>{review.product.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">({review.rating})</span>
                      <StarRating size={20} rating={review.rating} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <UpdateStatusReview review={review} />
                  </TableCell>
                  <TableCell>
                    {new Date(review.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start gap-2">
                      {/* <Link
                        href={`${ADMIN_ROUTES.PRODUCT}/${review.id}`}
                        className="rounded-full bg-app p-1.5 transition-colors hover:text-primary"
                      >
                        <Pen size={20} />
                      </Link> */}
                      <PreviewReviewModal review={review} />
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

{
  /* <Image
                      src={url}
                      alt={review.productId}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded border border-border bg-white object-contain"
                    /> */
}
