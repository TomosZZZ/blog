import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeletePostMutationData {
  postId: string;
  token: string;
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: async ({ postId, token }: DeletePostMutationData) => {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });
  return deletePostMutation;
};
