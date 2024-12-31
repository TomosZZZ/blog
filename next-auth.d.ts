import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  export interface JWT extends Record<string, unknown>, DefaultJWT {
    id: string;
  }
}
