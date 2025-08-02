"use client";

import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { silkscreen } from "@/shared/fonts";

export const Header = () => {
  return (
    <motion.header
      className={`text-center ${silkscreen.className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {" "}
        👋 Hi, I&apos;m Tomek – a beginner fullstack developer.
        <br />I write about building projects with{" "}
        <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
          Next.js
        </span>
        ,{" "}
        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
          TypeScript
        </span>
        , and{" "}
        <span className="bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
          Spring Boot
        </span>
        .
      </h1>
      <Separator className="bg-white/20 my-10 md:my-12" />
    </motion.header>
  );
};
