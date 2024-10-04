import { signUpSchema } from "@/features/auth/schemas";
import { userRepository } from "../repository";
import bcrypt from "bcryptjs";
import { SignupDto } from "@/features/auth";

export class UserService {
  async getUserByEmail(email: string) {
    return userRepository.getUserByEmail(email);
  }
  async getUserByUsername(username: string) {
    return userRepository.getUserByUsername(username);
  }

  async createUser(data: SignupDto) {
    const { email, username, password } = data;
    const { success: dataIsValid, error } = signUpSchema.safeParse(data);
    console.log(error?.errors);
    error?.errors?.forEach((err) => {
      console.log(err.message);
    });
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
  }
}

export const userService = new UserService();
