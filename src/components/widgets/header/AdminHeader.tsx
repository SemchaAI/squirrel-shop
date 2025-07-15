import dynamic from "next/dynamic";
import Link from "next/link";
import { Squirrel } from "lucide-react";

import { UserControl } from "@/components/features";
import { ROUTES } from "@/utils/config";

const SearchMenu = dynamic(() =>
  import("@/components/features/search/SearchMenu").then(
    (mod) => mod.SearchMenu,
  ),
);

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
