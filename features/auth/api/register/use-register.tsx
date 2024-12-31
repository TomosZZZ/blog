import { SignupDto } from "@/features";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const registerMutation = useMutation({
    mutationFn: async (data: SignupDto) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error occurred");
      }
      return res.json();
    },
  });
  return registerMutation;
};
