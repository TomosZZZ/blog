"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaX } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { Backdrop } from "@/shared/components/backdrop";

interface RejectPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
  isLoading?: boolean;
}

export const RejectPostModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: RejectPostModalProps) => {
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-900 border border-neutral-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Reject post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaX />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-3">
          Please provide feedback for the author.
        </p>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What should be improved?"
          className="bg-neutral-800 border-neutral-600 text-white min-h-[120px]"
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(comment)}
            disabled={!comment.trim() || isLoading}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            Reject post
          </Button>
        </div>
      </div>
    </>
  );
};
