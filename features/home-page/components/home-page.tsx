import React from "react";
import { Header } from "./header";
import { inter } from "@/shared/fonts";
import { PostGrid } from "./post-grid";

export const HomePage = () => {
  return (
    <div
      className={`flex flex-col items-center text-white w-[90%] sm:w-[85%] mx-auto py-5 ${inter.className}`}
    >
      <Header />

      <PostGrid />
    </div>
  );
};
