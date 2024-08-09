import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token")?.value;
  const returnUrl = request.nextUrl.searchParams.get("returnUrl");
  const nextPath = request.nextUrl.pathname;

  if (!isLoggedIn && config.matcher.includes(nextPath)) {
    return NextResponse.redirect(
      new URL(`/auth?returnUrl=${nextPath}`, request.nextUrl)
    );
  }

  if (isLoggedIn && nextPath === "/auth") {
    return NextResponse.redirect(
      new URL(returnUrl || "/dashboard", request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth"],
};
