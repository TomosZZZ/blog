"use client";
import React, { useState } from "react";
import { Backdrop } from "./backdrop";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { createPostFormSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertImageToBase64 } from "@/app/utils";
import { FaX } from "react-icons/fa6";
import { useCreatePost } from "../../api/create-post/use-create-post";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface CreatePostModalProps {
  content: string;
  onCloseModal: () => void;
}

export const CreatePostModal = ({
  content,
  onCloseModal,
}: CreatePostModalProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { data: sessionData } = useSession();

  const { mutate, isPending } = useCreatePost();

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof createPostFormSchema>) => {
    try {
      if (values.thumbnail.size > 1024 * 1024) {
        throw new Error("Plik przekracza maksymalny rozmiar 1MB");
      }
      const thumbnailBase64Response = await convertImageToBase64(
        values.thumbnail
      );
      if (!thumbnailBase64Response.success) {
        throw new Error(thumbnailBase64Response.message);
      }

      const post = {
        title: values.title,
        thumbnail: thumbnailBase64Response.result,
        content,
      };
      const token = sessionData?.accessToken;
      if (!token) {
        throw new Error("Authentication token not found");
      }

      mutate(
        { post, token },
        {
          onSuccess: (res) => {
            toast.success("Post created successfully");
            onCloseModal();
          },
          onError: (res) => {
            setError("root", { message: res.message });
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    }
  };

  return (
    <div>
      <Backdrop />
      <div className="fixed z-50 top-[30%] left-[50%] w-[90%] sm:w-1/2 sm:min-w-[500px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-800 py-5 flex justify-center items-center flex-col">
        <div>
          <FaX
            className="text-white text-xl cursor-pointer absolute top-5 right-5"
            onClick={onCloseModal}
          />
        </div>
        <h1 className="text-white text-2xl font-bold text-center">
          Create Post
        </h1>
        <div className="w-4/5">
          <Form {...form}>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="title"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input className="text-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="thumbnail"
                control={control}
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          readOnly
                          placeholder="Upload a thumbnail"
                          value={fileName || ""}
                          className="cursor-pointer text-black"
                          onClick={() =>
                            document.getElementById("file-upload")?.click()
                          }
                        />
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            setFileName(file ? file.name : null);
                            onChange(file);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                {errors.root && (
                  <FormMessage className="text-red-500 text-sm mb-2">
                    {errors.root.message}
                  </FormMessage>
                )}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-transparent text-white border-violet-500 border-2 hover:bg-violet-500"
                >
                  Create Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
