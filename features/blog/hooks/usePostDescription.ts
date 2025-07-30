"use client";

import { useEffect, useState } from "react";
import { useGetPosts } from "../api";
import { extractTextFromTipTapJSON } from "@/lib/utils";

export const usePostDescriptions = () => {
  const { data, isLoading: isPostsLoading, isError } = useGetPosts();
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isDescriptionsLoading, setIsDescriptionsLoading] = useState(true);

  useEffect(() => {
    if (!data) return;

    setIsDescriptionsLoading(true);

    const newDescriptions = data.map((post) => {
      try {
        const contentJson = JSON.parse(post.content);
        return extractTextFromTipTapJSON(contentJson);
      } catch (error) {
        return "";
      }
    });

    setDescriptions(newDescriptions);
    setIsDescriptionsLoading(false);
  }, [data]);

  return {
    posts: data,
    descriptions,
    isLoading: isPostsLoading || isDescriptionsLoading,
    isError,
  };
};
