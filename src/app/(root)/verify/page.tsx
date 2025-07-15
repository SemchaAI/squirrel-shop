import { VerifyEmailForm } from "@/components/entities";
import { Container } from "@/components/shared";
import prisma from "@/prismaClient";

export default async function VerifyPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | undefined>>;
}>) {
  const search = await searchParams;
  const code = search.code || "";
  const id = search.id || "";
  const session = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!session) {
    return (
      <div className="wrapper flex flex-1 flex-col justify-center py-5 text-center">
        <h1 className="text-3xl font-bold">Invalid verification code</h1>
      </div>
    );
  }

  if (session && session.verified) {
    return (
      <div className="wrapper flex flex-1 flex-col justify-center py-5 text-center">
        <h1 className="text-3xl font-bold">Email already verified</h1>
      </div>
    );
  }

  return (
    <div className="wrapper flex h-[calc(100dvh-80px)] flex-col justify-start gap-5 pt-5">
      <Container className="m-auto bg-app-subtle p-2 sm:w-101 sm:p-10">
        <VerifyEmailForm session={session} code={code} />
      </Container>
    </div>
  );
}
