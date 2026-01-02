import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../schemas";
import { UserRole } from "@/features/user/types";

type AuthUser = {
  id: string;
  email: string;
  accessToken: string;
  role: UserRole;
};

export const authConfig = {
  providers: [
    Credentials({
      name: "Spring Backend",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { success, data: parsedCredentials } =
          loginSchema.safeParse(credentials);

        if (!success || !parsedCredentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = parsedCredentials;
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (!res.ok) {
          return null;
        }

        const data = await res.json();

        return {
          id: email,
          email,
          accessToken: data.accessToken,
          role: data.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.accessToken = authUser.accessToken;
        token.role = authUser.role;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
