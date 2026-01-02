import { apiFetch } from "@/lib/api-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserRole } from "@/features/user/types";

type UpdateUserRoleParams = {
  userId: string;
  newRole: UserRole;
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, newRole }: UpdateUserRoleParams) => {
      const res = await apiFetch(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to update user role");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update user role");
    },
  });
};
