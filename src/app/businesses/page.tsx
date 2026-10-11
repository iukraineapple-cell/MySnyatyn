'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Search, 
  MapPin, 
  PlusCircle, 
  Bike, 
  Clock, 
  Phone,
  ArrowRight,
  Filter
} from 'lucide-react';
import { BUSINESS_CATEGORIES } from '@/lib/data/categories';
import { SAMPLE_BUSINESSES } from '@/lib/data/sample-data';
import BusinessCard from '@/components/common/BusinessCard';

export default function BusinessesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyDelivery, setOnlyDelivery] = useState(false);

  const filteredBusinesses = useMemo(() => {
    return SAMPLE_BUSINESSES.filter((biz) => {
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchName = biz.name.toLowerCase().includes(query);
        const matchDesc = biz.description.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }

      if (selectedCategory !== 'all') {
        const cat = BUSINESS_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && biz.category_id !== cat.id) return false;
      }

      if (onlyDelivery && !biz.has_delivery) {
        return false;
      }

      return true;
    });
  }, [search, selectedCategory, onlyDelivery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
            <Store className="w-4 h-4 text-indigo-600" />
            Каталог підприємств
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Місцевий бізнес та заклади Снятина
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ресторани, маркети, автосервіси, медичні центри та магазини громади.
          </p>
        </div>

        <Link
          href="/businesses/new"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Додати свій заклад</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за назвою закладу або послугою..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setOnlyDelivery(!onlyDelivery)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${
                onlyDelivery
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Лише з доставкою</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-indigo-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Усі заклади
          </button>
          {BUSINESS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? 'bg-indigo-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
}
