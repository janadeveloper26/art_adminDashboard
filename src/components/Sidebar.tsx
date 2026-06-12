"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Courses", href: "/courses" },
  { title: "Videos", href: "/videos" },
  { title: "Users", href: "/users" },
];

export function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on login page
  if (pathname === "/login" || pathname === "/") {
    return null;
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-full flex-shrink-0 flex flex-col transition-all duration-300 shadow-2xl z-10 relative">
      <div className="flex flex-col h-full px-4 py-6">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            A
          </div>
          <h1 className="text-xl font-bold tracking-wide text-foreground">Art Admin</h1>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      active 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-[1.01]"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
