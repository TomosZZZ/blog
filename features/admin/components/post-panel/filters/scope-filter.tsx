import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface ScopeFilterProps {
  scope: "ALL" | "MINE";
  setScope: (scope: "ALL" | "MINE") => void;
}

export const ScopeFilter = ({ scope, setScope }: ScopeFilterProps) => {
  return (
    <Select value={scope} onValueChange={(v) => setScope(v as any)}>
      <SelectTrigger
        className="w-[160px] bg-zinc-800 border-zinc-900 text-slate-400
          focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <SelectValue
          placeholder={<span className="text-slate-500">{scope}</span>}
        />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 text-slate-300 border border-zinc-800">
        <SelectItem value="ALL">All posts</SelectItem>
        <SelectItem value="MINE">My posts</SelectItem>
      </SelectContent>
    </Select>
  );
};
