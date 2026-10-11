'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bike, 
  Clock, 
  MapPin, 
  Phone, 
  Store, 
  CheckCircle, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Banknote,
  Navigation
} from 'lucide-react';
import { SAMPLE_ORDERS } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';
import { Order, OrderStatus } from '@/lib/data/types';

export default function CourierDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [activeDeliveryId, setActiveDeliveryId] = useState<string | null>('ord-101');
  const [acceptedOrders, setAcceptedOrders] = useState<string[]>(['ord-101']);

  // Available orders waiting for a courier
  const availableOrders = orders.filter(
    (o) => (o.status === 'ready_for_pickup' || o.status === 'cooking') && !o.courier_id && !acceptedOrders.includes(o.id)
  );

  // Active delivery taken by this courier
  const myActiveDelivery = orders.find((o) => o.id === activeDeliveryId);

  // Accept delivery atomically
  const handleAcceptOrder = (orderId: string) => {
    if (!isOnline) {
      alert('Будь ласка, увімкніть статус «На лінії», щоб приймати замовлення.');
      return;
    }

    if (acceptedOrders.includes(orderId)) {
      alert('Це замовлення вже прийнято!');
      return;
    }

    setAcceptedOrders((prev) => [...prev, orderId]);
    setActiveDeliveryId(orderId);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'courier_assigned',
              courier_id: 'cour-demo',
              courier_name: 'Курʼєр Володимир (Снятин)',
              courier_phone: '+380 97 111 44 55',
            }
          : o
      )
    );
  };

  const handleUpdateDeliveryStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );

    if (nextStatus === 'delivered') {
      setActiveDeliveryId(null);
      alert('Замовлення успішно доставлено! Винагороду зараховано.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar with Online Toggle */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <Bike className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Кабінет курʼєра Снятина
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Володимир М. (Авто)
            </h1>
            <div className="text-xs text-slate-500">Район: Снятин та прилеглі села</div>
          </div>
        </div>

        {/* Online / Offline switch */}
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-700">
            {isOnline ? '🟢 На лінії' : '⚪ Не працюю'}
          </span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              isOnline
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
            }`}
          >
            {isOnline ? 'Вимкнути зміну' : 'Вийти на лінію'}
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">Доставок за сьогодні</div>
          <div className="text-3xl font-black text-emerald-900 mt-1">4</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">Зароблено за день</div>
          <div className="text-3xl font-black text-emerald-800 mt-1">200 грн</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">Рейтинг курʼєра</div>
          <div className="text-3xl font-black text-amber-500 mt-1">5.0 ★</div>
        </div>
      </div>

      {/* Current Active Delivery */}
      {myActiveDelivery && myActiveDelivery.status !== 'delivered' && (
        <div className="bg-emerald-50/80 rounded-3xl p-6 border-2 border-emerald-500 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
              <h2 className="font-black text-lg text-emerald-950">
                Ваша активна доставка #{myActiveDelivery.id}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-700 text-white">
              Винагорода: {myActiveDelivery.courier_earnings} грн
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Pickup */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">
                1. Де забрати:
              </span>
              <div className="font-extrabold text-sm text-slate-900">
                {myActiveDelivery.business_name}
              </div>
              <div className="text-slate-600">вул. Шевченка, 14, Снятин</div>
            </div>

            {/* Dropoff */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">
                2. Куди доставити клієнту:
              </span>
              <div className="font-extrabold text-sm text-slate-900">
                {myActiveDelivery.customer_name} ({myActiveDelivery.customer_phone})
              </div>
              <div className="text-slate-600">{myActiveDelivery.delivery_address}</div>
              {myActiveDelivery.delivery_instructions && (
                <div className="text-amber-800 bg-amber-50 p-1.5 rounded-lg font-semibold mt-1">
                  Примітка: {myActiveDelivery.delivery_instructions}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              Оплата замовлення: <strong>{myActiveDelivery.total} грн</strong> ({myActiveDelivery.payment_method === 'cash' ? 'Готівка' : 'Термінал / карта'})
            </div>

            <div className="flex items-center gap-2">
              {myActiveDelivery.status === 'courier_assigned' && (
                <button
                  onClick={() => handleUpdateDeliveryStatus(myActiveDelivery.id, 'in_transit')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
                >
                  Замовлення забрав, вирушаю
                </button>
              )}

              {myActiveDelivery.status === 'in_transit' && (
                <button
                  onClick={() => handleUpdateDeliveryStatus(myActiveDelivery.id, 'delivered')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition active:scale-95"
                >
                  Успішно доставлено ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Available Orders List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">
          <span>Доступні замовлення поруч</span>
          <span className="text-xs font-normal text-slate-500">
            {isOnline ? 'Оновлюється в реальному часі' : 'Ви офлайн'}
          </span>
        </h2>

        {availableOrders.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {availableOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-base text-slate-900">
                      Замовлення #{ord.id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      Винагорода: {ord.courier_earnings} грн
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <Store className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Заклад: <strong>{ord.business_name}</strong></span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Район доставки: <strong>м. Снятин</strong> (точна адреса відкриється після прийняття)
                  </div>
                </div>

                <button
                  onClick={() => handleAcceptOrder(ord.id)}
                  disabled={!isOnline || Boolean(activeDeliveryId)}
                  className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition active:scale-95 disabled:opacity-50 shrink-0"
                >
                  Взяти доставку
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-xs text-slate-500">
            Наразі нових замовлень немає. Щойно заклад приготує нове замовлення, воно зʼявиться тут.
          </div>
        )}
      </div>
    </div>
  );
}
