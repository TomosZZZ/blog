import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

const getUsers = async (authHeader: string) => {
  const res = await fetch("http://localhost:8080/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = (await res.json()) as User[];
  return data;
};

export const useGetUsers = (token: string) => {
  const getUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(`Bearer ${token}`),
  });
  return getUsersQuery;
};
