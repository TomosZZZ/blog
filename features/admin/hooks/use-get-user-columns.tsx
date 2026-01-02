"use client";

import { useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { UserTableData } from "../types/user-table-data";
import { DataTableMenu } from "../components/data-table";
import { useDeleteUser, useGetUsers } from "@/features/user/api";

const columnHelper = createColumnHelper<UserTableData>();

export const useGetUserColumns = () => {
  const { mutate: deleteUser } = useDeleteUser();
  const { data: users } = useGetUsers();

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserTableData | null>(null);

  const actions = [
    {
      label: "Change role",
      onClick: (id: string) => {
        const user = users?.find((user) => user.id === id);
        if (!user) return;
        setSelectedUser(user);
        setRoleModalOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: (id: string) => deleteUser({ userId: id }),
    },
  ];

  const columns: ColumnDef<UserTableData, any>[] = [
    columnHelper.accessor("username", {
      header: () => <div>Name</div>,
    }),
    columnHelper.accessor("email", {
      header: () => <div>Email</div>,
    }),
    columnHelper.accessor("role", {
      header: () => <div>Role</div>,
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <div className="flex justify-end">
          <DataTableMenu id={info.row.original.id} actions={actions} />
        </div>
      ),
    }),
  ];

  return {
    columns,
    roleModalOpen,
    setRoleModalOpen,
    selectedUser,
  };
};
