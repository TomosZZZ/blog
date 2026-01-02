import { PostDTO } from "@/features/blog/types/post";
import { apiFetch } from "@/lib/api-fetch";
import { useMutation } from "@tanstack/react-query";

interface UpdatePostParams {
  postId: string;
  post: Partial<PostDTO>;
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: async ({ postId, post }: UpdatePostParams) => {
      const res = await apiFetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to update post");
      }
    },
  });
};
