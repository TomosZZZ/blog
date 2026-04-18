"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "../../../blog/components/text-editor";
import { PostFormModal } from "./modal";
import { useSession } from "next-auth/react";
import { useChangePostStatus } from "@/features/blog/api";
import { PostStatus } from "@/features/blog/types/post-status";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostEditorProps {
  mode: "create" | "edit";
  postDetails?: {
    id: string;
    title: string;
    thumbnail: string;
    status: PostStatus;
    reviewComment?: string;
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
  const { mutate: changePostStatus, isPending: isChangingStatus } =
    useChangePostStatus();
  const router = useRouter();

  const { data: session } = useSession();

  const canEdit =
    mode === "create" ||
    postDetails?.status === PostStatus.DRAFT ||
    postDetails?.status === PostStatus.CHANGES_REQ;

  const canSendToReview =
    mode === "edit" &&
    postDetails?.status === PostStatus.DRAFT &&
    (session?.user?.role === "EDITOR" || session?.user?.role === "ADMIN");

  const isAllowed =
    session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR";

  const handleSave = () => {
    if (!editor) return;

    const json = JSON.stringify(editor.getJSON());
    setContent(json);
    setShowModal(true);
  };

  const handleSendToReview = (status: PostStatus) => {
    if (!postDetails?.id || postDetails.status !== PostStatus.DRAFT) return;
    changePostStatus(
      { postId: postDetails.id, status },
      {
        onError: (err: any) => {
          toast.error(err.message || "Failed to send to review");
        },
        onSuccess: () => {
          toast.success("Post sent to review successfully");
          router.refresh();
        },
      }
    );
  };

  return (
    <div className="w-3/4 mt-5 text-white">
      {postDetails?.status === PostStatus.CHANGES_REQ && postDetails.reviewComment && (
        <div className="mb-6 rounded-lg border border-yellow-600 bg-yellow-950/40 p-4">
          <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Reviewer feedback</p>
          <p className="text-sm text-yellow-200">{postDetails.reviewComment}</p>
        </div>
      )}
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
        editable={canEdit}
        content={initialContent ? JSON.parse(initialContent) : ""}
      />

      {editor && canEdit && isAllowed && (
        <div className="flex justify-end mt-4 gap-3">
          <Button
            onClick={handleSave}
            variant="ghost"
            className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
          >
            {mode === "create" ? "Save draft" : "Update"}
          </Button>
          {canSendToReview && (
            <Button
              disabled={isChangingStatus}
              onClick={() => handleSendToReview(PostStatus.IN_REVIEW)}
              variant="ghost"
              className="px-8 border border-violet-700 hover:border-violet-900 hover:bg-violet-800 hover:text-white"
            >
              Send to review
            </Button>
          )}
        </div>
      )}
      {postDetails?.status === PostStatus.IN_REVIEW && (
        <p className="text-sm text-slate-400 mt-4">
          Post is currently under review. Editing is disabled.
        </p>
      )}
    </div>
  );
};
