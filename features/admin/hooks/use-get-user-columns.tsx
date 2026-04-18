"use client";

import { useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { UserTableData } from "../types/user-table-data";
import { DataTableMenu } from "../components/data-table";
import { useDeleteUser } from "@/features/user/api";
import { UserAdminDto } from "@/features/user/types";

const columnHelper = createColumnHelper<UserTableData>();

export const useGetUserColumns = (users?: UserAdminDto[]) => {
  const { mutate: deleteUser } = useDeleteUser();

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserTableData | null>(null);

  const columns = useMemo<ColumnDef<UserTableData, any>[]>(
    () => [
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
            <DataTableMenu
              id={info.row.original.id}
              actions={[
                {
                  label: "Change role",
                  onClick: (id: string) => {
                    const user = users?.find((u) => u.id === id);
                    if (!user) return;
                    setSelectedUser(user);
                    setTimeout(() => setRoleModalOpen(true), 0);
                  },
                },
                {
                  label: "Delete",
                  onClick: (id: string) => deleteUser({ userId: id }),
                },
              ]}
            />
          </div>
        ),
      }),
    ],
    [users, deleteUser]
  );

  return {
    columns,
    roleModalOpen,
    setRoleModalOpen,
    selectedUser,
  };
};
