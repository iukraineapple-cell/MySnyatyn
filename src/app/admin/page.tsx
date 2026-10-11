'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Users, 
  Layers, 
  Store, 
  Bike, 
  Calendar, 
  Flag, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { SAMPLE_LISTINGS, SAMPLE_BUSINESSES, SAMPLE_ORDERS, SAMPLE_EVENTS } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'partners' | 'couriers' | 'reports'>('overview');

  const [pendingListings, setPendingListings] = useState([
    { id: 'l-mod-1', title: 'Продаж комбайна «Нива» у с. Стецева', price: 180000, author: 'Микола Т.', date: '10 хв тому' },
    { id: 'l-mod-2', title: 'Оренда гаража біля Ратуші Снятина', price: 2000, author: 'Олег С.', date: '35 хв тому' },
  ]);

  const [pendingPartners, setPendingPartners] = useState([
    { id: 'p-mod-1', name: 'Кавʼярня «Покутський ранок»', address: 'вул. Шевченка, 2', phone: '+380 97 444 11 00', delivery: true },
  ]);

  const [pendingCouriers, setPendingCouriers] = useState([
    { id: 'c-mod-1', name: 'Роман Григораш', transport: 'Скутер Yamaha', phone: '+380 67 888 22 11', area: 'Снятин, Завалля' },
    { id: 'c-mod-2', name: 'Денис Коваль', transport: 'Автомобіль Renault', phone: '+380 50 333 44 55', area: 'Вся громада' },
  ]);

  const approveListing = (id: string) => {
    setPendingListings((prev) => prev.filter((item) => item.id !== id));
    alert('Оголошення схвалено та опубліковано на дошці Снятина.');
  };

  const rejectListing = (id: string) => {
    setPendingListings((prev) => prev.filter((item) => item.id !== id));
    alert('Оголошення відхилено.');
  };

  const approvePartner = (id: string) => {
    setPendingPartners((prev) => prev.filter((item) => item.id !== id));
    alert('Заклад активовано! Тепер він може приймати замовлення на доставку.');
  };

  const approveCourier = (id: string) => {
    setPendingCouriers((prev) => prev.filter((item) => item.id !== id));
    alert('Курʼєра успішно верифіковано та допущено до доставок.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Адміністративна панель
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Керування платформою «СНЯТИН»
            </h1>
            <div className="text-xs text-slate-400">Снятинська міська громада • Система модерації</div>
          </div>
        </div>

        <Link
          href="/"
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Повернутися на сайт</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Огляд платформи', icon: TrendingUp },
          { id: 'listings', label: `Модерація оголошень (${pendingListings.length})`, icon: Layers },
          { id: 'partners', label: `Заявки закладів (${pendingPartners.length})`, icon: Store },
          { id: 'couriers', label: `Активація курʼєрів (${pendingCouriers.length})`, icon: Bike },
          { id: 'reports', label: 'Скарги та безпека (0)', icon: Flag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-400">Користувачі громади</div>
              <div className="text-3xl font-black text-slate-900 mt-1">1,480</div>
              <div className="text-[11px] text-emerald-600 font-bold mt-1">+24 за тиждень</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-400">Активні оголошення</div>
              <div className="text-3xl font-black text-emerald-800 mt-1">
                {SAMPLE_LISTINGS.length + 120}
              </div>
              <div className="text-[11px] text-emerald-600 font-bold mt-1">Усі населені пункти</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-400">Партнери (Бізнес)</div>
              <div className="text-3xl font-black text-indigo-700 mt-1">
                {SAMPLE_BUSINESSES.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">3 з доставкою</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-400">Доставок за місяць</div>
              <div className="text-3xl font-black text-amber-600 mt-1">342</div>
              <div className="text-[11px] text-slate-500 mt-1">Без затримок</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-slate-900">Журнал системи</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                <span>Нове замовлення #ord-102 оформлено в Піцерії «Покуття»</span>
                <span className="text-slate-400">2 хв тому</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                <span>Заявка майстра сантехніка «Михайло Григораш» активна</span>
                <span className="text-slate-400">1 год тому</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                <span>База даних Supabase: PostgreSQL підключено успішно</span>
                <span className="text-emerald-700 font-bold">Активно</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Listings Moderation */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Оголошення на перевірці</h2>
          {pendingListings.length > 0 ? (
            <div className="space-y-3">
              {pendingListings.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Автор: {item.author} • Ціна: {formatPrice(item.price)} • {item.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveListing(item.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
                    >
                      Схвалити
                    </button>
                    <button
                      onClick={() => rejectListing(item.id)}
                      className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition"
                    >
                      Відхилити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
              Усі оголошення перевірено. Черга порожня!
            </div>
          )}
        </div>
      )}

      {/* Tab: Partners */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Заявки закладів на підключення</h2>
          {pendingPartners.length > 0 ? (
            <div className="space-y-3">
              {pendingPartners.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Адреса: {item.address} • Тел: {item.phone} • Доставка: Так
                    </div>
                  </div>

                  <button
                    onClick={() => approvePartner(item.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
                  >
                    Активувати заклад
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
              Нових заявок від партнерів немає.
            </div>
          )}
        </div>
      )}

      {/* Tab: Couriers */}
      {activeTab === 'couriers' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Анкети курʼєрів на активацію</h2>
          {pendingCouriers.length > 0 ? (
            <div className="space-y-3">
              {pendingCouriers.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Транспорт: <strong>{item.transport}</strong> • Тел: {item.phone} • Район: {item.area}
                    </div>
                  </div>

                  <button
                    onClick={() => approveCourier(item.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
                  >
                    Верифікувати курʼєра
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
              Усі анкети курʼєрів оброблено.
            </div>
          )}
        </div>
      )}

      {/* Tab: Reports */}
      {activeTab === 'reports' && (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
          Скарг на публікації чи підозрілих дій наразі не зафіксовано.
        </div>
      )}
    </div>
  );
}
