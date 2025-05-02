import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/sign-in", "/sign-up"];

const isPublic = (path) => {
  return publicPaths.find((x) => path.match(new RegExp(`^${x}$`)));
};

export default authMiddleware({
  publicRoutes: publicPaths,
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !isPublic(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Handle users who are authenticated but don't have an organization
    // when trying to access protected routes
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== "/onboarding" &&
      !isPublic(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
