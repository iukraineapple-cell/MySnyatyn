'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Search, 
  MapPin, 
  PlusCircle, 
  UserPlus, 
  Star, 
  CheckCircle2, 
  PhoneCall,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/data/categories';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { SAMPLE_SERVICE_PROVIDERS, SAMPLE_SERVICE_REQUESTS } from '@/lib/data/sample-data';
import ServiceCard from '@/components/common/ServiceCard';

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredProviders = useMemo(() => {
    return SAMPLE_SERVICE_PROVIDERS.filter((provider) => {
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchName = provider.name.toLowerCase().includes(query);
        const matchTitle = provider.title.toLowerCase().includes(query);
        const matchDesc = provider.description.toLowerCase().includes(query);
        if (!matchName && !matchTitle && !matchDesc) return false;
      }

      if (selectedCategory !== 'all') {
        const cat = SERVICE_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && provider.category_id !== cat.id) return false;
      }

      if (selectedLocation !== 'all') {
        if (provider.location_id !== selectedLocation) return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4 text-amber-600" />
            База майстрів Покуття
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Послуги та майстри у Снятині
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Перевірені електрики, сантехніки, будівельники, майстри побутової техніки та перевізники.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services/request"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Потрібен майстер</span>
          </Link>

          <Link
            href="/services/new"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Анкета майстра</span>
          </Link>
        </div>
      </div>

      {/* "Потрібен майстер" Active Requests Showcase */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <h3 className="font-bold text-sm sm:text-base text-amber-950">
              Гарячі заявки від мешканців (Майстри можуть відгукнутись):
            </h3>
          </div>
          <Link href="/services/request" className="text-xs font-bold text-amber-800 hover:text-amber-950">
            Створити свою заявку →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_SERVICE_REQUESTS.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-sm text-slate-900">{req.title}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 shrink-0">
                  {req.category_name}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{req.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {req.location_name}
                </span>
                <span className="font-semibold text-emerald-700">
                  {req.offers_count} пропозиції
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук спеціаліста (електрик, котел, пралка, бус...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>

          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 pointer-events-none" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium appearance-none cursor-pointer"
            >
              <option value="all">Вся територія Снятинщини</option>
              {SNIATYN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Усі спеціалісти
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Specialists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <ServiceCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}
