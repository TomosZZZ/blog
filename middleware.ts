import { auth } from "@/features/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isPublic =
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/auth");

  if (isPublic) {
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/blog", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next|favicon.ico).*)"],
};
