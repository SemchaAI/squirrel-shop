import { AdminAside } from "@/components/widgets/aside/AdminAside";
import { AdminHeader } from "@/components/widgets/header/AdminHeader";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Squirrel Shop Admin",
  description: "Online store with nextjs and prisma",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
      <div className="flex flex-1 gap-5">
        <AdminAside />
        <main className="flex flex-1 flex-col pr-1 sm:pr-2 md:pr-4 lg:pr-6 xl:pr-8 2xl:pr-10">
          {children}
        </main>
      </div>
    </>
  );
}
