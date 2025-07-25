import { Post } from "@/features/blog";
import React from "react";

type Props = {
  params: { slug: string };
};

const PostPage = ({ params }: Props) => {
  const { slug } = params;
  const postId = slug.split("~")[1];
  return (
    <div className="flex items-center justify-center">
      <Post postId={postId} />
    </div>
  );
};

export default PostPage;
