"use client";

import { Loader } from "@/shared/components";
import { silkscreen } from "@/shared/fonts";
import { usePostDescriptions } from "../../hooks/usePostDescription";
import { PostCard } from "./post/post-card";

export const Blog = () => {
  const { posts, descriptions, isLoading, isError } = usePostDescriptions();

  return (
    <div className="text-white w-full px-4 sm:px-6 lg:px-8">
      <h1
        className={`text-4xl font-bold text-center my-8 md:my-12 ${silkscreen.className}`}
      >
        Blog
      </h1>

      {isLoading && <Loader />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-4">
        {!isLoading &&
          !isError &&
          posts?.map((post, index) => (
            <PostCard
              key={post.id}
              date={post.createdAt.toString().split("T")[0]}
              title={post.title}
              description={descriptions[index]}
              thumbnail={post.thumbnail}
              slug={post.slug}
            />
          ))}
        {posts?.length === 0 && !isLoading && !isError && (
          <div className="text-center col-span-full w-full">
            No posts available.
          </div>
        )}
      </div>
    </div>
  );
};
