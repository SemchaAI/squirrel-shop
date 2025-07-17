import {
  CableIcon,
  ContactIcon,
  HandshakeIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
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
  CATEGORY: "/categories",
  VERIFY: "/verify",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

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
  FORGOT_PASSWORD: "/api/forgot-password",
};
export const ADMIN_ROUTES = {
  ADMIN: "/admin",
  PRODUCTS: "/admin/products",
  PRODUCT: "/admin/product",
};

export const NavRoutes: TNavRoute[] = [
  { name: "Contacts", href: ROUTES.CONTACT, Icon: ContactIcon },

  {
    name: "Categories",
    Icon: ContactIcon,
    href: ROUTES.CATEGORY,
    children: [
      {
        name: "Smartphones",
        href: `${ROUTES.CATEGORY}/smartphones`,
        Icon: SmartphoneIcon,
      },
      { name: "Tablets", href: `${ROUTES.CATEGORY}/tablets`, Icon: TabletIcon },
      {
        name: "Accessories",
        href: `${ROUTES.CATEGORY}/accessories`,
        Icon: CableIcon,
      },
    ],
  },
  { name: "Deals", href: ROUTES.DEALS, Icon: HandshakeIcon },
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
