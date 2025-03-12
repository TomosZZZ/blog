import NextAuth from "next-auth";
import { authConfig } from "@/features/auth/config/auth.config";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "./features/auth/config/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;
  const isAdmin = auth?.accessToken.role === "ADMIN";
  console.log("Current path:", nextUrl.pathname);
  console.log(["isLoggedIn", isLoggedIn, "isAdmin", isAdmin]);

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname);
  const isPublicRoute = !isAdminRoute && !isAuthRoute;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (isAdminRoute && !isAdmin) {
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
