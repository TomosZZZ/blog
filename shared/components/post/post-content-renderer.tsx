import { RichTextEditorExtensions } from "@/features/blog/components/text-editor";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useMemo } from "react";

interface PostContentRendererProps {
  content: string;
}

export const PostContentRenderer = ({ content }: PostContentRendererProps) => {
  const parsedContent = useMemo(() => {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }, [content]);

  const editor = useEditor({
    extensions: RichTextEditorExtensions,
    content: parsedContent,
    editable: false,
  });
  if (!parsedContent) {
    return <div className="text-red-400">Invalid post content</div>;
  }

  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
};
