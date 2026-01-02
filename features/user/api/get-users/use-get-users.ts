import { UserAdminDto } from "@/features/user/types";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-fetch";

const getUsers = async (): Promise<UserAdminDto[]> => {
  const res = await apiFetch("/api/users");

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch users");
  }

  return res.json();
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
