"use client";

import { Button } from "@/components/ui/button";
import { useChangePostStatus } from "@/features/blog/api";
import { Post } from "@/features/blog/types/post";
import { PostStatus } from "@/features/blog/types/post-status";
import { PostContentRenderer } from "@/shared/components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface ReviewPostProps {
  post: Post;
}

export const ReviewPost = ({ post }: ReviewPostProps) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const toReview = post.status === "IN_REVIEW";
  const { mutate: changePostStatus, isPending } = useChangePostStatus();
  const router = useRouter();

  const approveHandler = () => {
    changePostStatus(
      {
        postId: post.id,
        status: PostStatus.APPROVED,
      },
      {
        onSuccess: () => {
          toast.success("Post approved successfully");
          router.replace("/admin/posts");
        },
        onError: (error) => {
          toast.error(`Something went wrong`);
        },
      }
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
        <div className="flex flex-row justify-between mb-6">
          <p className="mb-2">Author: {post.authorEmail}</p>
          <p className="mb-2">Status: {post.status}</p>
        </div>
      </div>
      <PostContentRenderer content={post.content} />
      {toReview && (
        <div className="flex gap-5 mt-10 justify-end">
          <Button
            onClick={approveHandler}
            variant="ghost"
            className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
          >
            Approve
          </Button>
          <Button
            variant="ghost"
            className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};
