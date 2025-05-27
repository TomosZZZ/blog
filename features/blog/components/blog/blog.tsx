"use client";
import { useGetPosts } from "@/features/blog/api";
import { extractTextFromTipTapJSON } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PostCard } from "./post-card";
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({ weight: "700", subsets: ["latin"] });

export const Blog = () => {
  const { data, isLoading, isError } = useGetPosts();
  const [postDescriptions, setPostDescriptions] = useState<string[]>([]);
  const [areDescriptionsLoading, setDescriptionsLoading] = useState(true);

  useEffect(() => {
    if (!data) return;

    setDescriptionsLoading(true);

    const descriptions: string[] = [];

    for (const post of data) {
      try {
        const contentJson = JSON.parse(post.content);
        const text = extractTextFromTipTapJSON(contentJson);
        descriptions.push(text);
      } catch (e) {
        descriptions.push("");
      }
    }
    setPostDescriptions(descriptions);
    setDescriptionsLoading(false);
  }, [data]);

  return (
    <div className="text-white">
      <h1
        className={`text-4xl font-bold text-center my-5 md:my-10 ${silkscreen.className}`}
      >
        Blog
      </h1>
      <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center my-4">
        {!isLoading &&
          !isError &&
          !areDescriptionsLoading &&
          data?.map((post, index) => (
            <PostCard
              date={post.createdAt.toString().split("T")[0]}
              key={post.id}
              title={post.title}
              description={postDescriptions[index]}
              thumbnail={post.thumbnail}
            />
          ))}
      </div>
    </div>
  );
};
