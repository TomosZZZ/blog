import { Blog } from "@/features/blog";
import { getPostsServer } from "@/features/blog/api";

const BlogPage = async () => {
  const posts = await getPostsServer();

  return <Blog initialPosts={posts} />;
};
export default BlogPage;
