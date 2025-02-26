import { useMutation } from "@tanstack/react-query";
import { PostDTO } from "../../types/post";
import { useSession } from "next-auth/react";

export const useCreatePost = () => {
  const { data: sessionData } = useSession();

  const createPostMutation = useMutation({
    mutationFn: async (post: PostDTO) => {
      const res = await fetch("http://localhost:8080/api/post/create", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionData?.accessToken,
        },
      });

      const data = await res.json();
      return data;
    },
  });
  return createPostMutation;
};
