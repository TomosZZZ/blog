import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PostTableData } from "@/features/admin/types/post-table-data";

import { DataTableMenu } from "@/features/admin/components/data-table/data-table-menu";
import { useDeletePost } from "@/features/blog/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { useMemo } from "react";

const columnHelper = createColumnHelper<PostTableData>();

export const useGetPostColumns = () => {
  const { mutate: deletePost } = useDeletePost();
  const router = useRouter();

  const actions = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (id: string) => router.push(`/admin/posts/${id}`),
      },
      {
        label: "Delete",
        onClick: (id: string) =>
          deletePost(
            { postId: id },
            {
              onError: (err: any) => {
                toast.error(err.message || "Failed to delete post");
              },
              onSuccess: () => {
                toast.success("Post deleted successfully");
              },
            }
          ),
      },
    ],
    [router, deletePost]
  );

  const columns = useMemo<ColumnDef<PostTableData, any>[]>(
    () => [
      columnHelper.accessor("authorEmail", {
        header: () => <div>Author</div>,
        cell: (info) => <div>{info.getValue()}</div>,
      }),

      columnHelper.accessor("title", {
        header: () => <div>Title</div>,
        filterFn: "includesString",
        enableColumnFilter: true,
      }),

      columnHelper.accessor("createdAt", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full justify-start hover:bg-transparent hover:text-white gap-2 px-0"
          >
            Created At
            <ArrowUpDown size={16} />
          </Button>
        ),
        cell: (info) => (
          <div>{new Date(info.getValue()).toLocaleDateString()}</div>
        ),
      }),

      columnHelper.accessor("status", {
        header: () => <div>Status</div>,
      }),

      columnHelper.display({
        id: "actions",
        cell: (info) => (
          <div className="flex justify-end">
            <DataTableMenu actions={actions} id={info.row.original.id} />
          </div>
        ),
      }),
    ],
    [actions]
  );

  return columns;
};
