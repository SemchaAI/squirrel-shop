import { redirect } from "next/navigation";

import prisma from "@/prismaClient";
import { ResetPasswordForm } from "@/components/entities/forms/ResetPasswordForm";

interface IProps {
  searchParams: Readonly<Promise<Record<string, string | undefined>>>;
}

export default async function ResetPasswordPage({ searchParams }: IProps) {
  const search = await searchParams;
  const token = search.token;
  if (!token) return redirect("/");
  const isTokenValid = await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
  });

  if (!isTokenValid) return redirect("/");

  return (
    <section className="wrapper flex h-[calc(100dvh-80px)] w-full flex-col">
      <div className="m-auto w-full max-w-120 min-w-80">
        <ResetPasswordForm token={token} />
      </div>
    </section>
  );
}
