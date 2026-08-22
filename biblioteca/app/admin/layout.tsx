"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookMarked, Clapperboard, RefreshCw, Users, LogOut, Menu } from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Livros", href: "/admin/livros", icon: BookMarked },
  { name: "Filmes", href: "/admin/filmes", icon: Clapperboard },
  { name: "Empréstimos", href: "/admin/emprestimos", icon: RefreshCw },
  { name: "Clientes", href: "/admin/clientes", icon: Users },
];

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/admin/clientes":
      return "Clientes";
    case "/admin/livros":
      return "Livros";
    case "/admin/filmes":
      return "Filmes";
    case "/admin/emprestimos":
      return "Empréstimos";
    default:
      return "Dashboard";
  }
};

export default function AdminLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
        <aside 
          className={`bg-slate-900 text-white h-screen sticky top-0 flex flex-col gap-4 transition-all duration-300 shrink-0 overflow-hidden ${
            isCollapsed ? "w-20" : "w-64"
          }`}
        >
          <div className={`h-16 border-b border-slate-800 flex items-center px-6 shrink-0 ${isCollapsed ? "justify-center" : "justify-between"}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-1.5 text-2xl font-extrabold overflow-hidden whitespace-nowrap">
                <span className="text-[#00BFD8]">«</span>
                <h2 className="text-xl font-bold text-white">biblioteca</h2>
                <span className="text-[#00BFD8]">»</span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white duration-200 transition-colors ${
                !isCollapsed ? "ml-auto" : ""
              }`}
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="px-4 pt-2 pb-4 flex flex-col justify-between flex-1 overflow-y-auto">
            <nav className="space-y-1.5">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center py-3 rounded-xl text-sm transition-all duration-200 ${
                      isCollapsed ? "justify-center px-0" : "gap-3 px-4"
                    } ${
                      isActive 
                        ? "bg-[#00BFD8] text-[#0F172A] font-bold shadow-sm"
                        : "text-slate-500 hover:bg-white/10 hover:text-white font-medium"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`shrink-0 ${isActive ? "text-[#0F172A]" : "text-slate-400"}`}
                    />
                    {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-auto border-t flex-shrink-0 border-slate-800">
              <Link 
                href="/" 
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors ${
                  isCollapsed ? "justify-center px-0" : "gap-3 px-4"
                }`}
              >
                <LogOut size={20} className="text-slate-400 shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">Sair da conta</span>}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 h-16 bg-white border-b px-6 flex items-center justify-between shrink-0">
          <h1 className="font-bold text-[#0F172A]">
            {getPageTitle(pathname)}
          </h1>
        </header>
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}