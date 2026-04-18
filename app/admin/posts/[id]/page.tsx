import { PostEditor } from "@/features/admin/components/post-editor/post-editor";
import { Post } from "@/features/blog/types/post";
import React from "react";

interface UpdatePostPageProps {
  params: { id: string };
}

const UpdatePostPage = async ({ params }: UpdatePostPageProps) => {
  const res = await fetch(`http://localhost:8080/api/posts/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Post not found");

  const post = (await res.json()) as Post;
  return (
    <div className="flex items-center justify-center ">
      <PostEditor
        mode="edit"
        initialContent={post.content}
        postDetails={{
          id: post.id,
          title: post.title,
          thumbnail: post.thumbnail,
          status: post.status,
          reviewComment: post.reviewComment,
        }}
      />
    </div>
  );
};

export default UpdatePostPage;
