"use client";

import React, { useMemo, useState } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { useAppStore } from '@/store/useAppStore';
import errorCodesData from '@/data/errorCodes.json';
import { ErrorCodeRecord } from '@/types';
import Fuse from 'fuse.js';
import { RepairCard } from '@/components/cards/RepairCard';
import { Zap } from 'lucide-react';

const errorRecords = errorCodesData as ErrorCodeRecord[];

const fuse = new Fuse(errorRecords, {
  keys: [
    { name: 'code', weight: 2 },
    { name: 'name', weight: 1 },
    { name: 'related_codes', weight: 1 }
  ],
  threshold: 0.3,
  includeScore: true,
  ignoreLocation: true,
});

export default function Home() {
  const { searchQuery } = useAppStore();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 150);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return null;
    const fuseResults = fuse.search(debouncedQuery);
    return fuseResults.map(r => r.item);
  }, [debouncedQuery]);

  const isSearching = results !== null;

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 pb-6 md:px-8 md:py-12 flex flex-col">

        {/* Hero section – compact on mobile, full on desktop */}
        <div className={`transition-all duration-300 ${isSearching ? 'pt-4 pb-4' : 'pt-6 pb-8 md:pt-16 md:pb-12'}`}>



          {/* Title – hidden when results shown on mobile */}
          <div className={`text-center md:text-left transition-all duration-200 ${isSearching ? 'hidden md:block' : 'block'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-3 pb-1 drop-shadow-sm leading-tight">
              Décoder les Erreurs{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                D&apos;Électroménager.
              </span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto md:mx-0 text-balance hidden sm:block">
              Tapez un code d&apos;erreur pour obtenir les procédures de diagnostic, les valeurs de test et les étapes de réinitialisation.
            </p>
          </div>

          {/* Search bar */}
          <div className={`w-full ${isSearching ? 'mt-0' : 'mt-6 md:mt-10'}`}>
            <SearchBar />
          </div>
        </div>


        {/* Results area */}
        <div className="flex-1">
          {results === null ? (
            <div className="flex flex-col items-center justify-center text-slate-600 border border-slate-800 border-dashed rounded-2xl bg-slate-900/50 py-16 md:py-24 gap-3">
              <Zap className="w-8 h-8 text-slate-700" />
              <p className="text-slate-500 font-medium">En attente d&apos;une entrée...</p>
              <p className="text-xs text-slate-600 text-center px-4">
                Essayez : <span className="font-mono text-slate-500">&quot;CH10&quot;</span>,{' '}
                <span className="font-mono text-slate-500">&quot;OE&quot;</span>, ou{' '}
                <span className="font-mono text-slate-500">&quot;U4&quot;</span>
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-slate-400 border border-slate-800 rounded-2xl bg-slate-900/50 py-16 md:py-24 gap-2">
              <p className="text-base font-semibold text-white">Aucune correspondance trouvée.</p>
              <p className="text-sm text-slate-500 text-center px-4">Vérifiez le code ou modifiez le filtre de marque.</p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6 pb-4">
              <p className="text-xs text-slate-500">
                {results.length} résultat{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
              </p>
              {results.map(record => (
                <RepairCard key={record.id} record={record} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
