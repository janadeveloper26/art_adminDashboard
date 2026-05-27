"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Courses", href: "/courses" },
  { title: "Videos", href: "/videos" },
  { title: "Users", href: "/" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0">
      <div className="flex flex-col h-full px-4 py-6">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">Art Admin</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      active ? "bg-slate-100 dark:bg-slate-800" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-6">
          <button
            onClick={() => {
              // placeholder logout action
              window.location.href = "/";
            }}
            className="w-full text-left rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
