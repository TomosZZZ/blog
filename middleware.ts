import NextAuth from "next-auth";
import { authConfig } from "@/features/auth/config/auth.config";
import {
  ADMIN_ROUTES,
  ADMIN_ROUTES_REGEX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "./features/auth/config/routes";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const { auth } = NextAuth(authConfig);

const isAdminRoute = (pathname: string): boolean => {
  if (ADMIN_ROUTES.includes(pathname)) return true;

  for (const regex of ADMIN_ROUTES_REGEX) {
    if (regex.test(pathname)) {
      return true;
    }
  }
  return false;
};

export default auth(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;

  let isAdmin = false;
  if (auth?.accessToken) {
    try {
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
      const { payload } = await jwtVerify(auth.accessToken, secret);
      isAdmin = payload.role === "ADMIN";
    } catch (error) {
      console.error("Failed to decode token:", error);
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
  }

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPublicRoute = !isAdminRoute(nextUrl.pathname) && !isAuthRoute;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isAdminRoute(nextUrl.pathname) && !isAdmin) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
