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
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
