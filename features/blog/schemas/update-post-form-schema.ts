import { object, string, z } from "zod";

export const updatePostFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "Thumbnail must be a file",
    })
    .refine((file) => {
      if (file instanceof File) {
        return file.size <= 5 * 1024 * 1024;
      }
      return true;
    }, `Thumbnail must be less than 5MB.`),
});
