import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { ServiceProvider } from '@/lib/data/types';

export default function ServiceCard({ provider }: { provider: ServiceProvider }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-500/40 transition-all duration-200 p-5 flex flex-col justify-between">
      <div>
        {/* Header with Avatar & Online status */}
        <div className="flex items-start gap-3.5">
          <div className="relative shrink-0">
            <img
              src={provider.avatar_url}
              alt={provider.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-100 shadow-xs"
            />
            {provider.is_available && (
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                title="Майстер на зв'язку"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-slate-900 truncate">
                {provider.name}
              </h3>
              <span title="Перевірений майстер">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              </span>
            </div>

            <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 inline-block px-2 py-0.5 rounded-md mt-1">
              {provider.category_name}
            </div>

            {provider.rating && (
              <div className="flex items-center gap-1 mt-1 text-xs text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{provider.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({provider.reviews_count} відгуків)</span>
              </div>
            )}
          </div>
        </div>

        {/* Title & Bio */}
        <h4 className="font-semibold text-sm text-slate-800 mt-3 line-clamp-1">
          {provider.title}
        </h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {provider.description}
        </p>

        {/* Price & Area */}
        <div className="mt-3.5 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Вартість</span>
            <span className="font-bold text-emerald-900">{provider.price_range}</span>
          </div>

          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Територія</span>
            <span className="text-slate-700 truncate max-w-[120px] block">{provider.location_name}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
        <a
          href={`tel:${provider.phone}`}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Зателефонувати</span>
        </a>

        <Link
          href={`/services/${provider.id}`}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs"
        >
          <span>Профіль</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
