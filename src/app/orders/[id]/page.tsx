'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Bike, 
  Phone, 
  Store, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_ORDERS } from '@/lib/data/sample-data';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/lib/data/types';

const STATUS_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'pending', label: 'Очікує підтвердження', desc: 'Заклад отримав замовлення' },
  { status: 'confirmed', label: 'Прийняте закладом', desc: 'Кухня підтвердила наявність' },
  { status: 'cooking', label: 'Готується', desc: 'Страви готуються кухарями' },
  { status: 'ready_for_pickup', label: 'Очікує курʼєра', desc: 'Замовлення запаковано' },
  { status: 'courier_assigned', label: 'Курʼєр призначений', desc: 'Курʼєр прямує до закладу' },
  { status: 'in_transit', label: 'Курʼєр у дорозі', desc: 'Замовлення везуть до вас' },
  { status: 'delivered', label: 'Доставлено', desc: 'Смачного!' },
];

function OrderDetailsContent() {
  const params = useParams();
  const id = (params?.id as string) || 'SNY-8492';

  const initialOrder = SAMPLE_ORDERS.find((o) => o.id === id) || {
    ...SAMPLE_ORDERS[0],
    id,
    status: 'cooking' as OrderStatus,
  };

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialOrder.status);

  // Status index for progress bar
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/delivery"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Повернутися до доставки</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Замовлення #{id}
          </h1>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 w-fit">
            Статус: {STATUS_STEPS.find((s) => s.status === currentStatus)?.label}
          </span>
        </div>
      </div>

      {/* Visual Live Order Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
          <span>Хід виконання замовлення</span>
          <span className="text-xs font-normal text-slate-400">Оновлюється автоматично</span>
        </h2>

        {/* Steps display */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.status} className="relative flex items-start gap-4">
                {/* Dot / Icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div className="space-y-0.5">
                  <div
                    className={`font-bold text-sm ${
                      isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive status switcher for demo testing */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Симуляція статусу:</span>
          {STATUS_STEPS.map((s) => (
            <button
              key={s.status}
              onClick={() => setCurrentStatus(s.status)}
              className={`px-2.5 py-1 rounded-lg transition ${
                currentStatus === s.status
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {s.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Courier & Delivery details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Courier details */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Bike className="w-5 h-5 text-emerald-600" />
            <span>Інформація про курʼєра</span>
          </h3>

          {initialOrder.courier_name ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                  {initialOrder.courier_name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{initialOrder.courier_name}</div>
                  <div className="text-xs text-slate-500">Курʼєр по Снятину</div>
                </div>
              </div>

              {initialOrder.courier_phone && (
                <a
                  href={`tel:${initialOrder.courier_phone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Зателефонувати: {initialOrder.courier_phone}</span>
                </a>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-500">
              Курʼєр буде призначений, коли заклад завершить приготування замовлення.
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Заклад: <strong>{initialOrder.business_name}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Адреса доставки: <strong>{initialOrder.delivery_address}</strong></span>
            </div>
          </div>
        </div>

        {/* Order details & receipt */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Склад замовлення
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            {initialOrder.items.map((it, i) => (
              <div key={i} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{it.quantity}x</span>{' '}
                  <span className="text-slate-700">{it.product_name}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {formatPrice(it.price * it.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Страви:</span>
              <span className="font-bold">{formatPrice(initialOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Доставка:</span>
              <span className="font-bold">{formatPrice(initialOrder.delivery_fee)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-emerald-900 pt-2 border-t border-slate-100">
              <span>Разом:</span>
              <span>{formatPrice(initialOrder.total)}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2">
            Спосіб оплати:{' '}
            <strong>
              {initialOrder.payment_method === 'cash' ? 'Готівкою курʼєру' : 'Карткою курʼєру'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center text-slate-400">Завантаження замовлення...</div>}>
      <OrderDetailsContent />
    </Suspense>
  );
}
