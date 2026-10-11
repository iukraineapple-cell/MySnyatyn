'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  PlusCircle, 
  Tag, 
  ArrowUpDown, 
  X,
  Layers
} from 'lucide-react';
import { ANNOUNCEMENT_CATEGORIES } from '@/lib/data/categories';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { SAMPLE_LISTINGS } from '@/lib/data/sample-data';
import ListingCard from '@/components/common/ListingCard';

export default function AnnouncementsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredListings = useMemo(() => {
    return SAMPLE_LISTINGS.filter((item) => {
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        const cat = ANNOUNCEMENT_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && item.category_id !== cat.id) return false;
      }

      // Location
      if (selectedLocation !== 'all') {
        if (item.location_id !== selectedLocation) return false;
      }

      // Price min
      if (priceMin && item.price < Number(priceMin)) return false;

      // Price max
      if (priceMax && item.price > Number(priceMax)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [search, selectedCategory, selectedLocation, sortBy, priceMin, priceMax]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-emerald-600" />
            Дошка оголошень
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Оголошення у Снятині та громаді
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Знайдено {filteredListings.length} актуальних пропозицій
          </p>
        </div>

        <Link
          href="/announcements/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Подати оголошення</span>
        </Link>
      </div>

      {/* Search & Quick Filters Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-2 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за назвою чи описом..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Selector */}
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 pointer-events-none" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium appearance-none cursor-pointer"
            >
              <option value="all">Всі села громади</option>
              {SNIATYN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium appearance-none cursor-pointer"
            >
              <option value="newest">Найновіші спочатку</option>
              <option value="price_asc">Ціна: від дешевих</option>
              <option value="price_desc">Ціна: від дорогих</option>
            </select>
          </div>
        </div>

        {/* Category horizontal pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Усі ({SAMPLE_LISTINGS.length})
          </button>
          {ANNOUNCEMENT_CATEGORIES.map((cat) => (
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

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Нічого не знайдено</h3>
          <p className="text-xs text-slate-500">
            Спробуйте змінити фільтри пошуку або скинути параметри.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedLocation('all');
              setPriceMin('');
              setPriceMax('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition"
          >
            Скинути всі фільтри
          </button>
        </div>
      )}
    </div>
  );
}
