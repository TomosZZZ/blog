import { Post } from "../../types/post";

export const getPostsServer = async (): Promise<Post[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
