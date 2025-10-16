"use client";
import { useGetPosts } from "@/features/blog/api";
import { useGetPostColumns } from "@/features/admin/hooks";
import React from "react";
import { DataTable } from "@/features/admin/components/data-table/data-table";
import { PostTableData } from "@/features/admin/types/post-table-data";
import { Loader } from "@/shared/components";

export const PostPanel = () => {
  const { data: posts, isLoading, isError } = useGetPosts();
  const columns = useGetPostColumns();
  const dataTablePosts = posts?.map((post) => {
    return {
      title: post.title,
      createdAt: post.createdAt,
      id: post.id,
    };
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      {dataTablePosts && (
        <div>
          <DataTable<PostTableData>
            data={dataTablePosts}
            columns={columns}
            columnFilter="title"
          />
        </div>
      )}
    </div>
  );
};
