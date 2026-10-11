'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Bike, 
  CheckCircle2, 
  Plus, 
  ShoppingCart
} from 'lucide-react';
import { SAMPLE_BUSINESSES, SAMPLE_PRODUCTS } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';

function BusinessProfileContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart, items } = useCart();

  const business = SAMPLE_BUSINESSES.find((b) => b.slug === slug) || SAMPLE_BUSINESSES[0];
  const products = SAMPLE_PRODUCTS.filter((p) => p.business_id === business.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до каталогу бізнесу</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm">
        <div className="relative aspect-21/9 w-full bg-slate-100 max-h-72">
          <img
            src={business.image_url}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {business.has_delivery && (
            <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2">
              <Bike className="w-4 h-4" />
              <span>Доставка: {business.delivery_time} ({business.delivery_fee} грн)</span>
            </div>
          )}

          <div className="absolute bottom-4 left-6 text-white space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {business.category_name}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">{business.name}</h1>
          </div>
        </div>

        {/* Business Info Bar */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Адреса</span>
              <span className="font-semibold text-slate-800">{business.address}, {business.location_name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Години роботи</span>
              <span className="font-semibold text-slate-800">{business.working_hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Телефон для замовлень</span>
              <a href={`tel:${business.phone}`} className="font-bold text-emerald-800 hover:underline">
                {business.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-sm text-slate-900 mb-1">Про заклад</h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {business.description}
          </p>
        </div>
      </div>

      {/* Menu / Catalog Items if present */}
      {products.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Меню та товари закладу
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Оберіть позиції для доставки містом Снятин
              </p>
            </div>

            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Переглянути кошик ({items.length})</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
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
                    {product.weight_or_volume && (
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                        {product.weight_or_volume}
                      </span>
                    )}
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
                        onClick={() => addToCart(product, business)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                          inCart
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{inCart ? `У кошику (${inCart.quantity})` : 'Додати'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BusinessProfilePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-slate-400">Завантаження закладу...</div>}>
      <BusinessProfileContent />
    </Suspense>
  );
}
