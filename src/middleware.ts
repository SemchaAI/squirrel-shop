// export { auth as middleware } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
// import NextAuth from "next-auth";
import { auth } from "./auth";
import { ProtectedRoutes, ROUTES } from "./utils/config/routes";

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  console.log("middleware", session?.user.role, pathname);
  // Your custom middleware logic goes here
  for (const route of ProtectedRoutes) {
    if (pathname.startsWith(route.href)) {
      if (!session) {
        return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.url));
      }

      const userRole = session.user.role;
      if (!route.access.includes(userRole)) {
        return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.url));
      }
    }
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static/).*)"],
};
