import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../schemas";
import { UserRepository } from "@/features/user/repository";

import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success || !data) {
          return null;
        }

        const { email, password } = data;
        const userRepository = new UserRepository();

        if (!success || !data) {
          return null;
        }

        const user = await userRepository.getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
});
