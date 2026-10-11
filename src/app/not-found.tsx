import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-28 text-center space-y-5">
      <div className="text-7xl font-black text-emerald-800">404</div>
      <h1 className="text-2xl font-black text-slate-900">Сторінку не знайдено</h1>
      <p className="text-sm text-slate-500 leading-relaxed">
        Схоже, адреса була змінена або сторінка більше не існує. Поверніться на головну сторінку Снятина.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
        >
          <Home className="w-4 h-4" />
          <span>На головну сторінку</span>
        </Link>
      </div>
    </div>
  );
}
