import { NavLink } from "@/components/features/links/NavLink";
import { ADMIN_ROUTES } from "@/utils/config/routes/adminRoutes";
// import Link from "next/link";

// interface IProps {}
const asideRoutes = [
  {
    name: "Products (Home)",
    href: `${ADMIN_ROUTES.ADMIN}`,
  },
  {
    name: "Product Variants",
    href: `${ADMIN_ROUTES.PRODUCTS}`,
  },
  {
    name: "Orders",
    href: `${ADMIN_ROUTES.ORDERS}`,
  },
  {
    name: "Reviews",
    href: `${ADMIN_ROUTES.REVIEWS}`,
  },
  {
    name: "Categories",
    href: `${ADMIN_ROUTES.CATEGORIES}`,
  },
  {
    name: "Variations",
    href: `${ADMIN_ROUTES.VARIATIONS}`,
  },
  {
    name: "Variations Options",
    href: `${ADMIN_ROUTES.VARIATIONS_OPTIONS}`,
  },
];

export const AdminAside = () => {
  return (
    <aside className="flex w-80 flex-col gap-5 border-r border-border bg-ui py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
      <div className="flex flex-col gap-2">
        {asideRoutes.map((route) => (
          <NavLink
            className="rounded-md px-2 py-1 transition-colors hover:bg-app"
            key={route.name}
            href={route.href}
          >
            {route.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
