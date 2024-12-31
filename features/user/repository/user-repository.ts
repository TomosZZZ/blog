import { signUpSchema } from "@/features/auth/schemas";
import { prisma } from "@/prisma/db";
import { z } from "zod";

export class UserRepository {
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async createUser(data: z.infer<typeof signUpSchema>) {
    return await prisma.user.create({
      data,
    });
  }
}

export const userRepository = new UserRepository();
