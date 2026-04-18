"use client";

import { useEffect, useState } from "react";
import { useGetPosts } from "../api";
import { extractTextFromTipTapJSON } from "@/lib/utils";
import { Post } from "../types/post";

type UsePostDescriptionProps = {
  initialPosts?: Post[];
};

export const usePostDescriptions = ({
  initialPosts = [],
}: UsePostDescriptionProps) => {
  const {
    data,
    isLoading: isPostsLoading,
    isError,
  } = useGetPosts();
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isDescriptionsLoading, setIsDescriptionsLoading] = useState(false);

  useEffect(() => {
    if (!data) return;

    setIsDescriptionsLoading(true);

    const newDescriptions = data.map((post) => {
      try {
        const contentJson = JSON.parse(post.content);
        return extractTextFromTipTapJSON(contentJson);
      } catch {
        return "";
      }
    });

    setDescriptions(newDescriptions);
    setIsDescriptionsLoading(false);
  }, [data]);

  return {
    posts: data ?? initialPosts,
    descriptions,
    isLoading: isPostsLoading || isDescriptionsLoading,
    isError,
  };
};
