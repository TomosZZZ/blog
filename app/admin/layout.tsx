import AdminPanelNavigation from "@/features/admin/components/admin-panel-navigation";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen  text-white">
      <AdminPanelNavigation />
      <main className="flex-1 p-8 pt-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
