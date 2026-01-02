import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types/post";

export const getPosts = async () => {
  const res = await fetch("/api/posts", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Something went wrong while fetching posts");
  }

  return res.json() as Promise<Post[]>;
};

export const useGetPosts = () => {
  const getPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return getPostsQuery;
};
