"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorMenu } from "./editor-menu";
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);

export const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1],
          HTMLAttributes: {
            class: "text-2xl font-bold",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "my-6 border-b border-gray-200",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-gray-700 p-2 rounded-md language-javascript",
        },
        defaultLanguage: "typescript",
      }),
      Typography,
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });
  console.log(editor?.getHTML());
  return (
    <div className="w-3/4   text-white ">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
