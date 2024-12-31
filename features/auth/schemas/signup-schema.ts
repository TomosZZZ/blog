import { string, object } from "zod";

export const signUpSchema = object({
  username: string({ required_error: "Username is required" }).min(3, {
    message: "Username must be at least 3 characters long",
  }),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
