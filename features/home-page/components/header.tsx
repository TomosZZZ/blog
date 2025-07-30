"use client";

import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { silkscreen } from "@/shared/fonts";
export const Header = () => {
  return (
    <motion.div
      className={`mx-auto ${silkscreen.className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <h1 className="text-xl lg:text-2xl text-center font-bold leading-snug">
          👋 Hi, I&apos;m Tomek – a beginner fullstack developer.
          <br />I write about building projects with
          <span className="text-blue-600"> Next.js</span>,
          <span className="text-yellow-600"> TypeScript</span>,and
          <span className="text-green-600"> Spring Boot</span>.
        </h1>
      </div>
      <Separator className="bg-white/20 my-8" />
    </motion.div>
  );
};
