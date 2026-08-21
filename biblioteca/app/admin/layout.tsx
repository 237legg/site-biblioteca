"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookMarked, Clapperboard, RefreshCw, Users, LogOut } from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Livros", href: "/admin/livros", icon: BookMarked },
  { name: "Filmes", href: "/admin/filmes", icon: Clapperboard },
  { name: "Empréstimos", href: "/admin/emprestimos", icon: RefreshCw },
  { name: "Clientes", href: "/admin/clientes", icon: Users },
];

export default function AdminLayout({
     children,
     }: { 
     children: React.ReactNode;
    }) {
     const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="">
                <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 p-6 flex flex-col gap-4 p-6">
                    <div className="flex items-center gap-1.5 text-2xl font-extrabold">
                        <span className="text-[#00BFD8]">«</span>
                        <h2 className="text-xl font-bold text-white">biblioteca</h2>
                        <span className="text-[#00BFD8]">»</span>
                    </div>
                    <nav className="space-y-1.5">
                        {MENU_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                                        isActive
                                            ? "bg-[#00BFD8] text-[#0F172A] font-bold shadow-sm"
                                            : "text-slate-500 hover:bg-white/10 hover:text-white font-medium"
                                    }`}
                            >
                                <Icon
                                    size={20}
                                    className={isActive ? "text-[#0F172A]" : "text-slate-400"}
                                />
                                <span>{item.name}</span>
                            </Link>
                            );
                        })}
                    </nav>
                
                    <div className="pt-4 mt-auto border-t flex-shrink-0 border-slate-100">
                        <Link href="/" 
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                        >
                        <LogOut size={20} className="text-slate-400" />
                        <span>Sair da conta</span>
                        </Link>
                    </div>
                </aside>
            </div>
        
        <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <span className="font-bold text-[#0F172A]">Dashboard</span>
        </header>
        <main className="p-6 flex-1">
          {children}
        </main>

        </div>
        
    </div>
    );
}