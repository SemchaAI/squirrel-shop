import { ContactIcon, HandshakeIcon, ShoppingCartIcon } from "lucide-react";
import type { TNavRoute } from "@/models/routes";

import { Role } from "@prisma/client";

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  FAVORITE: "/favorite",
  PRODUCT: "/product",
  CHECKOUT: "/checkout",
  CART: "/cart",
  PROFILE: "/profile",
  CATEGORY: "/category",
  VERIFY: "/verify",

  CONTACT: "#",
  SHOP: "#",
  DEALS: "#",
};
export const API_ROUTES = {
  CART: "/api/cart",
  FAVORITE: "/api/favorite",
  CHECKOUT: "/api/checkout-session",
  PRODUCT: "/api/admin/product",
  SEARCH: "/api/search",
  MEDIA: "/api/search/media",
  ACTIVATION: "/api/activation",
};
export const ADMIN_ROUTES = {
  ADMIN: "/admin",
  PRODUCTS: "/admin/products",
  PRODUCT: "/admin/product",
};

export const NavRoutes: TNavRoute[] = [
  { name: "Shop", href: ROUTES.SHOP, Icon: ShoppingCartIcon },
  { name: "Deals", href: ROUTES.DEALS, Icon: HandshakeIcon },
  { name: "Contacts", href: ROUTES.CONTACT, Icon: ContactIcon },
];
export const ProtectedRoutes: { href: string; access: Role[] }[] = [
  {
    href: ROUTES.PROFILE,
    access: [Role.USER, Role.ADMIN],
  },
  {
    href: ROUTES.FAVORITE,
    access: [Role.USER, Role.ADMIN],
  },
  {
    href: ADMIN_ROUTES.ADMIN,
    access: [Role.ADMIN],
  },
];
