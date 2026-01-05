import { UpdatePostEditor } from "@/features/blog/components/update-post/update-post-editor";
import React from "react";

interface UpdatePostPageProps {
  params: { id: string };
}

const UpdatePostPage = ({ params }: UpdatePostPageProps) => {
  const { id } = params;

  return (
    <div className="flex items-center justify-center ">
      <UpdatePostEditor postId={id} />
    </div>
  );
};

export default UpdatePostPage;
