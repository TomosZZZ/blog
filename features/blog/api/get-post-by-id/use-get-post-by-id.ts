import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types/post";

export const getPostById = async (postId: string) => {
  const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
  if (response.status === 404) {
    throw new Error("Post was not found");
  }
  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (_) {}

    throw new Error(errorMessage);
  }
  const data: Post | null = await response.json();
  return data;
};

export const useGetPostById = (postId: string, initialData?: Post) => {
  const getPostByIdQuery = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    initialData: initialData,
  });

  return getPostByIdQuery;
};
