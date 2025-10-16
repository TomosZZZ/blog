"use client";

import { useGetUsers } from "@/features/user/api";
import { Loader } from "@/shared/components";
import React from "react";
import { DataTable } from "../data-table";
import { UserTableData } from "../../types/user-table-data";
import { useGetUserColumns } from "../../hooks/use-get-user-columns";
import { useSession } from "next-auth/react";

export const UserPanel = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken;
  if (!token) throw new Error("Authentication token not found");

  const { data: users, isError, isLoading } = useGetUsers(token);
  const columns = useGetUserColumns();
  const dataTableUsers = users?.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  }));

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading users</div>;

  return (
    <div>
      {dataTableUsers && (
        <div>
          <DataTable<UserTableData>
            data={dataTableUsers}
            columns={columns}
            columnFilter="email"
          />
        </div>
      )}
    </div>
  );
};
