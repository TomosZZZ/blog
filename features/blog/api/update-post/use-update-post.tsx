import { PostDTO } from "@/features/blog/types/post";
import { useMutation } from "@tanstack/react-query";

interface UpdatePostParams {
  postId: string;
  post: Partial<PostDTO>;
  token: string;
}

export const useUpdatePost = () => {
  const updatePost = useMutation({
    mutationFn: async ({ postId, post, token }: UpdatePostParams) => {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Something went wrong");
      }
    },
    onSuccess: () => {
      console.log("Post updated successfully");
    },
    onError: (error: any) => {
      console.error("Error updating post:", error.message);
    },
  });
  return updatePost;
};
