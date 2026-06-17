"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Categories", href: "/categories" },
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
    <aside className="w-64 bg-primary text-primary-foreground border-r border-border h-full flex-shrink-0 flex flex-col shadow-xl z-10 relative">
      <div className="flex flex-col h-full">
        {/* Django Admin Header Style */}
        <div className="h-14 flex items-center px-4 bg-primary text-primary-foreground font-semibold text-lg border-b border-white/20 tracking-wide">
          <Link href="/dashboard">Django administration</Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-xs font-bold text-primary-foreground/70 uppercase tracking-wider">
            Glorious Art App
          </div>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block w-full px-4 py-2 text-sm font-medium transition-colors ${
                      active 
                        ? "bg-white/20 text-white font-bold border-l-4 border-[#f5dd5d]" 
                        : "text-primary-foreground/90 hover:bg-white/10 hover:text-white border-l-4 border-transparent"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-white/20">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full text-left px-4 py-3 text-sm font-medium text-primary-foreground/90 hover:bg-white/10 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
