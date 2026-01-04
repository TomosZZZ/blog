import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types/post";
import { apiFetch } from "@/lib/api-fetch";

const getPostsForPanel = async (scope: string) => {
  const res = await apiFetch(`/api/posts/panel?scope=${scope}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Something went wrong while fetching posts");
  }

  return res.json() as Promise<Post[]>;
};

export const useGetPostsForPanel = (scope: string) => {
  const getPostsQuery = useQuery({
    queryKey: ["panel-posts", scope],
    queryFn: () => getPostsForPanel(scope),
  });
  return getPostsQuery;
};
