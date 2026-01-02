import { useMutation } from "@tanstack/react-query";
import { PostDTO } from "../../types/post";
import { apiFetch } from "@/lib/api-fetch";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (post: PostDTO) => {
      const res = await apiFetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const data = await res.json();
        const err = new Error(data?.message ?? "Validation error");
        (err as any).errors = data?.errors;
        throw err;
      }

      return res.json();
    },
  });
};
