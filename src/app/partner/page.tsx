'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Clock, 
  Bike, 
  CheckCircle, 
  XCircle, 
  Layers, 
  TrendingUp, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  UtensilsCrossed 
} from 'lucide-react';
import { SAMPLE_ORDERS, SAMPLE_BUSINESSES } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';
import { OrderStatus } from '@/lib/data/types';

export default function PartnerDashboardPage() {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const myBusiness = SAMPLE_BUSINESSES[0]; // Піцерія «Покуття»

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const activeOrders = orders.filter((o) => ['confirmed', 'cooking', 'ready_for_pickup', 'courier_assigned', 'in_transit'].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === 'delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Кабінет партнера
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {myBusiness.name}
            </h1>
            <div className="text-xs text-slate-500">Снятин, вул. Шевченка, 14 • Статус: Відчинено</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/partner/products"
            className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition"
          >
            Керувати меню та товарами
          </Link>
          <Link
            href={`/delivery/${myBusiness.slug}`}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
          >
            Сторінка закладу на сайті
          </Link>
        </div>
      </div>

      {/* Metrics overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">Нові замовлення</div>
          <div className="text-3xl font-black text-amber-600 mt-1">
            {pendingOrders.length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">В процесі приготування</div>
          <div className="text-3xl font-black text-emerald-800 mt-1">
            {activeOrders.length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">Виручка за сьогодні</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {formatPrice(760)}
          </div>
        </div>
      </div>

      {/* Pending orders awaiting acceptance */}
      {pendingOrders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
            <span>Нові замовлення (Потребують підтвердження)</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {pendingOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-amber-50/60 rounded-3xl p-6 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-900">
                      Замовлення #{ord.id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                      Очікує кухню
                    </span>
                  </div>

                  <div className="text-xs text-slate-700">
                    Клієнт: <strong>{ord.customer_name}</strong> ({ord.customer_phone}) • Адреса:{' '}
                    <strong>{ord.delivery_address}</strong>
                  </div>

                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-amber-200">
                    {ord.items.map((it, i) => (
                      <span key={i} className="mr-3 font-semibold">
                        {it.quantity}x {it.product_name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'cooking')}
                    className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition active:scale-95"
                  >
                    Прийняти та готувати
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'cancelled')}
                    className="px-4 py-3 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs transition"
                  >
                    Відхилити
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Orders Management */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Активні замовлення в роботі
        </h2>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
          {activeOrders.map((ord) => (
            <div key={ord.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-slate-900">
                    Замовлення #{ord.id}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {ord.status === 'cooking' ? 'Готується' : ord.status === 'ready_for_pickup' ? 'Готове, чекає курʼєра' : 'Курʼєр у дорозі'}
                  </span>
                </div>

                <div className="text-xs text-slate-500">
                  Клієнт: {ord.customer_name} • {ord.delivery_address}
                </div>

                <div className="text-xs text-slate-700">
                  Склад:{' '}
                  {ord.items.map((i) => `${i.quantity}x ${i.product_name}`).join(', ')}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {ord.status === 'cooking' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'ready_for_pickup')}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition"
                  >
                    Готово до видачі / Викликати курʼєра
                  </button>
                )}

                {ord.status === 'ready_for_pickup' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'in_transit')}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                  >
                    Передано курʼєру
                  </button>
                )}

                {ord.status === 'in_transit' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'delivered')}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs transition"
                  >
                    Доставлено клієнту
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
