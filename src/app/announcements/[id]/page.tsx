'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Heart, 
  Share2, 
  Clock, 
  Eye, 
  ShieldCheck, 
  CheckCircle2,
  Flag
} from 'lucide-react';
import { SAMPLE_LISTINGS } from '@/lib/data/sample-data';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAuth } from '@/lib/context/auth-context';
import ListingCard from '@/components/common/ListingCard';

function ListingDetailsContent() {
  const params = useParams();
  const id = params?.id as string;
  const { isFavorite, toggleFavorite } = useAuth();

  const listing = SAMPLE_LISTINGS.find((l) => l.id === id) || SAMPLE_LISTINGS[0];
  const favorited = isFavorite(listing.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const similarListings = SAMPLE_LISTINGS.filter(
    (l) => l.id !== listing.id && l.category_id === listing.category_id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-emerald-800 transition">
          Головна
        </Link>
        <span>/</span>
        <Link href="/announcements" className="hover:text-emerald-800 transition">
          Оголошення
        </Link>
        <span>/</span>
        <span className="text-slate-800 truncate max-w-xs">{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gallery & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Gallery */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={listing.images[activeImageIndex] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails if multiple images */}
            {listing.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx ? 'border-emerald-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description Block */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Опис товару
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Опубліковано: {formatDate(listing.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  Переглядів: {listing.views_count || 120}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsReported(true);
                  alert('Дякуємо! Скаргу надіслано модераторам платформи Снятин.');
                }}
                disabled={isReported}
                className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isReported ? 'Скаргу надіслано' : 'Поскаржитись на оголошення'}</span>
              </button>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-amber-900">
              <div className="font-bold text-sm text-amber-950">
                Поради безпечних угод у Снятині:
              </div>
              <p>
                Ніколи не надсилайте передоплату на банківські картки незнайомим особам.
                Зустрічайтеся особисто в людних місцях Снятина (біля Ратуші, в центрі або у відділеннях пошти) для перевірки товару.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Price & Seller Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6 sticky top-24">
            {/* Price Header */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Вартість
              </div>
              <div className="text-3xl font-black text-emerald-800 mt-1">
                {listing.price_type === 'free'
                  ? 'Безкоштовно'
                  : listing.price_type === 'negotiable'
                  ? `${formatPrice(listing.price)} (Договірна)`
                  : formatPrice(listing.price)}
              </div>
            </div>

            {/* Title */}
            <h1 className="font-extrabold text-lg text-slate-900 leading-snug">
              {listing.title}
            </h1>

            {/* Location & Category info */}
            <div className="space-y-2.5 text-xs text-slate-600 py-3 border-y border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Населений пункт:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {listing.location_name || 'Снятин'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Категорія:</span>
                <span className="font-bold text-slate-800">
                  {listing.category_name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Стан оголошення:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Активне
                </span>
              </div>
            </div>

            {/* Seller profile */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                {listing.user_name ? listing.user_name[0] : 'П'}
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 flex items-center gap-1">
                  <span>{listing.user_name || 'Мешканець Снятина'}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-[11px] text-slate-400">На платформі з 2026 року</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              {/* Phone reveal button */}
              {isPhoneRevealed ? (
                <a
                  href={`tel:${listing.contact_phone}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center block transition shadow-md shadow-emerald-700/20"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  {listing.contact_phone}
                </a>
              ) : (
                <button
                  onClick={() => setIsPhoneRevealed(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center block transition shadow-md shadow-emerald-700/20 active:scale-95"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Показати номер телефону
                </button>
              )}

              {/* Favorite toggle */}
              <button
                onClick={() => toggleFavorite(listing.id)}
                className={`w-full py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                  favorited
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
                <span>{favorited ? 'Збережено в обраному' : 'Додати в обране'}</span>
              </button>

              {/* Share button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Посилання на оголошення скопійовано в буфер обміну!');
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Поділитися посиланням</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar listings */}
      {similarListings.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">
            Схожі оголошення у Снятині
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarListings.map((sim) => (
              <ListingCard key={sim.id} listing={sim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListingDetailsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-slate-400">Завантаження оголошення...</div>}>
      <ListingDetailsContent />
    </Suspense>
  );
}
