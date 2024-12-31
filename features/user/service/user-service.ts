import { loginSchema, signUpSchema } from "@/features/auth/schemas";
import { userRepository } from "../repository";
import bcrypt from "bcryptjs";
import { LoginDto, signIn, SignupDto } from "@/features/auth";
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { INSTANCE_OF_PRISMA_ERROR } from "@/constants";

export class UserService {
  private async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async getUserByEmail(email: string) {
    return userRepository.getUserByEmail(email);
  }
  async getUserByUsername(username: string) {
    return userRepository.getUserByUsername(username);
  }

  async createUser(data: SignupDto) {
    try {
      const { email, username, password } = data;
      const { success: dataIsValid, error } = signUpSchema.safeParse(data);

      if (!dataIsValid) {
        const errorMessageArr = error?.errors?.map((err) => err.message);
        const errorMessage = errorMessageArr.join(", ") ?? "Invalid data";
        throw new Error(errorMessage);
      }
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      const existingUsername = await this.getUserByUsername(data.username);
      if (existingUsername) {
        throw new Error("Username is already taken. Find another one");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      return userRepository.createUser({
        email,
        username,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error(error.message);
      } else if (INSTANCE_OF_PRISMA_ERROR(error)) {
        throw new Error("There was an error with the database");
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
  async login(data: LoginDto) {
    try {
      const { success } = loginSchema.safeParse(data);

      if (!success) {
        throw new Error("Invalid data");
      }
      const { email, password } = data;
      const user = await this.getUserByEmail(email);

      if (!user || !user.password) {
        throw new Error("User not found");
      }
      const passwordsMatch = await this.validatePassword(
        password,
        user.password
      );
      if (!passwordsMatch) {
        throw new Error("Invalid password");
      }

      return signIn("credentials", {
        email,
        password,
        redirectTo: "/blog",
        redirect: true,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error(error.message);
      } else if (INSTANCE_OF_PRISMA_ERROR(error)) {
        throw new Error("There was an error with the database");
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

export const userService = new UserService();
