import React from "react";

export const PostSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      <div className="w-full relative aspect-video bg-neutral-700 rounded-lg"></div>
      <div className="h-10 bg-neutral-700 rounded w-3/4 mx-auto mt-8"></div>
      <div className="space-y-4 mt-10">
        <div className="h-4 bg-neutral-700 rounded w-full"></div>
        <div className="h-4 bg-neutral-700 rounded w-full"></div>
        <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
        <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
        <br />
        <div className="h-4 bg-neutral-700 rounded w-full"></div>
        <div className="h-4 bg-neutral-700 rounded w-4/6"></div>
      </div>
    </div>
  );
};
