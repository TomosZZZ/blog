import { UserAdminDto } from "@/features/user/types";

export type UserTableData = Pick<
  UserAdminDto,
  "id" | "username" | "email" | "role"
>;
