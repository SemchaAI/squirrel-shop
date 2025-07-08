import { SearchMenu, UserControl } from "@/components/features";
import { ROUTES } from "@/utils/config";
import { Squirrel } from "lucide-react";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <header className="wrapper flex h-20 items-center justify-between gap-8 border-b border-border bg-ui">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Squirrel size={40} />
        <h1 className="hidden text-2xl font-bold sm:block">Squirrel</h1>
      </Link>
      <SearchMenu />
      <UserControl />
    </header>
  );
};
