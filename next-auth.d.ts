import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserRole } from "./features/user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: DefaultSession["user"] & {
      role: UserRole;
    };
  }

  interface User {
    id: string;
    email: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    role: UserRole;
  }
}
