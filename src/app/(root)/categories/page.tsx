import Image from "next/image";
import Link from "next/link";

import prisma from "@/prismaClient";
import { ROUTES } from "@/utils/config/routes/routes";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  if (!categories) return <div>Categories not found</div>;

  return (
    <section className="wrapper flex flex-1 flex-col gap-2 py-4">
      <h1 className="py-2 text-3xl font-bold">All Categories</h1>
      <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-10 xl:gap-10">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`${ROUTES.CATEGORY}/${category.slug}`}
              key={category.id}
            >
              <div className="relative flex h-67 w-full justify-center bg-ui">
                <Image
                  src={category.image || "/static/images/placeholder.webp"}
                  alt=""
                  width={256}
                  height={256}
                  className="object-contain p-4 transition-transform hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-xl font-light tracking-wide">
                {category.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
