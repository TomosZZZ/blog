import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types/post";

export const getPosts = async () => {
  const res = await fetch("http://localhost:8080/api/posts/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Something went wrong while fetching posts");
  }
  const data = (await res.json()) as Post[];
  return data;
};

export const useGetPosts = () => {
  const getPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return getPostsQuery;
};
