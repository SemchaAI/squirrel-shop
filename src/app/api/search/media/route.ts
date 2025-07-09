import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = qs.parse(url.search, { ignoreQueryPrefix: true });
    const search = query.q as string | undefined;
    if (!search) return NextResponse.json([]);

    const result = await prisma.productImage.findMany({
      include: {
        variants: {
          select: {
            title: true,
            id: true,
            slug: true,
          },
        },
      },
      where: {
        variants: {
          some: {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                slug: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      },
    });

    const onlyProductImageData = result.map((item) => ({
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      url: item.url,
      alt: item.alt,
    }));
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(onlyProductImageData);
  } catch (error) {
    console.error("Product search error:", error);
    return NextResponse.json("Server Error", { status: 500 });
  }
}
