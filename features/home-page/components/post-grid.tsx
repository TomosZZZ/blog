"use client";

import React from "react";
import { motion } from "framer-motion";

import { usePostDescriptions } from "@/features/blog";
import { PostCard } from "@/features/blog/components/blog/post/post-card";
import { silkscreen } from "@/shared/fonts";
import { Post } from "@/features/blog/types/post";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const PostGrid = () => {
  const { posts, descriptions, isLoading, isError } = usePostDescriptions({});

  const getSortedPosts = (posts: Post[]) => {
    return posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  return (
    <>
      {!isLoading && !isError && (
        <section className="w-full text-center">
          <h2
            className={`text-3xl lg:text-4xl font-semibold mb-10 ${silkscreen.className}`}
          >
            🚀 Check out the latest articles
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            {getSortedPosts(posts || [])
              .slice(0, 3)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={gridItemVariants}
                  className="h-full flex"
                >
                  <PostCard
                    description={descriptions[index]}
                    title={post.title}
                    slug={post.slug}
                    thumbnail={post.thumbnail}
                    date={post.createdAt.toString().split("T")[0]}
                  />
                </motion.div>
              ))}
          </motion.div>
        </section>
      )}
    </>
  );
};
