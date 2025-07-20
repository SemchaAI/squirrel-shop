import type { Role } from "@prisma/client";
import { ROUTES } from "./routes";
import { ADMIN_ROUTES } from "./adminRoutes";

export const ProtectedRoutes: { href: string; access: Role[] }[] = [
  {
    href: ROUTES.PROFILE,
    access: ["USER", "ADMIN"],
  },
  {
    href: ROUTES.FAVORITE,
    access: ["USER", "ADMIN"],
  },
  {
    href: ADMIN_ROUTES.ADMIN,
    access: ["ADMIN"],
  },
];
