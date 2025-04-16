import { DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";
declare module "next-auth/jwt" {
  export interface JWT extends Record<string, unknown>, DefaultJWT {
    role: Role;
  }
}
declare module "next-auth" {
  export interface Session extends DefaultSession {
    accessToken: string;
  }
  export interface User extends User {
    role: Role;
  }
}
