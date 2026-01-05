import { object, string, z } from "zod";

export const createPostFormSchema = object({
  title: string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must not exceed 50 characters"),
  thumbnail: z
    .instanceof(File, { message: "Image file is required" })
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Image file size must be at most 1MB",
    }),
});
