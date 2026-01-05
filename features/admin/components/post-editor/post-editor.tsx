"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "../../../blog/components/text-editor";
import { PostFormModal } from "./modal";

interface PostEditorProps {
  mode: "create" | "edit";
  postDetails?: {
    id: string;
    title: string;
    thumbnail: string;
  };
  initialContent?: string;
}

export const PostEditor = ({
  mode,
  postDetails,
  initialContent = "",
}: PostEditorProps) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!editor) return;

    const json = JSON.stringify(editor.getJSON());
    setContent(json);
    setShowModal(true);
  };

  return (
    <div className="w-3/4 mt-5 text-white">
      {showModal && (
        <PostFormModal
          modalTitle={mode === "create" ? "Create post" : "Update post"}
          buttonLabel={mode === "create" ? "Create" : "Update"}
          onCloseModal={() => setShowModal(false)}
          postDetails={postDetails}
          editorContent={content}
        />
      )}

      <RichTextEditor
        setEditor={setEditor}
        content={initialContent ? JSON.parse(initialContent) : ""}
      />

      {editor && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSave}
            variant="ghost"
            className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
          >
            {mode === "create" ? "Save draft" : "Update"}
          </Button>
        </div>
      )}
    </div>
  );
};
