import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismaClient";
import { MAX_AGE } from "@/auth";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET) {
    throw new Error("Missing CRON_SECRET in env");
  }
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const maxAgeAgo = new Date(Date.now() - MAX_AGE * 1000);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const deleted = await prisma.user.deleteMany({
    where: {
      OR: [
        {
          role: "GUEST",
          loggedInAt: { lt: maxAgeAgo }, //we are sure guests are not logged in
        },
        {
          role: { not: "GUEST" },
          verified: null,
          createdAt: { lt: oneHourAgo },
        },
      ],
    },
  });

  const deletedComms = await prisma.productReview.deleteMany({
    where: {
      createdAt: { lt: oneDayAgo },
      status: "REJECTED",
    },
  });

  return NextResponse.json({
    message: `✅ Deleted ${deleted.count} users. Deleted ${deletedComms.count} comments`,
  });
}
