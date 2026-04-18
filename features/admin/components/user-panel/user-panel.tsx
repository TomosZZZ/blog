"use client";

import { useGetUsers } from "@/features/user/api";
import { Loader } from "@/shared/components";
import React, { useMemo, useState } from "react";
import { DataTable } from "../data-table";
import { UserTableData } from "../../types/user-table-data";
import { useGetUserColumns } from "../../hooks/use-get-user-columns";
import { ChangeRoleModal } from "./change-role-modal";
import { useUpdateUserRole } from "@/features/user/api/update-user-role/use-update-user-role";
import { UserRole } from "@/features/user";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { DataTableFilter } from "../data-table/data-table-filter";

export const UserPanel = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const {
    data: users,
    isError,
    isLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsers();
  const { columns, roleModalOpen, setRoleModalOpen, selectedUser } =
    useGetUserColumns(users);

  const { mutate: updateUserRole, isPending } = useUpdateUserRole();

  const dataTableUsers = useMemo(
    () =>
      users?.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      })) ?? [],
    [users]
  );

  const table = useReactTable({
    data: dataTableUsers ?? [],
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
  if (isError) return <div>Error loading users</div>;
  if (isUsersSuccess && users.length === 0) return <div>No users found</div>;

  return (
    <div>
      {dataTableUsers && (
        <div>
          <DataTableFilter<UserTableData> columnName="email" table={table} />
          <DataTable<UserTableData> table={table} columns={columns} />
          <ChangeRoleModal
            open={roleModalOpen}
            onOpenChange={setRoleModalOpen}
            username={selectedUser?.username || ""}
            currentRole={selectedUser?.role || "USER"}
            loading={isPending}
            onConfirm={(newRole: UserRole) => {
              if (!selectedUser) return;
              updateUserRole(
                { userId: selectedUser.id, newRole },
                { onSuccess: () => setRoleModalOpen(false) }
              );
            }}
          />
        </div>
      )}
    </div>
  );
};
