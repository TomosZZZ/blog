"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorMenu } from "./editor-menu";
import { all, createLowlight } from "lowlight";
import { useEffect } from "react";

const lowlight = createLowlight(all);

interface RichTextEditorProps {
  setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
}

export const RichTextEditor = ({ setEditor }: RichTextEditorProps) => {
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
    immediatelyRender: false,
  });
  useEffect(() => {
    setEditor(editor);
  }, [editor]);

  return (
    <div className="text-white">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
