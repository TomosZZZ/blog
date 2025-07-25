import { object, string, z } from "zod";

export const createPostFormSchema = object({
  title: string({ required_error: "Tytuł jest wymagany" })
    .min(3, "Tytuł musi mieć co najmniej 3 znaki")
    .max(50, "Tytuł nie może przekraczać 50 znaków"),
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
      { message: "Nieprawidłowy typ pliku" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Plik musi mieć maksymalnie 1MB",
    }),
});
