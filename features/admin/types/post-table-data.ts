import { Post } from "@/features/blog/types/post";

export type PostTableData = Pick<Post, "id" | "title" | "createdAt">;
