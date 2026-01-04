"use client";
import { useGetPostColumns } from "@/features/admin/hooks";
import React, { useMemo } from "react";
import { DataTable } from "@/features/admin/components/data-table/data-table";
import { PostTableData } from "@/features/admin/types/post-table-data";
import { Loader } from "@/shared/components";
import { DataTableFilter } from "../data-table/data-table-filter";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { StatusFilter } from "./filters/status-filter";
import { useGetPostsForPanel } from "@/features/blog/api/get-posts-for-panel/use-get-posts-for-panel";
import { useSession } from "next-auth/react";
import { ScopeFilter } from "./filters/scope-filter";

export const PostPanel = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [scope, setScope] = useState<"ALL" | "MINE">("ALL");

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const { data: posts, isLoading, isError } = useGetPostsForPanel(scope);
  const columns = useGetPostColumns();

  const dataTablePosts = useMemo<PostTableData[]>(() => {
    if (!posts) return [];

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      authorEmail: post.authorEmail,
      status: post.status,
    }));
  }, [posts]);

  const table = useReactTable({
    data: dataTablePosts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: { pageSize: 6 },
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      {dataTablePosts && (
        <div>
          <div className="flex items-center gap-2">
            <DataTableFilter
              columnName="authorEmail"
              label="author email"
              table={table}
            />
            <DataTableFilter columnName="title" table={table} />
            <StatusFilter table={table} />
            {isAdmin && <ScopeFilter scope={scope} setScope={setScope} />}
          </div>

          <DataTable<PostTableData> table={table} columns={columns} />
        </div>
      )}
    </div>
  );
};
