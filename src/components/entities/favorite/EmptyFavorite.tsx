import Link from "next/link";
import { PackageOpenIcon, Squirrel } from "lucide-react";

import { ROUTES } from "@/utils/config";

export const EmptyFavorite = () => {
  return (
    <div className="wrapper mt-6 mb-20 flex flex-col items-center justify-center sm:mb-10">
      <h1 className="text-4xl font-bold">Favorite</h1>
      <div className="my-5 flex rounded-xl bg-gray-100 p-2">
        <Squirrel size={200} className="reverse" />
        <PackageOpenIcon size={40} className="mt-auto mb-2" />
      </div>
      <p className="text-xl">Your favorite is empty</p>
      <Link
        href={ROUTES.HOME}
        className="mt-10 rounded-md border bg-primary px-4 py-2 text-white transition-colors hover:bg-white hover:text-primary"
      >
        Shop Now
      </Link>
    </div>
  );
};
