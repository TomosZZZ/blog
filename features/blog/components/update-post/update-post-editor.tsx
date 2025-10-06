"use client";

import { Editor } from "@tiptap/react";

import React, { useEffect, useState } from "react";
import { useGetPostById } from "../../api";
import { RichTextEditor } from "../text-editor";
import { Button } from "@/components/ui/button";
import { Loader } from "@/shared/components";
import { PostFormModal } from "@/features/blog/components";

interface UpdatePostEditorProps {
  postId: string;
}

interface PostDetails {
  title: string;
  content: string;
  thumbnail: string;
}

export const UpdatePostEditor = ({ postId }: UpdatePostEditorProps) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [postDetails, setPostDetails] = useState<PostDetails | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const { data: post, isLoading } = useGetPostById(postId);

  const updateHandler = () => {
    const content = JSON.stringify(editor?.getJSON());
    if (!content) {
      return;
    }
    setUpdatedContent(content);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (post) {
      let parsedContent;
      try {
        parsedContent = JSON.parse(post.content);
      } catch (error) {
        parsedContent = <p>Error loading content</p>;
      }

      const details = {
        title: post.title,
        content: parsedContent,
        thumbnail: post.thumbnail,
      };
      setPostDetails(details);
    }
  }, [post]);

  if (isLoading || !postDetails) {
    return <Loader />;
  }

  return (
    <div className="w-3/4 mt-5 text-white">
      {showModal && (
        <PostFormModal
          buttonLabel="Update"
          modalTitle="Update Post"
          onCloseModal={closeModalHandler}
          editorContent={updatedContent}
          postDetails={{
            id: postId,
            title: postDetails.title,
            thumbnail: postDetails.thumbnail,
          }}
        />
      )}
      <RichTextEditor setEditor={setEditor} content={postDetails.content} />
      {editor && !isLoading && (
        <>
          <div className="flex justify-end mt-4">
            <Button
              onClick={updateHandler}
              variant={"ghost"}
              className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
            >
              Update
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
