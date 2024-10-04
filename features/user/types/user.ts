import { User as NextUser } from "next-auth";

export interface User extends NextUser {
  password: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
