import { PostStatus } from "@/features/blog/types/post-status";

export type PostPanelDto = {
  id: string;
  title: string;
  content: string;
  slug: string;
  authorEmail: string;
  createdAt: Date;
  status: PostStatus;
  reviewComment: string | null;
};
