'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Clock } from 'lucide-react';
import { Listing } from '@/lib/data/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAuth } from '@/lib/context/auth-context';

export default function ListingCard({ listing }: { listing: Listing }) {
  const { isFavorite, toggleFavorite } = useAuth();
  const favorited = isFavorite(listing.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-500/40 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition shadow-sm ${
            favorited
              ? 'bg-rose-50 text-rose-600 fill-rose-600'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600'
          }`}
          title={favorited ? 'Видалити з обраного' : 'Додати в обране'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5">
          {listing.is_promoted && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs">
              ТОП
            </span>
          )}
          {listing.status === 'sold' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-white shadow-xs">
              Продано
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="text-lg font-black text-emerald-800 tracking-tight">
            {listing.price_type === 'free'
              ? 'Безкоштовно'
              : listing.price_type === 'negotiable'
              ? `${formatPrice(listing.price)} (Договірна)`
              : formatPrice(listing.price)}
          </div>

          {/* Title */}
          <Link href={`/announcements/${listing.id}`}>
            <h3 className="font-semibold text-sm text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 mt-1">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Metadata */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{listing.location_name || 'Снятин'}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
            <Clock className="w-3 h-3" />
            <span>{formatDate(listing.created_at).split(' ')[0]} {formatDate(listing.created_at).split(' ')[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
