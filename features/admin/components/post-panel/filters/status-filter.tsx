import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface StatusFilterProps<TData> {
  table: Table<TData>;
}

export const StatusFilter = <TData,>({ table }: StatusFilterProps<TData>) => {
  const column = table.getColumn("status");
  if (!column) return null;

  const value = (column.getFilterValue() as string) ?? "";

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value === "ALL") {
          column.setFilterValue(undefined);
        } else {
          column.setFilterValue(value);
        }
      }}
    >
      <SelectTrigger
        className="w-[180px] bg-zinc-800 border-zinc-900 text-slate-400
          focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <SelectValue
          placeholder={<span className="text-slate-400">Status</span>}
        />
      </SelectTrigger>

      <SelectContent className="bg-neutral-900 text-slate-300 border border-zinc-800">
        <SelectItem value="ALL">All statuses</SelectItem>

        <SelectItem value="DRAFT">Draft</SelectItem>
        <SelectItem value="IN_REVIEW">In review</SelectItem>
        <SelectItem value="CHANGES_REQUESTED">Changes requested</SelectItem>
        <SelectItem value="APPROVED">Approved</SelectItem>
        <SelectItem value="PUBLISHED">Published</SelectItem>
      </SelectContent>
    </Select>
  );
};
