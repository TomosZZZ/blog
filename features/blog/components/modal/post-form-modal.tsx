"use client";
import React, { useState } from "react";
import { Backdrop } from "./backdrop";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { createPostFormSchema, updatePostFormSchema } from "../../schemas";
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
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useUpdatePost, useCreatePost } from "@/features/blog/api";
import { useRouter } from "next/navigation";

interface PostDetails {
  id: string;
  title: string;
  thumbnail: string;
}

interface CreatePostModalProps {
  postDetails?: PostDetails;
  editorContent: string;
  modalTitle: string;
  buttonLabel: string;
  onCloseModal: () => void;
  onSuccess?: () => void;
}

export const PostFormModal = ({
  postDetails,
  modalTitle,
  buttonLabel,
  onCloseModal,
  editorContent,
}: CreatePostModalProps) => {
  const isEditMode = Boolean(postDetails);
  const [fileName, setFileName] = useState<string | null>(
    isEditMode ? "Existing Thumbnail" : null
  );
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    isEditMode ? postDetails?.thumbnail || null : null
  );

  const { data: sessionData } = useSession();

  const router = useRouter();

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const formSchema = isEditMode ? updatePostFormSchema : createPostFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: postDetails?.title || "",
      thumbnail: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let finalThumbnail: string = postDetails?.thumbnail || "";

      if (values.thumbnail) {
        const thumbnailBase64Response = await convertImageToBase64(
          values.thumbnail
        );
        if (!thumbnailBase64Response.success) {
          throw new Error(thumbnailBase64Response.message);
        }
        finalThumbnail = thumbnailBase64Response.result;
      } else if (postDetails?.thumbnail) {
        finalThumbnail = postDetails.thumbnail;
      }
      const post = {
        title: values.title,
        thumbnail: finalThumbnail,
        content: editorContent,
      };
      const token = sessionData?.accessToken;
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const mutationOptions = {
        onSuccess: (res: void) => {
          router.push("/blog");
          toast.success(
            `Post ${isEditMode ? "updated" : "created"} successfully`
          );
          onCloseModal();
        },
        onError: (res: Error) => {
          setError("root", { message: res.message || "An error occurred" });
        },
      };
      if (isEditMode && postDetails) {
        updatePost(
          { postId: postDetails.id, post, token },
          { ...mutationOptions }
        );
      } else {
        createPost(
          { post, token },
          {
            ...mutationOptions,
          }
        );
      }
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
      <Backdrop onClick={onCloseModal} />
      <div className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-xl transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-900 border border-neutral-700 shadow-xl shadow-purple-600/10 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-2xl font-bold">{modalTitle}</h1>
          <button
            onClick={onCloseModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaX className="text-xl" />
          </button>
        </div>

        <div className="w-full">
          <Form {...form}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="title"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-violet-500"
                        {...field}
                      />
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
                    <FormLabel className="text-gray-300">Thumbnail</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="file-upload"
                          className="flex-1 cursor-pointer rounded-md bg-neutral-800 border border-neutral-600 text-neutral-400 hover:border-violet-500 p-2 text-center transition-colors"
                        >
                          {fileName || "Click to upload an image"}
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFileName(file.name);
                              onChange(file);
                              const preview = await convertImageToBase64(file);
                              if (preview.success)
                                setThumbnailPreview(preview.result);
                            } else {
                              setFileName(
                                postDetails?.thumbnail
                                  ? "Existing thumbnail"
                                  : null
                              );
                              setThumbnailPreview(
                                postDetails?.thumbnail || null
                              );
                              onChange(undefined);
                            }
                          }}
                        />
                        {thumbnailPreview && (
                          <div className="w-24 h-16 relative rounded-md overflow-hidden border border-neutral-600">
                            <Image
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center pt-2">
                {errors.root && (
                  <p className="text-red-500 text-sm mb-4">
                    {errors.root.message}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isEditMode ? isUpdating : isCreating}
                  className="bg-violet-700 text-white font-bold hover:bg-violet-600 w-full sm:w-auto px-10 py-2.5 text-lg"
                >
                  {buttonLabel}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
