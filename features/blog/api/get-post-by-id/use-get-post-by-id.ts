import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types/post";

export const useGetPostById = (postId: string) => {
  const getPostByIdQuery = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/posts/get/${postId}`
      );
      if (response.status === 404) {
        throw new Error("Post nie zostal znaleziony");
      }
      if (!response.ok) {
        throw new Error("Coś nie tak.");
      }
      const data: Post | null = await response.json();
      return data;
    },
    enabled: !!postId,
  });

  return getPostByIdQuery;
};
