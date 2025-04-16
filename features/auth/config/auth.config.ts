import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../schemas";
import { UserRepository } from "@/features/user/repository";
import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success || !data) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = data;
        const userRepository = new UserRepository();

        const user = await userRepository.getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("Invalid email");
        }

        const passwordsMatch = await bcryptjs.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
      if (!secret) {
        throw new Error("Auth secret is not defined");
      }

      session.accessToken = await new SignJWT(token)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.role) {
        token.role = user.role;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
