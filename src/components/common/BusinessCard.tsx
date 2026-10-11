import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Bike, Phone, ArrowRight } from 'lucide-react';
import { Business } from '@/lib/data/types';

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image & Delivery Badge */}
        <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
          <img
            src={business.image_url}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {business.has_delivery && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5" />
              <span>Доставка {business.delivery_time}</span>
            </div>
          )}

          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
            {business.category_name}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Link href={`/businesses/${business.slug}`}>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition line-clamp-1">
              {business.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {business.description}
          </p>

          <div className="mt-3 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{business.address}, {business.location_name}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{business.working_hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <a
            href={`tel:${business.phone}`}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-800 flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Контакти</span>
          </a>

          <Link
            href={business.has_delivery ? `/delivery/${business.slug}` : `/businesses/${business.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition"
          >
            <span>{business.has_delivery ? 'Замовити' : 'Детальніше'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
