import { ProfileNav } from "@/components/widgets";
import prisma from "@/prismaClient";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: IProps) {
  const { id } = await params;
  const userData = await prisma.user.findUnique({
    where: { id },
    include: {
      Order: true,
    },
  });

  if (!userData) return <div>User not found</div>;

  return (
    <section className="wrapper flex flex-1 flex-col gap-2 py-4 sm:flex-row">
      <ProfileNav user={userData} />

      <div>
        <h1>Profile</h1>
      </div>
    </section>
  );
}
