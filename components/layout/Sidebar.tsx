"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Table2, Zap } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20 print:hidden hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-bold text-white">CoolFix</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Édition Technicien</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${pathname === '/' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
          <Home className="w-5 h-5" /> Recherche d&apos;Accueil
        </Link>
        <Link
          href="/reference"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${pathname === '/reference' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
          <Table2 className="w-5 h-5" /> Tableaux de Référence
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">

        © {new Date().getFullYear()} CoolFix
      </div>
    </aside>
  );
}
