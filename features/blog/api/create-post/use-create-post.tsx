import { useMutation } from "@tanstack/react-query";
import { PostDTO } from "../../types/post";

interface CreatePostMutationData {
  post: PostDTO;
  token: string;
}

export const useCreatePost = () => {
  const createPostMutation = useMutation({
    mutationFn: async ({ post, token }: CreatePostMutationData) => {
      const res = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
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
  });
  return createPostMutation;
};
