import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // Jika belum login dan coba akses dashboard, redirect ke login
  if (isDashboardPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login dan coba akses login, redirect ke dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
