"use client";

import { PostCard } from "./post/post-card";
import { silkscreen } from "@/shared/fonts";
import { usePostDescriptions } from "../../hooks/usePostDescription";
import { BarLoader } from "react-spinners";
import { Loader } from "@/shared/components";

export const Blog = () => {
  const { posts, descriptions, isLoading, isError } = usePostDescriptions();
  return (
    <div className="text-white">
      <h1
        className={`text-4xl font-bold text-center my-5 md:my-10 ${silkscreen.className}`}
      >
        Blog
      </h1>
      {isLoading && <Loader />}
      <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center my-4">
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
      </div>
    </div>
  );
};
