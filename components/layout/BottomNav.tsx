"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Table2 } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${pathname === '/' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Accueil</span>
      </Link>
      <Link
        href="/reference"
        className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${pathname === '/reference' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
      >
        <Table2 className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Référence</span>
      </Link>
    </nav>
  );
}
