"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ErrorCodeRecord } from '@/types';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wrench, AlertTriangle, Cpu, RotateCcw, ChevronRight, ChevronDown } from 'lucide-react';
import errorCodesData from '@/data/errorCodes.json';

const allRecords = errorCodesData as ErrorCodeRecord[];

function findRelatedRecord(code: string, currentBrand: string): ErrorCodeRecord | undefined {
  return (
    allRecords.find(r => r.code.toLowerCase() === code.toLowerCase() && r.brand === currentBrand) ??
    allRecords.find(r => r.code.toLowerCase() === code.toLowerCase())
  );
}

interface CollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-1 mb-3 group"
      >
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          {title}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'}`}
        />
      </button>
      {open && children}
    </section>
  );
}

export function RepairCard({ record }: { record: ErrorCodeRecord }) {
  return (
    <Card className="w-full bg-slate-900 border-slate-700 shadow-xl overflow-hidden text-slate-200">
      {/* Header */}
      <CardHeader className="bg-slate-800 border-b border-slate-700 p-4 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-2 text-sm">
              <span className="font-semibold text-white">{record.brand}</span>
              <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="text-slate-400 text-xs truncate">{record.appliance} · {record.subtype}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="text-2xl md:text-3xl font-bold font-mono text-white">
                {record.code}
              </CardTitle>
              <SeverityBadge severity={record.severity} />
            </div>
            <p className="text-sm md:text-base mt-2 font-medium text-slate-300">{record.name}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Status bar */}
        <div className="bg-slate-800/50 px-4 md:px-6 py-2.5 border-b border-slate-700 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="text-slate-500 font-bold uppercase tracking-wider">Sous-système :</span>
            <span className="font-semibold text-slate-300">{record.subsystem}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="text-slate-500 font-bold uppercase tracking-wider">Modèles :</span>
            <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{record.applicable_models.join(', ')}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Description */}
          <div className="text-sm md:text-base text-slate-300 leading-relaxed border-l-2 border-blue-500 pl-4 bg-blue-900/10 py-3 pr-3 rounded-r">
            {record.description}
          </div>

          {/* Root Causes */}
          <CollapsibleSection
            title={<><AlertTriangle className="w-3.5 h-3.5" /> Causes Profondes</>}
            defaultOpen={true}
          >
            <ul className="space-y-2">
              {record.root_causes.sort((a, b) => a.rank - b.rank).map((rc) => (
                <li key={rc.rank} className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold font-mono text-slate-300">
                    {rc.rank}
                  </span>
                  <span className="text-sm leading-snug">{rc.cause}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Diagnostic Steps */}
          <CollapsibleSection
            title={<><Wrench className="w-3.5 h-3.5" /> Procédure de Diagnostic</>}
            defaultOpen={true}
          >
            {/* Desktop table */}
            <div className="overflow-x-auto border border-slate-700 rounded-lg hidden md:block">
              <table className="w-full text-sm">
                <thead className="bg-slate-800">
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-400 w-14">Étape</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-400">Action</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-400">Mesure</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-400">Valeur Attendue</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-400">Outil</th>
                  </tr>
                </thead>
                <tbody>
                  {record.diagnostic_steps.map((step) => (
                    <tr key={step.step} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-center font-bold text-slate-300">{step.step}</td>
                      <td className="px-4 py-3 font-medium">{step.action}</td>
                      <td className="px-4 py-3 text-slate-300">{step.measurement}</td>
                      <td className="px-4 py-3 font-mono text-green-400 font-semibold">{step.expected_value}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{step.tool}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden space-y-2.5">
              {record.diagnostic_steps.map((step) => (
                <div key={step.step} className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5">
                  <div className="flex items-start gap-3 mb-2.5">
                    <span className="bg-blue-600 text-white w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full font-mono text-xs font-bold">
                      {step.step}
                    </span>
                    <p className="font-semibold text-sm leading-snug">{step.action}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pl-9 text-xs">
                    <div>
                      <span className="block text-slate-500 uppercase tracking-wider mb-0.5">Mesure</span>
                      <span className="text-slate-300">{step.measurement}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 uppercase tracking-wider mb-0.5">Attendu</span>
                      <span className="font-mono text-green-400 font-semibold">{step.expected_value}</span>
                    </div>
                    {step.tool && (
                      <div className="col-span-2">
                        <span className="block text-slate-500 uppercase tracking-wider mb-0.5">Outil</span>
                        <span className="text-slate-400">{step.tool}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Test Points + Parts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Test Points */}
            <CollapsibleSection title="⚡ Points de Test" defaultOpen={true}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <ul className="space-y-2">
                  {record.test_points.map((tp, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs border-b border-slate-700/40 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-300">{tp.label}</span>
                      <span className="font-mono font-semibold text-green-400">{tp.expected}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleSection>

            {/* Parts */}
            <CollapsibleSection title="🧰 Pièces Requises" defaultOpen={true}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <ul className="space-y-2">
                  {record.parts_likely_needed.map((part, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs border-b border-slate-700/40 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-300 mr-2">{part.name}</span>
                      <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded flex-shrink-0">{part.part_number}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleSection>
          </div>

          {/* Reset Procedure */}
          <section className="bg-slate-800/30 border border-green-900/50 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl" />
            <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5" /> Procédure de Réinitialisation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{record.reset_procedure}</p>
          </section>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-3 text-xs text-slate-500">
            {(() => {
              const knownRelated = record.related_codes
                .map(code => ({ code, record: findRelatedRecord(code, record.brand) }))
                .filter(({ record }) => record !== undefined);
              return knownRelated.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-400">Voir aussi :</span>
                  {knownRelated.map(({ code, record: related }, idx) => (
                    <Link
                      key={idx}
                      href={`/error/${related!.id}`}
                      className="font-mono text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-800/50 px-2 py-0.5 rounded transition-colors"
                    >
                      {code}
                    </Link>
                  ))}
                </div>
              ) : null;
            })()}
            {record.notes && (
              <div><span className="font-semibold text-slate-400">Note :</span> {record.notes}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
