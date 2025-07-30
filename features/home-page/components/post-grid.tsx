"use client";

import React from "react";
import { motion } from "framer-motion";

import { usePostDescriptions } from "@/features/blog";
import { PostCard } from "@/features/blog/components/blog/post/post-card";
import { silkscreen } from "@/shared/fonts";
import { Post } from "@/features/blog/types/post";
export const PostGrid = () => {
  const { posts, descriptions, isLoading, isError } = usePostDescriptions();

  const getSortedPosts = (posts: Post[]) => {
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  return (
    <>
      {!isLoading && !isError && (
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={`text-2xl font-semibold mb-8 ${silkscreen.className}`}>
            🚀 Check out the latest articles
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center ">
            {getSortedPosts(posts || [])
              .slice(0, 3)
              .map((post, index) => (
                <PostCard
                  key={post.id}
                  description={descriptions[index]}
                  title={post.title}
                  slug={post.slug}
                  thumbnail={post.thumbnail}
                  date={post.createdAt.toString().split("T")[0]}
                />
              ))}
          </div>
        </motion.div>
      )}
    </>
  );
};
