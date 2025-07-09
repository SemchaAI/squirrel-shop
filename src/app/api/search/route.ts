import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = qs.parse(url.search, { ignoreQueryPrefix: true });
    const search = query.q as string | undefined;

    const result = await prisma.productVariants.findMany({
      take: 5,
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            seoTitle: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        visible: true,
      },
    });
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Product search error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
