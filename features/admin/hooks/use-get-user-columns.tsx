import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { UserTableData } from "../types/user-table-data";
import { DataTableMenu } from "../components/data-table";

const columnHelper = createColumnHelper<UserTableData>();

export const useGetUserColumns = () => {
  const actions = [
    {
      label: "Delete",
      onClick: (id: string) => console.log("Delete user with id: ", id),
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
