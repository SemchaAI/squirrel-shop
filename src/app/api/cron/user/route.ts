import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismaClient";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET) {
    throw new Error("Missing CRON_SECRET in env");
  }
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const deleted = await prisma.user.deleteMany({
    where: {
      verified: null,
      createdAt: {
        lt: oneHourAgo,
      },
    },
  });

  return NextResponse.json({ message: `Deleted ${deleted.count} users.` });
}
