import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { UserTableData } from "../types/user-table-data";
import { DataTableMenu } from "../components/data-table";
import { useDeleteUser } from "@/features/user/api";
import { useSession } from "next-auth/react";

const columnHelper = createColumnHelper<UserTableData>();

export const useGetUserColumns = () => {
  const { mutate: deleteUser } = useDeleteUser();

  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken;
  if (!token) throw new Error("Authentication token not found");

  const actions = [
    {
      label: "Delete",
      onClick: (id: string) => deleteUser({ userId: id, token: token }),
    },
  ];

  const columns: ColumnDef<UserTableData, any>[] = [
    columnHelper.accessor("username", {
      header: () => <div>Name</div>,
    }),
    columnHelper.accessor("email", {
      header: () => <div>Email</div>,
    }),
    columnHelper.accessor("role", {
      header: () => <div>Role</div>,
    }),
    columnHelper.display({
      id: "actions",

      cell: (info) => (
        <div className="flex justify-end">
          <DataTableMenu actions={actions} id={info.row.original.id} />
        </div>
      ),
    }),
  ];

  return columns;
};
