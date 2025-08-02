import { NavLink } from "@/components/features/links/NavLink";
// import Link from "next/link";

// interface IProps {}

export const AdminAside = () => {
  return (
    <aside className="flex w-80 flex-col gap-5 border-r border-border bg-ui py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
      {/* <Link href="/admin">Home</Link> */}
      <NavLink href="/admin">Products (Home)</NavLink>
      <NavLink href="/admin/products">Product Variants</NavLink>
      <NavLink href="/admin/orders">Orders</NavLink>
      <NavLink href="/admin/reviews">Reviews</NavLink>
      <NavLink href="/admin/categories">Categories</NavLink>
    </aside>
  );
};
