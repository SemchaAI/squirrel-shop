import { auth } from "@/auth";
import { NextRequest } from "next/server";

import prisma from "@/prismaClient";
import { ReviewSchema } from "@/utils/config/schemas";
import { createNextResponse } from "@/utils/helpers/createNextResponse";
import { REVIEWS_PER_PAGE } from "@/utils/config/reviews";
import { containsLink } from "@/utils/helpers/linkify";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    const productId = searchParams.get("productId");

    const pageNumber = parseInt(page || "1", 10);

    const take = REVIEWS_PER_PAGE;
    const skip = (pageNumber - 1) * take;

    if (!productId) {
      return createNextResponse(null, "Product not found", false, 404);
    }

    const productReviews = await prisma.productReview.findMany({
      where: {
        productId,
        status: "APPROVED",
      },
      take,
      skip,
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // if (!product) {
    //   return createNextResponse(null, "Product not found", false, 404);
    // }

    return createNextResponse(
      productReviews,
      "Product reviews fetched successfully",
      true,
      200,
    );
  } catch (error) {
    console.log("[Review GET] error:", error);
    return createNextResponse(null, "Something went wrong", false, 500);
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return createNextResponse(null, "User not found", false, 401);
  }
  if (session.user.role === "GUEST") {
    return createNextResponse(null, "Guests can`t write reviews", false, 401);
  }
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  if (!productId) {
    return createNextResponse(null, "Product not found", false, 404);
  }
  const body = await req.json();
  const result = ReviewSchema.safeParse(body);
  if (!result.success) {
    return createNextResponse(null, result.error.message, false, 400);
  }
  const { rating, advantages, disadvantages, comment } = result.data;
  const text = `${advantages} ${disadvantages} ${comment}`;
  const isLink = containsLink(text);
  if (isLink) {
    return createNextResponse(null, "Links are not allowed", false, 400);
  }
  const userId = session?.user.id;

  try {
    const [product, user, review] = await prisma.$transaction([
      prisma.product.findUnique({
        where: { id: productId },
      }),
      prisma.user.findUnique({
        where: {
          id: userId,
        },
      }),
      prisma.productReview.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      }),
    ]);

    if (!product) {
      return createNextResponse(null, "Product not found", false, 404);
    }
    if (!user) {
      return createNextResponse(null, "User not found", false, 401);
    }
    if (user.banned) {
      return createNextResponse(
        null,
        "You cannot write reviews. Account is banned",
        false,
        401,
      );
    }
    if (review) {
      return createNextResponse(null, "You already wrote a review", false, 400);
    }

    await prisma.productReview.create({
      data: {
        rating,
        advantages,
        disadvantages,
        comment,
        productId,
        userId: session.user.id,
      },
    });
    return createNextResponse(null, "Review created successfully", true, 200);
  } catch (error) {
    console.error("[Review POST] error:", error);
    return createNextResponse(null, "Something went wrong", false, 500);
  }
}
