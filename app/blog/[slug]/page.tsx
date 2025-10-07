import { Post } from "@/features";
import { getPostById, getPosts } from "@/features/blog/api";
import { Post as PostModel } from "@/features/blog/types/post";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { slug: string };
};

type PostParams = {
  slug: string;
};

export async function generateStaticParams(): Promise<PostParams[]> {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

const PostPage = async ({ params }: Props) => {
  const { slug } = params;
  const postId = slug.split("~")[1];

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center">
      <Post initialData={post} />
    </div>
  );
};

export default PostPage;
