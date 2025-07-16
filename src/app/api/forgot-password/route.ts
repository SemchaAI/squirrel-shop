import { v4 as uuidv4 } from "uuid";
import prisma from "@/prismaClient";
import { addMinutes, createNextResponse, isBefore } from "@/utils/helpers";
import { ROUTES } from "@/utils/config";
import { sendResetPasswordMail } from "@/utils/mail";

//import { sendResetPasswordMail } from "@/utils/mail"; // Your mail sender utility

export async function POST(req: Request) {
  if (!process.env.NEXTAUTH_URL || !process.env.NEXT_PUBLIC_FINGERPRINT)
    throw new Error("Missing  NEXTAUTH_URL or NEXT_PUBLIC_FINGERPRINT in env");

  const { email, ipClient } = await req.json();
  if (!email) return createNextResponse(null, "Email is required", false, 400);

  const user = await prisma.user.findUnique({
    where: { email },
    include: { PasswordResetToken: true },
  });

  if (!user) return createNextResponse(null, "User not found", false, 404);

  const existing = user.PasswordResetToken;

  // Prevent abuse
  if (existing) {
    const now = new Date();
    // expired token → allow a new one
    if (isBefore(existing.expiresAt, now)) {
      await prisma.passwordResetToken.delete({ where: { userId: user.id } });
    }
    // token still active but no remaining attempts → block
    else if (existing.remainingAttempts <= 0) {
      const waitMinutes = Math.ceil(
        (existing.expiresAt.getTime() - now.getTime()) / 60000,
      );
      return createNextResponse(
        null,
        `Too many reset attempts. Try again in ${waitMinutes} min.`,
        false,
        200,
      );
    }
    // active token → decrement attempt count and update token
    else {
      const token = uuidv4();
      await prisma.passwordResetToken.update({
        where: { userId: user.id },
        data: {
          token,
          remainingAttempts: existing.remainingAttempts - 1,
          expiresAt: addMinutes(now, 10), // reset window
        },
      });

      const resetLink = `${process.env.NEXTAUTH_URL}${ROUTES.RESET_PASSWORD}?token=${token}`;
      const geo = await fetch(
        `${process.env.NEXT_PUBLIC_FINGERPRINT}${ipClient}`,
      ).then((res) => res.json());

      await sendResetPasswordMail(user, resetLink, geo);
      return createNextResponse(
        null,
        `Reset email sent. Remaining attempts: ${existing.remainingAttempts - 1} `,
        true,
        200,
      );
    }
  }

  //No token exists, first-time request
  const token = uuidv4();
  const newToken = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      remainingAttempts: 2,
      expiresAt: addMinutes(new Date(), 10),
    },
  });

  const resetLink = `${process.env.NEXTAUTH_URL}${ROUTES.RESET_PASSWORD}?token=${token}`;
  const geo = await fetch(
    `${process.env.NEXT_PUBLIC_FINGERPRINT}${ipClient}`,
  ).then((res) => res.json());

  await sendResetPasswordMail(user, resetLink, geo);
  return createNextResponse(
    null,
    `Reset email sent. Remaining attempts: ${newToken.remainingAttempts} `,
    true,
    200,
  );
}
