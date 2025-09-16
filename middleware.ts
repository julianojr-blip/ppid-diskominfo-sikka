import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cek login status dari localStorage (client-side)
  // Note: Middleware runs server-side, so we can't access localStorage directly
  // This is a simplified version. For production, use cookies or JWT
  
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  
  // Untuk sekarang, kita allow akses ke login page
  // Proteksi proper akan di handle di client-side
  if (isAdminRoute && !isLoginPage) {
    // Cek cookie atau token di sini untuk production
    // Untuk development, kita allow dulu
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
