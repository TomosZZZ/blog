"use client";

import { useGetPostById } from "@/features/blog/api";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect, useMemo } from "react";
import { RichTextEditorExtensions } from "../../text-editor";
import { default as NextImage } from "next/image";
import { PostSkeleton } from "./post-skeleton";
import { Post as PostModel } from "@/features/blog/types/post";

type Props = {
  initialData: PostModel;
};

export const Post = ({ initialData }: Props) => {
  const { data, isLoading, isError, error } = useGetPostById(
    initialData.id,
    initialData
  );

  const post = data || initialData;

  const parsedContent = useMemo(() => {
    if (post?.content) {
      try {
        return JSON.parse(post.content);
      } catch (e) {
        console.error("Failed to parse editor content:", e);
        return "";
      }
    }
    return "";
  }, [post?.content]);

  const editor = useEditor({
    extensions: RichTextEditorExtensions,
    content: parsedContent,
    editable: false,
  });

  useEffect(() => {
    if (!editor || !parsedContent) {
      return;
    }

    try {
      const currentContent = editor.getJSON();

      if (JSON.stringify(currentContent) !== JSON.stringify(parsedContent)) {
        editor.commands.setContent(parsedContent, false);
      }
    } catch (e) {
      console.error("Failed to parse or set editor content:", e);
    }
  }, [parsedContent, editor]);

  if (isLoading || !post) {
    return <PostSkeleton />;
  }

  if (isError || !post) {
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
            {post.title}
          </h1>

          <div className="w-full relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <NextImage
              src={post.thumbnail}
              alt={`Thumbnail for ${post.title}`}
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
