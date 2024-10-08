import NextAuth from "next-auth";
import { authConfig } from "@/features/auth/config/auth.config";

export const { auth: middleware } = NextAuth(authConfig);
