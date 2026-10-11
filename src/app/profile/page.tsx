'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Layers, 
  Heart, 
  ShoppingBag, 
  Wrench, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut,
  ShieldAlert,
  Bike,
  Store,
  CheckCircle2,
  Trash2,
  Eye
} from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';
import { SAMPLE_LISTINGS, SAMPLE_ORDERS, SAMPLE_SERVICE_REQUESTS } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';
import ListingCard from '@/components/common/ListingCard';

export default function ProfilePage() {
  const { user, role, loginAs, logout, favorites } = useAuth();
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'requests' | 'favorites'>('listings');

  const myListings = SAMPLE_LISTINGS.slice(0, 2);
  const myFavoriteListings = SAMPLE_LISTINGS.filter((l) => favorites.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-800 font-black text-2xl flex items-center justify-center border-4 border-emerald-50 shadow-md">
            {user?.full_name ? user.full_name[0] : 'У'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{user?.full_name}</h1>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Снятин, Івано-Франківська обл.
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {user?.phone || '+380 67 111 22 33'}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                {user?.email}
              </span>
            </div>

            <div className="pt-1">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Роль у системі:{' '}
                {role === 'admin'
                  ? 'Адміністратор'
                  : role === 'business_owner'
                  ? 'Підприємець'
                  : role === 'courier'
                  ? 'Курʼєр'
                  : 'Мешканець громади'}
              </span>
            </div>
          </div>
        </div>

        {/* Action / Role switch */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          {role === 'business_owner' && (
            <Link
              href="/partner"
              className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs text-center shadow-xs"
            >
              Кабінет закладу
            </Link>
          )}

          {role === 'courier' && (
            <Link
              href="/courier"
              className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs text-center shadow-xs"
            >
              Кабінет курʼєра
            </Link>
          )}

          {role === 'admin' && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs text-center shadow-xs"
            >
              Панель адміна
            </Link>
          )}

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs transition"
          >
            Вийти
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'listings', label: `Мої оголошення (${myListings.length})`, icon: Layers },
          { id: 'orders', label: `Мої доставки (${SAMPLE_ORDERS.length})`, icon: ShoppingBag },
          { id: 'requests', label: 'Заявки на майстрів (2)', icon: Wrench },
          { id: 'favorites', label: `Обране (${myFavoriteListings.length})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Ваші опубліковані оголошення</h2>
            <Link
              href="/announcements/new"
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
            >
              + Подати ще оголошення
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((l) => (
              <div key={l.id} className="relative group">
                <ListingCard listing={l} />
                <div className="mt-2 flex items-center justify-between p-2 rounded-xl bg-slate-100 text-xs">
                  <span className="font-bold text-emerald-800">Статус: Активне</span>
                  <div className="flex items-center gap-2">
                    <button className="text-slate-500 hover:text-slate-800 font-semibold">
                      Редагувати
                    </button>
                    <button className="text-rose-600 hover:text-rose-800 font-semibold">
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Історія замовлень доставки</h2>
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {SAMPLE_ORDERS.map((ord) => (
              <div key={ord.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-slate-900">
                      Замовлення #{ord.id}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {ord.status === 'in_transit' ? 'У дорозі' : 'Очікує підтвердження'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Заклад: <strong>{ord.business_name}</strong> • Сума: <strong>{formatPrice(ord.total)}</strong>
                  </div>
                </div>

                <Link
                  href={`/orders/${ord.id}`}
                  className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition"
                >
                  Відстежити замовлення →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Ваші заявки на майстрів</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_SERVICE_REQUESTS.map((r) => (
              <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-slate-900">{r.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {r.offers_count} пропозиції
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{r.description}</p>
                <div className="pt-2 text-xs font-semibold text-emerald-700">
                  Статус: Пошук майстра активний
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Збережені оголошення</h2>
          {myFavoriteListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myFavoriteListings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
              Ви ще не додали жодного оголошення в обране.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
