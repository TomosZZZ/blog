import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({
      userId,
      newRole,
      token,
    }: {
      userId: string;
      newRole: string;
      token: string;
    }) => {
      const res = await fetch(
        `http://localhost:8080/api/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!res.ok) {
        let errorMessage = "Something went wrong updating user role";

        try {
          const data = await res.json();
          if (data && data.message) {
            errorMessage = data.message;
          }
        } catch (e) {
          const text = await res.text();
          if (text) {
            errorMessage = text;
          }
        }

        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong updating user role");
    },
  });
  return updateUserRoleMutation;
};
