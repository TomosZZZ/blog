"use client";

import React, { useState } from "react";
import { RichTextEditor } from "../text-editor";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { CreatePostModal } from "../modal";

export const NewPostEditor = () => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string>("");

  const submitHandler = () => {
    const content = JSON.stringify(editor?.getJSON());
    if (!content) {
      return;
    }
    setContent(content);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <div className="w-3/4 mt-5 text-white">
      {showModal && (
        <CreatePostModal onCloseModal={closeModalHandler} content={content} />
      )}
      <RichTextEditor setEditor={setEditor} />
      {editor && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={submitHandler}
            variant={"ghost"}
            className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
          >
            Create
          </Button>
        </div>
      )}
    </div>
  );
};
