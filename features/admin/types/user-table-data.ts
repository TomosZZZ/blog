import { User } from "@prisma/client";

export type UserTableData = Pick<User, "id" | "username" | "email" | "role">;
