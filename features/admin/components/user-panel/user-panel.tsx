"use client";

import { useGetUsers } from "@/features/user/api";
import { Loader } from "@/shared/components";
import React from "react";
import { DataTable } from "../data-table";
import { UserTableData } from "../../types/user-table-data";
import { useGetUserColumns } from "../../hooks/use-get-user-columns";
import { useSession } from "next-auth/react";
import { ChangeRoleModal } from "./change-role-modal";
import { useUpdateUserRole } from "@/features/user/api/update-user-role/use-update-user-role";

export const UserPanel = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken;
  if (!token) throw new Error("Authentication token not found");

  const {
    data: users,
    isError,
    isLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsers(token);
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
            onConfirm={(newRole) => {
              if (!selectedUser) return;
              console.log(newRole);
              updateUserRole({
                userId: selectedUser.id,
                newRole,
                token,
              });
              if (isSuccess) {
                setRoleModalOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
