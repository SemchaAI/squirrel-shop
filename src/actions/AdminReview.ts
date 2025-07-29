"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";
import { createResponse } from "@/utils/helpers/createNextResponse";
import { ReviewStatus } from "@prisma/client";

export async function updateReviewStatus({
  reviewId,
  newStatus,
}: {
  reviewId: string;
  newStatus: ReviewStatus; // "APPROVED" | "REJECTED" | "PENDING"
}) {
  if (!Object.values(ReviewStatus).includes(newStatus)) {
    return createResponse(null, "Review status updated", false);
  }
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return createResponse(null, "Unauthorized", false);
  }

  return await prisma.$transaction(async (tx) => {
    // 1. Get review & productId
    const review = await tx.productReview.findUnique({
      where: { id: reviewId },
      select: { productId: true, status: true },
    });

    if (!review) throw new Error("Review not found");
    const productId = review.productId;

    // 2. Update review status
    await tx.productReview.update({
      where: { id: reviewId },
      data: { status: newStatus },
    });

    // 3. Recalculate averageRating and reviewCount from APPROVED only
    const aggregation = await tx.productReview.aggregate({
      where: {
        productId,
        status: "APPROVED",
      },
      _avg: {
        rating: true,
      },
      _count: true,
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        averageRating: aggregation._avg.rating ?? 0,
        reviewCount: aggregation._count,
      },
    });
    revalidatePath(ADMIN_ROUTES.REVIEWS);

    return createResponse(null, "Review status updated", true);
  });
}
