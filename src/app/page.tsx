'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  Layers, 
  Wrench, 
  Store, 
  Bike, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  ChevronRight,
  TrendingUp,
  Clock,
  Car,
  Home as HomeIcon,
  Smartphone,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { ANNOUNCEMENT_CATEGORIES } from '@/lib/data/categories';
import { 
  SAMPLE_LISTINGS, 
  SAMPLE_SERVICE_PROVIDERS, 
  SAMPLE_BUSINESSES, 
  SAMPLE_EVENTS,
  SAMPLE_SERVICE_REQUESTS
} from '@/lib/data/sample-data';
import ListingCard from '@/components/common/ListingCard';
import ServiceCard from '@/components/common/ServiceCard';
import BusinessCard from '@/components/common/BusinessCard';
import EventCard from '@/components/common/EventCard';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('Всі населені пункти');
  const [activeTab, setActiveTab] = useState('all');

  // Filter listings
  const popularListings = SAMPLE_LISTINGS.filter(l => l.status === 'active');
  const availableServices = SAMPLE_SERVICE_PROVIDERS.slice(0, 3);
  const deliveryBusinesses = SAMPLE_BUSINESSES.filter(b => b.has_delivery);
  const upcomingEvents = SAMPLE_EVENTS.slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Цифрова платформа Снятинщини
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            СНЯТИН. <br className="sm:hidden" />
            <span className="text-emerald-400">Твоє місто.</span> Все поруч.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Знайди все, що потрібно, у Снятині: свіжі оголошення громади, перевірені майстри, місцеві заклади та швидка доставка їжі додому.
          </p>

          {/* Search bar & Location Selector */}
          <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl p-2.5 sm:p-3 shadow-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-2 text-slate-800">
            {/* Search query input */}
            <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full">
              <Search className="w-5 h-5 text-emerald-700 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Що шукаєте у Снятині? (авто, техніка, майстер, піца...)"
                className="w-full text-sm sm:text-base outline-none bg-transparent placeholder:text-slate-400 text-slate-900 font-medium"
              />
            </div>

            {/* Village selector */}
            <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 px-3 py-2 flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="text-xs sm:text-sm font-semibold text-slate-700 bg-transparent outline-none cursor-pointer"
              >
                <option value="Всі населені пункти">Вся громада</option>
                {SNIATYN_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name} ({loc.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Search */}
            <Link
              href={`/announcements?q=${encodeURIComponent(searchQuery)}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-800/30 transition shrink-0 text-center"
            >
              Знайти
            </Link>
          </div>

          {/* Quick popular tags */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Часто шукають:</span>
            <Link href="/announcements?category=tech" className="px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 transition">
              Телефони
            </Link>
            <Link href="/services?category=electricians" className="px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 transition">
              Електрик
            </Link>
            <Link href="/services?category=plumbers" className="px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 transition">
              Сантехнік
            </Link>
            <Link href="/delivery/pizzeria-pokuttia" className="px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 transition">
              Піца «Покуття»
            </Link>
            <Link href="/announcements?category=auto" className="px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 transition">
              Авто
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS (ЧОТИРИ ОСНОВНІ РОЗДІЛИ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Pillar 1: Оголошення */}
          <Link
            href="/announcements"
            className="group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white transition">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition">
                Оголошення
              </h2>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Купівля та продаж авто, нерухомості, техніки та речей у Снятині
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700">
              <span>Переглянути</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Pillar 2: Послуги */}
          <Link
            href="/services"
            className="group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition">
                <Wrench className="w-6 h-6" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition">
                Послуги та Майстри
              </h2>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Сантехніки, електрики, ремонт, вантажоперевезення та краса
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
              <span>Знайти майстра</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Pillar 3: Бізнес */}
          <Link
            href="/businesses"
            className="group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition">
                <Store className="w-6 h-6" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition">
                Місцевий Бізнес
              </h2>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Каталог закладів, магазинів, СТО та підприємств громади
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-700">
              <span>Довідник</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Pillar 4: Доставка */}
          <Link
            href="/delivery"
            className="group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-600 transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
              Експрес
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition">
                <Bike className="w-6 h-6" />
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition">
                Доставка
              </h2>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Замовлення піци, гарячих страв та продуктів від 30 хвилин
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-700">
              <span>Замовити їжу</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. БЛОК «ПОПУЛЯРНІ ОГОЛОШЕННЯ» */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Свіжі надходження
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Популярні оголошення
            </h2>
          </div>

          <Link
            href="/announcements"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            <span>Всі оголошення ({SAMPLE_LISTINGS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Усі категорії
          </button>
          {ANNOUNCEMENT_CATEGORIES.slice(0, 7).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === cat.slug
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* 4. БЛОК «ПОТРІБЕН МАЙСТЕР / ЗНАЙТИ СПЕЦІАЛІСТА» */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-10">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Сервіс для мешканців
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
              Потрібен перевірений майстер у Снятині?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
              Не потрібно годинами шукати контакти по знайомих. Опишіть вашу проблему за 1 хвилину, і вільні електрики, сантехніки чи майстри з ремонту самі запропонують допомогу.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/services/request"
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition"
              >
                + Залишити заявку на майстра
              </Link>
              <Link
                href="/services"
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition border border-white/20"
              >
                Каталог спеціалістів
              </Link>
            </div>
          </div>
        </div>

        {/* Specialists cards */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            Перевірені майстри громади
          </h3>
          <Link href="/services" className="text-xs font-bold text-emerald-800 hover:text-emerald-950">
            Дивитись усіх ({SAMPLE_SERVICE_PROVIDERS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableServices.map((provider) => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* 5. БЛОК «МІСЦЕВІ ЗАКЛАДИ ТА ДОСТАВКА» */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Bike className="w-4 h-4 text-emerald-600" />
              Свіжа гаряча доставка
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Замовити доставку у Снятині
            </h2>
          </div>

          <Link
            href="/delivery"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            <span>Всі заклади доставки</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </section>

      {/* 6. БЛОК «АФІША СНЯТИНА» (КОМПАКТНИЙ РОЗДІЛ ПОДІЙ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Життя громади
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Афіша подій Снятина
            </h2>
          </div>

          <Link
            href="/events"
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
          >
            Вся афіша →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 7. ПЕРЕВАГИ ТА БЕЗПЕКА */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-3xl bg-slate-100 p-8 sm:p-12 border border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Чому жителі обирають платформу «СНЯТИН»?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Єдиний простір, де покупець знаходить сусіда-продавця, а заклад швидко відправляє замовлення через місцевого курʼєра.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Локально і поруч</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Жодних віддалених складів — ви бачите оголошення та заклади саме зі Снятина та сіл вашої громади.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Перевірені майстри</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Реальні відгуки земляків, портфоліо робіт та прямий телефон без прихованих комісій.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Своя доставка</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Підтримка місцевого бізнесу та робота для незалежних курʼєрів на авто, скутерах і велосипедах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
