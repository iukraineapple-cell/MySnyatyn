'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, PlusCircle, MapPin, Tag, ArrowRight } from 'lucide-react';
import { SAMPLE_EVENTS } from '@/lib/data/sample-data';
import EventCard from '@/components/common/EventCard';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = SAMPLE_EVENTS.filter((ev) => {
    if (activeCategory === 'all') return true;
    return ev.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-rose-600" />
            Культурне та громадське життя
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Афіша подій Снятина
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Благодійні заходи, футбольні матчі, концерти, виставки та зустрічі громади.
          </p>
        </div>

        <Link
          href="/events/new"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-md transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Додати подію в афішу</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Усі події' },
          { id: 'charity', label: 'Благодійні ярмарки' },
          { id: 'sports', label: 'Спорт і футбол' },
          { id: 'culture', label: 'Культура та мистецтво' },
          { id: 'community', label: 'Зустрічі громади' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
