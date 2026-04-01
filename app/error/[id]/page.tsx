import React from 'react';
import errorCodesData from '@/data/errorCodes.json';
import { ErrorCodeRecord } from '@/types';
import { RepairCard } from '@/components/cards/RepairCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return errorCodesData.map((record) => ({
    id: record.id,
  }));
}

export default function ErrorDetailPage({ params }: { params: { id: string } }) {
  const record = (errorCodesData as ErrorCodeRecord[]).find(r => r.id === params.id);

  if (!record) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pt-12 md:pt-24">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à la recherche
        </Link>
      </div>

      <RepairCard record={record} />
    </div>
  );
}
