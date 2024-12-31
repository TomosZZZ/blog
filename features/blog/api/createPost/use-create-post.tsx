import { useMutation } from "@tanstack/react-query";
import { Post } from "../../types/post";
import { useSession } from "next-auth/react";

export const useCreatePost = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const createPostMutation = useMutation({
    mutationFn: async (post: Post) => {
      const res = await fetch("localhost:8080/api/post/create", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    },
  });
  return createPostMutation;
};
