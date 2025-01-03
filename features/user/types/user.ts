import { Role } from "@prisma/client";
import { User as NextUser } from "next-auth";

export interface User extends NextUser {
  password: string | null;
  emailVerified: Date | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
