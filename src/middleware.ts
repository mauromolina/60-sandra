import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("admin_auth");

  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new NextResponse("Server configuration error", { status: 500 });
  }

  const url = request.nextUrl.clone();
  const passwordParam = url.searchParams.get("password");

  if (passwordParam === adminPassword) {
    url.searchParams.delete("password");
    const response = NextResponse.redirect(url);
    response.cookies.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  return new NextResponse("Unauthorized - provide password via ?password= parameter", {
    status: 401,
  });
}
