// Post.tsx

"use client";

import { useGetPostById } from "@/features/blog/api";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect } from "react";
import { RichTextEditorExtensions } from "../../text-editor";
import { default as NextImage } from "next/image";
import { PostSkeleton } from "./post-skeleton";

type Props = {
  postId: string;
};

export const Post = ({ postId }: Props) => {
  const { data, isLoading, isError, error } = useGetPostById(postId);

  const editor = useEditor({
    extensions: RichTextEditorExtensions,
    content: "",
    editable: false,
  });

  useEffect(() => {
    if (!editor || !data?.content) {
      return;
    }

    try {
      const newContent = JSON.parse(data.content);

      const currentContent = editor.getJSON();

      if (JSON.stringify(currentContent) !== JSON.stringify(newContent)) {
        editor.commands.setContent(newContent, false);
      }
    } catch (e) {
      console.error("Failed to parse or set editor content:", e);
    }
  }, [data, editor]);

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="text-red-500 text-center py-20">
        <h2>Something went wrong!</h2>
        <p>{error?.message || "Post could not be loaded."}</p>
      </div>
    );
  }

  return (
    <article className="text-white w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            {data.title}
          </h1>

          <div className="w-full relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <NextImage
              src={data.thumbnail}
              alt={`Thumbnail for ${data.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
              priority
            />
          </div>
        </div>

        <div className="prose prose-lg prose-invert max-w-none py-5">
          <EditorContent editor={editor} />
        </div>
      </div>
    </article>
  );
};
