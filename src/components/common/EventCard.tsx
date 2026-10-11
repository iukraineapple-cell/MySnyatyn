import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { EventItem } from '@/lib/data/types';
import { formatDate } from '@/lib/utils';

export default function EventCard({ event }: { event: EventItem }) {
  const dateObj = new Date(event.event_date);
  const day = dateObj.getDate();
  const monthNames = ['СІЧ', 'ЛЮТ', 'БЕР', 'КВІ', 'ТРА', 'ЧЕР', 'ЛИП', 'СЕР', 'ВЕР', 'ЖОВ', 'ЛИС', 'ГРУ'];
  const monthStr = monthNames[dateObj.getMonth()];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Date Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2 text-center shadow-md min-w-[52px]">
            <span className="block text-lg font-black text-emerald-900 leading-none">{day}</span>
            <span className="block text-[10px] font-bold text-emerald-600 mt-0.5">{monthStr}</span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-emerald-900/80 backdrop-blur-md text-white text-[11px] font-bold">
            {event.price_info}
          </div>
        </div>

        <div className="p-4">
          <Link href={`/events`}>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition line-clamp-2">
              {event.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Tag className="w-3 h-3 text-slate-400" />
              <span>Організатор: {event.organizer}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-semibold">Снятинська громада</span>
          <Link
            href="/events"
            className="font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            Детальніше →
          </Link>
        </div>
      </div>
    </div>
  );
}
