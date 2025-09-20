import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PostTableData } from "../../types/post-table-data";

import { UUIDCell } from "../UUID-cell";

const columnHelper = createColumnHelper<PostTableData>();

export const columns: ColumnDef<PostTableData, any>[] = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => <UUIDCell uuid={info.getValue()} />,
  }),
  columnHelper.accessor("title", {
    header: () => "Title",
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];
