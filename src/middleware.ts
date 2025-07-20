import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { ProtectedRoutes } from "@/utils/config/routes/protected";
import { ROUTES } from "@/utils/config/routes/routes";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  console.log("middleware", token?.role, pathname);

  if (
    !token &&
    ProtectedRoutes.some((route) => pathname.startsWith(route.href))
  ) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.url));
  }

  // Check role
  const route = ProtectedRoutes.find((route) =>
    pathname.startsWith(route.href),
  );
  if (route && !route.access.includes(token?.role || "GUEST")) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static/).*)"],
};

// Your custom middleware logic goes here
// for (const route of ProtectedRoutes) {
//   if (pathname.startsWith(route.href)) {
//     if (!session) {
//       return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.url));
//     }

//     const userRole = session.user.role;
//     if (!route.access.includes(userRole)) {
//       return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.url));
//     }
//   }
// }
