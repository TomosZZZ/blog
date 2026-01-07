import { useMutation } from "@tanstack/react-query";
import { PostStatus } from "../../types/post-status";
import { apiFetch } from "@/lib/api-fetch";

interface ChangePostStatusDto {
  status: PostStatus;
  postId: string;
}

export const useChangePostStatus = () => {
  return useMutation({
    mutationFn: async ({ status, postId }: ChangePostStatusDto) => {
      const res = await apiFetch(`/api/posts/${postId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, comment: null }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Failed to change status");
      }

      return res;
    },
  });
};
