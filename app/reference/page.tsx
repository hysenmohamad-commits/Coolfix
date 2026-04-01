"use client";

import React, { useState } from 'react';
import errorCodesData from '@/data/errorCodes.json';
import { ErrorCodeRecord } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { Filter, ArrowUpDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const allRecords = errorCodesData as ErrorCodeRecord[];
const allBrands = Array.from(new Set(allRecords.map(r => r.brand)));
const allSubsystems = Array.from(new Set(allRecords.map(r => r.subsystem)));

type SortKey = 'code' | 'severity' | 'subsystem' | 'brand';

export default function ReferencePage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>('code');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const severityOrder = { "INFO": 1, "WARNING": 2, "FAULT": 3, "CRITICAL": 4 };

  const filteredData = allRecords.filter(r => {
    if (selectedBrand !== "All" && r.brand !== selectedBrand) return false;
    if (selectedSubsystem !== "All" && r.subsystem !== selectedSubsystem) return false;
    return true;
  }).sort((a, b) => {
    let cmp = 0;
    if (sortKey === 'severity') {
      cmp = severityOrder[a.severity] - severityOrder[b.severity];
    } else {
      cmp = a[sortKey].localeCompare(b[sortKey]);
    }
    return sortAsc ? cmp : -cmp;
  });

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pt-4 md:pt-12">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Tableau de Référence</h1>
        <p className="text-slate-400 text-sm">Liste complète des codes de diagnostic</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap gap-4 mb-6 print:hidden">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
            <Filter className="w-3 h-3"/> Marque
          </label>
          <select
            className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-blue-500 focus:border-blue-500 w-full"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="All">Toutes les Marques</option>
            {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
            <Filter className="w-3 h-3"/> Sous-système
          </label>
          <select
            className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-blue-500 focus:border-blue-500 w-full"
            value={selectedSubsystem}
            onChange={(e) => setSelectedSubsystem(e.target.value)}
          >
            <option value="All">Tous les Sous-systèmes</option>
            {allSubsystems.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-500 mb-3">
        {filteredData.length} code{filteredData.length !== 1 ? 's' : ''} trouvé{filteredData.length !== 1 ? 's' : ''}
      </p>

      {/* ── DESKTOP: full table ── */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto print:overflow-visible">
          <Table className="print:text-black">
            <TableHeader className="bg-slate-800 print:bg-slate-200 print:text-black">
              <TableRow className="border-slate-700 print:border-slate-300">
                <TableHead
                  className="cursor-pointer hover:bg-slate-700/50 print:hover:bg-transparent font-bold w-32 whitespace-nowrap"
                  onClick={() => handleSort('code')}
                >
                  Code {sortKey === 'code' && <ArrowUpDown className="w-3 h-3 inline ml-1 opacity-50"/>}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-700/50 print:hover:bg-transparent font-bold w-32 whitespace-nowrap"
                  onClick={() => handleSort('brand')}
                >
                  Marque {sortKey === 'brand' && <ArrowUpDown className="w-3 h-3 inline ml-1 opacity-50"/>}
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">Type d&apos;Appareil</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-700/50 print:hover:bg-transparent font-bold whitespace-nowrap"
                  onClick={() => handleSort('subsystem')}
                >
                  Sous-système {sortKey === 'subsystem' && <ArrowUpDown className="w-3 h-3 inline ml-1 opacity-50"/>}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-700/50 print:hover:bg-transparent text-center font-bold whitespace-nowrap"
                  onClick={() => handleSort('severity')}
                >
                  Sévérité {sortKey === 'severity' && <ArrowUpDown className="w-3 h-3 inline ml-1 opacity-50"/>}
                </TableHead>
                <TableHead className="font-bold print:hidden text-right whitespace-nowrap">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                    Aucun enregistrement trouvé correspondant aux filtres.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map(record => (
                  <TableRow key={record.id} className="border-slate-800 print:border-slate-300 hover:bg-slate-800/50 print:hover:bg-transparent transition-colors">
                    <TableCell className="font-mono font-bold text-white print:text-black whitespace-nowrap">
                      {record.code}
                    </TableCell>
                    <TableCell className="font-medium text-slate-200 print:text-black whitespace-nowrap">{record.brand}</TableCell>
                    <TableCell className="text-slate-400 print:text-black text-xs whitespace-nowrap">
                      {record.appliance} <br/><span className="opacity-70">{record.subtype}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-700 text-slate-300 print:text-black print:border-black font-normal whitespace-nowrap">
                        {record.subsystem}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="print:hidden"><SeverityBadge severity={record.severity} /></span>
                      <span className="hidden print:inline font-bold text-xs">{record.severity}</span>
                    </TableCell>
                    <TableCell className="text-right print:hidden whitespace-nowrap">
                      <Link href={`/error/${record.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline">
                        Voir la Carte →
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ── MOBILE: compact card list ── */}
      <div className="md:hidden space-y-2">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-slate-500 border border-slate-800 rounded-xl">
            Aucun enregistrement trouvé.
          </div>
        ) : (
          filteredData.map(record => (
            <Link
              key={record.id}
              href={`/error/${record.id}`}
              className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 hover:bg-slate-800/60 active:scale-[0.99] transition-all"
            >
              {/* Code */}
              <span className="font-mono font-bold text-white text-sm w-14 flex-shrink-0">{record.code}</span>

              {/* Brand + appliance */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-300">{record.brand}</span>
                  <span className="text-slate-600">·</span>
                  <span className="truncate">{record.appliance}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{record.subsystem}</p>
              </div>

              {/* Severity + chevron */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <SeverityBadge severity={record.severity} />
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
