import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-fetch";
import { PostPanelDto } from "@/features/admin/dto";

const getPostsForPanel = async (scope: string) => {
  const res = await apiFetch(`/api/posts/panel?scope=${scope}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Something went wrong while fetching posts");
  }

  return res.json() as Promise<PostPanelDto[]>;
};

export const useGetPostsForPanel = (scope: string) => {
  const getPostsQuery = useQuery({
    queryKey: ["panel-posts", scope],
    queryFn: () => getPostsForPanel(scope),
  });
  return getPostsQuery;
};
