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
    data = initialPosts,
    isLoading: isPostsLoading,
    isError,
  } = useGetPosts();
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isDescriptionsLoading, setIsDescriptionsLoading] = useState(
    initialPosts.length > 0
  );

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
