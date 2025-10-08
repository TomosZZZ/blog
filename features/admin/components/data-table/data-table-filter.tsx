import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import React from "react";

interface DataTableFilterProps<TData> {
  columnName: string;
  table: Table<TData>;
}

export const DataTableFilter = <TData,>({
  columnName,
  table,
}: DataTableFilterProps<TData>) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={`Filter ${columnName}...`}
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnName)?.setFilterValue(event.target.value)
        }
        className="max-w-sm bg-zinc-800 border-zinc-900 
             focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
