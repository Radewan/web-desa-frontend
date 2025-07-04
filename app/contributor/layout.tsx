"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function KontributorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItemClass = (href: string) =>
    `block px-4 py-2 rounded hover:bg-blue-700 transition ${
      pathname === href ? "bg-blue-700 font-semibold" : ""
    }`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-blue-800 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-bold">Dashboard Kontributor</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-blue-800 text-white px-6 py-6 space-y-4 md:relative absolute z-20`}
        >
          <h2 className="text-xl font-bold mb-4 hidden md:block">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/contributor/news"
              className={navItemClass("/dashboard-kontributor/news")}
            >
              📄 Berita Saya
            </Link>
            <Link
              href="/contributor/events"
              className={navItemClass("/dashboard-kontributor/events")}
            >
              📅 Event Saya
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
