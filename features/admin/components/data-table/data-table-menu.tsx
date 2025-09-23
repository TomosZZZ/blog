import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import React from "react";

interface Action<T extends any[] = any[]> {
  label: string;
  onClick: (...args: T) => void;
}

interface DataTableMenuProps {
  actions: Action[];
  id?: string;
}

export const DataTableMenu = ({ actions, id }: DataTableMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="h-8 w-8 p-0  hover:bg-violet-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
        >
          <HiDotsHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={5}
        className="min-w-[8rem] rounded-xl border border-neutral-800 bg-neutral-900/95 p-2 shadow-lg backdrop-blur-md"
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => action.onClick(id)}
            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-neutral-200 outline-none transition-colors hover:bg-violet-600 hover:text-white focus:bg-violet-600 focus:text-white"
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
