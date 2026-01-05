import { PostEditor } from "@/features/admin/components/post-editor/post-editor";

const NewPostPage = () => {
  return (
    <div className="flex items-center justify-center  ">
      <PostEditor mode="create" />
    </div>
  );
};
export default NewPostPage;
