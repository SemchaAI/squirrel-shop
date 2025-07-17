import Link from "next/link";
import { Squirrel } from "lucide-react";

import { HeaderMenu } from "@/components/entities";
import { ROUTES } from "@/utils/config";

export const Header = () => {
  return (
    <header className="wrapper sticky top-0 z-10 flex h-20 items-center justify-between gap-4 bg-ui shadow-[0_1px_2px_var(--gray-6)] md:gap-6 lg:gap-8">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Squirrel size={40} />
        <h1 className="hidden text-2xl font-bold lg:block">Squirrel</h1>
      </Link>
      <HeaderMenu />
    </header>
  );
};
