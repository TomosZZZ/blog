import { useMutation } from "@tanstack/react-query";
import { PostStatus } from "../../types/post-status";
import { apiFetch } from "@/lib/api-fetch";

interface ChangePostStatusDto {
  status: PostStatus;
  postId: string;
  comment?: string;
}

export const useChangePostStatus = () => {
  return useMutation({
    mutationFn: async ({ status, postId, comment }: ChangePostStatusDto) => {
      const res = await apiFetch(`/api/posts/${postId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, comment: comment ?? null }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Failed to change status");
      }

      return res;
    },
  });
};
