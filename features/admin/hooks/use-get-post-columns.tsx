import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PostTableData } from "@/features/admin/types/post-table-data";

import { UUIDCell } from "@/features/admin/components/data-table/cells/uuid-cell";
import { DataTableMenu } from "@/features/admin/components/data-table/data-table-menu";
import { useDeletePost } from "@/features/blog/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper<PostTableData>();

export const useGetPostColumns = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken;
  if (!token) throw new Error("Authentication token not found");

  const { mutate: deletePost, isPending, isError } = useDeletePost();

  const router = useRouter();

  const actions = [
    {
      label: "Edit",
      onClick: (id: string) => router.push(`/blog/update-post/${id}`),
    },
    {
      label: "Delete",
      onClick: (id: string) => deletePost({ postId: id, token }),
    },
  ];

  const columns: ColumnDef<PostTableData, any>[] = [
    columnHelper.accessor("id", {
      header: () => "ID",
      cell: (info) => {
        console.log(info);
        return <UUIDCell uuid={info.getValue()} />;
      },
    }),
    columnHelper.accessor("title", {
      header: () => "Title",
    }),
    columnHelper.accessor("createdAt", {
      header: () => "Created At",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <DataTableMenu actions={actions} id={info.row.original.id} />
      ),
    }),
  ];
  return columns;
};
