import { useMutation } from "@tanstack/react-query";
import { PostDTO } from "../../types/post";

interface CreatePostMutationData {
  post: PostDTO;
  token: string;
}

export const useCreatePost = () => {
  const createPostMutation = useMutation({
    mutationFn: async ({ post, token }: CreatePostMutationData) => {
      const res = await fetch("http://localhost:8080/api/post/create", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    },
  });
  return createPostMutation;
};
