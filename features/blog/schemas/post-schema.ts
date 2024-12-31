import { object, string } from "zod";

export const createPostSchema = object({
  title: string({ required_error: "Title is required" }).min(
    3,
    "Title must be at least 3 characters long"
  ),
  content: string({ required_error: "Content is required" }).min(
    30,
    "Content must be at least 30 characters long"
  ),
});
