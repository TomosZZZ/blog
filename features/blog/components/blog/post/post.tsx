"use client";

import { useGetPostById } from "@/features/blog/api";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import { RichTextEditorExtensions } from "../../text-editor";
import Image from "next/image";

type Props = {
  postId: string;
};

export const Post = ({ postId }: Props) => {
  const { data, isLoading, isError, error } = useGetPostById(postId);
  const [parsedContent, setParsedContent] = useState(null);

  useEffect(() => {
    if (!data?.content) return;

    try {
      const contentJson = JSON.parse(data.content);
      setParsedContent(contentJson);
    } catch (e) {
      console.error("Error parsing content:", e);
    }
  }, [data]);

  const editor = useEditor({
    extensions: RichTextEditorExtensions,
    content: parsedContent || null,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || !parsedContent) return;

    editor.commands.setContent(parsedContent);
  }, [parsedContent, editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (isLoading)
    return <div className="text-white text-center">Loading...</div>;

  if (isError)
    return (
      <div className="text-red-500 text-center">Błąd: {error.message}</div>
    );

  if (!parsedContent)
    return <div className="text-white text-center">Ładowanie treści...</div>;

  return (
    <div className="text-white w-3/4 mx-auto">
      {data && (
        <div className="flex flex-col gap-6">
          <div className="w-full mx-auto relative aspect-video overflow-hidden">
            <Image
              src={data.thumbnail}
              alt={`Thumbnail for ${data.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center ">{data.title}</h1>
          <div className="prose prose-invert max-w-none py-5">
            <EditorContent editor={editor} />
          </div>
        </div>
      )}
    </div>
  );
};
