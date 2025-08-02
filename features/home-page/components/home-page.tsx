import React from "react";
import { Header } from "./header";
import { inter } from "@/shared/fonts";
import { PostGrid } from "./post-grid";

export const HomePage = () => {
  return (
    <div
      className={`flex flex-col items-center text-white w-full px-4 sm:px-6 lg:px-8 py-5 ${inter.className}`}
    >
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <PostGrid />
      </div>
    </div>
  );
};
