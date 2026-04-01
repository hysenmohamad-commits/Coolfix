"use client";

import React from 'react';
import { Zap } from 'lucide-react';

export function MobileHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 flex items-center px-4 h-14 shadow-lg">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-400" />
        <span className="font-bold text-white text-base tracking-tight">CoolFix</span>
      </div>
    </header>
  );
}
