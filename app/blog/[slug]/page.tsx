import { Post } from "@/features";
import { getPostById, getPosts, getPostsServer } from "@/features/blog/api";

import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { slug: string };
};

type PostParams = {
  slug: string;
};

export async function generateStaticParams(): Promise<PostParams[]> {
  const posts = await getPostsServer();

  return posts.map((post) => ({ slug: post.slug }));
}

const PostPage = async ({ params }: Props) => {
  const { slug } = params;
  const postId = slug.split("~")[1];
  try {
    const post = await getPostById(postId);
    if (!post) {
      notFound();
    }
    return (
      <div className="flex items-center justify-center">
        <Post initialData={post} />
      </div>
    );
  } catch (error: any) {
    notFound();
  }
};

export default PostPage;
