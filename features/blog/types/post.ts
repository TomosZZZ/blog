import { PostStatus } from "./post-status";

export interface PostDTO {
  title: string;
  content: string;
  thumbnail: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  authorEmail: string;
  slug: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}
