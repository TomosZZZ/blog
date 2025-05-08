"use client";
import { useGetPosts } from "@/features/blog/api";
import { extractTextFromTipTapJSON } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Blog = () => {
  const { data, isLoading, isError } = useGetPosts();
  const [postDescriptions, setPostDescriptions] = useState<string[]>([]);
  const [areDescriptionsLoading, setDescriptionsLoading] = useState(false);

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
      <h1 className="text-4xl font-bold">Blog</h1>
    </div>
  );
};
