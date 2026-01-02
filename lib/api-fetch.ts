import { signOut } from "next-auth/react";

export const apiFetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, {
    credentials: "include",
    ...init,
  });

  if (res.status === 401) {
    await signOut({ callbackUrl: "/auth/login" });
    throw new Error("Session expired");
  }

  return res;
};
