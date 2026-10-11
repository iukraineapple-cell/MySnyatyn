'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';
import { SAMPLE_LISTINGS } from '@/lib/data/sample-data';
import ListingCard from '@/components/common/ListingCard';

export default function FavoritesPage() {
  const { favorites } = useAuth();
  const savedListings = SAMPLE_LISTINGS.filter((l) => favorites.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/announcements"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>До всіх оголошень</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Обрані оголошення
            </h1>
            <p className="text-sm text-slate-500">
              Збережені товари та пропозиції для швидкого доступу ({savedListings.length})
            </p>
          </div>
        </div>
      </div>

      {savedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Список обраного порожній</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Натискайте на сердечко біля будь-якого оголошення, щоб зберегти його і повернутися до перегляду пізніше.
          </p>
          <Link
            href="/announcements"
            className="inline-block px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
          >
            Перейти до каталогу оголошень
          </Link>
        </div>
      )}
    </div>
  );
}
