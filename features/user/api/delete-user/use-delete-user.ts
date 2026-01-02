import { apiFetch } from "@/lib/api-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type DeleteUserParams = {
  userId: string;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: DeleteUserParams) => {
      const res = await apiFetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to delete user");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
};
