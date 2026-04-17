import { ReviewPost } from "@/features";
import { Post } from "@/features/blog/types/post";
import React from "react";

interface PostReviewPageProps {
  params: { id: string };
}

const PostReviewPage = async ({ params }: PostReviewPageProps) => {
  const res = await fetch(`http://localhost:8080/api/posts/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Post not found");

  const post = (await res.json()) as Post;

  return <ReviewPost post={post} />;
};
export default PostReviewPage;
