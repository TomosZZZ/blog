"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { silkscreen } from "@/shared/fonts"; // Zakładam, że ścieżka do fontów jest ta sama

// Ikony (możesz użyć react-icons lub innych)
import {
  RiFileListLine,
  RiUserLine,
  RiBarChartLine,
  RiSettings3Line,
} from "react-icons/ri"; // Przykładowe ikony

const ADMIN_LINKS = [
  { href: "/admin/manage-posts", text: "Posts", icon: RiFileListLine },
  { href: "/admin/manage-users", text: "Users", icon: RiUserLine },
  { href: "/admin/statistics", text: "Statistics", icon: RiBarChartLine },
];

const AdminPanelNavigation = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdminPath = pathname.startsWith("/admin");

  if (!isAdminPath) return null;

  return (
    <>
      <div className="md:hidden sticky top-0 z-40   p-4 flex justify-between items-center h-20">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle admin menu"
          className="text-white"
        >
          <RiSettings3Line className="w-8 h-8" />
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 h-full min-w-48 max-w-64 w-[20%]  bg-neutral-900 border-r border-white/10 p-6 pt-20 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static md:h-auto md:pt-6`}
      >
        <nav>
          <ul className="flex flex-col gap-4 pt-5">
            {ADMIN_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const IconComponent = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 text-lg py-2 px-3 rounded-lg transition-colors hover:bg-violet-800 ${
                      isActive
                        ? "bg-violet-700 text-white font-semibold"
                        : "text-white"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminPanelNavigation;
