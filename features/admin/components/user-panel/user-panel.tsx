"use client";

import { useGetUsers } from "@/features/user/api";
import { Loader } from "@/shared/components";
import React from "react";
import { DataTable } from "../data-table";
import { UserTableData } from "../../types/user-table-data";
import { useGetUserColumns } from "../../hooks/use-get-user-columns";
import { ChangeRoleModal } from "./change-role-modal";
import { useUpdateUserRole } from "@/features/user/api/update-user-role/use-update-user-role";
import { UserRole } from "@/features/user";

export const UserPanel = () => {
  const {
    data: users,
    isError,
    isLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsers();
  const { columns, roleModalOpen, setRoleModalOpen, selectedUser } =
    useGetUserColumns();

  const { mutate: updateUserRole, isPending, isSuccess } = useUpdateUserRole();

  const dataTableUsers = users?.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  }));

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading users</div>;
  if (isUsersSuccess && users.length === 0) return <div>No users found</div>;

  return (
    <div>
      {dataTableUsers && (
        <div>
          <DataTable<UserTableData>
            data={dataTableUsers}
            columns={columns}
            columnFilter="email"
          />
          <ChangeRoleModal
            open={roleModalOpen}
            onOpenChange={setRoleModalOpen}
            username={selectedUser?.username || ""}
            currentRole={selectedUser?.role || "USER"}
            loading={isPending}
            onConfirm={(newRole: UserRole) => {
              if (!selectedUser) return;
              updateUserRole({
                userId: selectedUser.id,
                newRole,
              });
              if (isSuccess) {
                setRoleModalOpen(false);
              } else {
                setRoleModalOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
