import { z } from "zod";
import { loginSchema, signUpSchema } from "../schemas";

export type SignupDto = z.infer<typeof signUpSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
