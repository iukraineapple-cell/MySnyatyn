'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bike, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SAMPLE_BUSINESSES, SAMPLE_PRODUCTS } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';
import BusinessCard from '@/components/common/BusinessCard';

export default function DeliveryPage() {
  const { addToCart, items, itemsCount } = useCart();
  const deliveryPartners = SAMPLE_BUSINESSES.filter((b) => b.has_delivery);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold backdrop-blur-md">
            <Bike className="w-3.5 h-3.5" />
            Локальна доставка по місту Снятин та селах
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Гаряча їжа та продукти <br />
            <span className="text-emerald-300">прямо до ваших дверей</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed">
            Замовляйте піцу, бургери, традиційні покутські страви та свіжі продукти з улюблених закладів Снятина. Наші курʼєри доставлять замовлення за 30-45 хвилин.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Clock className="w-4 h-4 text-emerald-300" />
              <span>Середній час: 35 хв</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Оплата готівкою або курʼєру</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Pill if items in cart */}
      {itemsCount > 0 && (
        <div className="sticky top-20 z-30 max-w-md mx-auto">
          <Link
            href="/cart"
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-900/30 transition transform hover:scale-102"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-emerald-800 font-bold flex items-center justify-center text-xs">
                {itemsCount}
              </div>
              <div>
                <div className="font-bold text-sm">У кошику є замовлення</div>
                <div className="text-xs text-emerald-200">Перейти до оформлення доставки</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}

      {/* Delivery Partners List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Заклади з доставкою у Снятині
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Оберіть заклад для перегляду повного меню та оформлення замовлення
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryPartners.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </div>

      {/* Popular Menu Items */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Хіти продажу серед жителів
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Найпопулярніші страви, які замовляють зараз
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PRODUCTS.slice(0, 4).map((product) => {
            const biz = SAMPLE_BUSINESSES.find((b) => b.id === product.business_id) || SAMPLE_BUSINESSES[0];
            const inCart = items.find((i) => i.product.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold">
                    {biz.name}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-emerald-900">
                      {formatPrice(product.price)}
                    </span>

                    <button
                      onClick={() => addToCart(product, biz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                        inCart
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{inCart ? `У кошику (${inCart.quantity})` : 'Замовити'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
