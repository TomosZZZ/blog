"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { UserRole } from "@/features/user/types/user-role";

type ChangeRoleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  currentRole: string;
  onConfirm: (newRole: UserRole) => void;
  loading?: boolean;
};

export function ChangeRoleModal({
  open,
  onOpenChange,
  username,
  currentRole,
  onConfirm,
  loading = false,
}: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);

  const cancelHandler = () => {
    setSelectedRole(currentRole);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-neutral-900 border border-neutral-700 shadow-xl shadow-purple-600/10 text-neutral-100"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-neutral-100">Change Role</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Update role for <b className="text-neutral-100">{username}</b>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full bg-neutral-800 border border-neutral-700 text-neutral-100">
              <SelectValue placeholder="Select new role" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 text-neutral-100 border-none">
              <SelectItem value="USER" className="text-neutral-100">
                User
              </SelectItem>
              <SelectItem value="EDITOR" className="text-neutral-100">
                Editor
              </SelectItem>
              <SelectItem value="ADMIN" className="text-neutral-100">
                Admin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-2 flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-neutral-700 bg-neutral-800 text-neutral-200 hover:text-neutral-200 hover:bg-neutral-900"
            onClick={cancelHandler}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => onConfirm(selectedRole as UserRole)}
            disabled={loading || !selectedRole}
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
