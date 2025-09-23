import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PostTableData } from "../../types/post-table-data";

import { UUIDCell } from "../data-table/cells/uuid-cell";
import { DataTableMenu } from "../data-table";

const columnHelper = createColumnHelper<PostTableData>();

const actions = [
  {
    label: "Edit",
    onClick: (id: string) => console.log("Edit clicked", id),
  },
  {
    label: "Delete",
    onClick: (id: string) => console.log("Delete clicked", id),
  },
];

export const columns: ColumnDef<PostTableData, any>[] = [
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
