export type UserAdminDto = {
  id: string;
  email: string;
  username: string;
  role: "USER" | "EDITOR" | "ADMIN";
  createdAt: string;
};
