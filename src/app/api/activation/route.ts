import { createNextResponse } from "@/utils/helpers";
import { sendActivationMail } from "@/utils/mail";
import type { User } from "@prisma/client";
interface IUser {
  user: User;
  code: string;
  link: string;
  ipClient: string;
}
export async function POST(req: Request) {
  const { NEXT_PUBLIC_FINGERPRINT } = process.env;
  console.log("NEXT_PUBLIC_FINGERPRINT", NEXT_PUBLIC_FINGERPRINT);
  if (!NEXT_PUBLIC_FINGERPRINT)
    throw new Error("Missing NEXT_PUBLIC_FINGERPRINT in env");

  const { user, code, link, ipClient }: IUser = await req.json();
  try {
    const geoRes = await fetch(`${NEXT_PUBLIC_FINGERPRINT}${ipClient}`);
    const geo = await geoRes.json();
    await sendActivationMail(user, link, code, geo);
    return createNextResponse(null, "Email sent successfully", true, 200);
  } catch (error) {
    console.error("Error sending mail:", error);
    return createNextResponse(null, "Error sending mail", false, 500);
  }
}
