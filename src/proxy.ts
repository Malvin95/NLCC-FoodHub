import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
  function middleware(req) {
    // Redirect authenticated users away from auth pages
    if (req.nextUrl.pathname.startsWith("/auth") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Redirect unauthenticated users to landing page instead of auto sign-in
    if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};