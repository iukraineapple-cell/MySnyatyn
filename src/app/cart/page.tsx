'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Bike, 
  Store, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { 
    items, 
    businessName, 
    deliveryFee, 
    subtotal, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Ваш кошик порожній</h1>
        <p className="text-sm text-slate-500">
          Оберіть смачні страви з піцерій, кафе або продукти з маркетів Снятина.
        </p>
        <div className="pt-2">
          <Link
            href="/delivery"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition"
          >
            <Bike className="w-4 h-4" />
            <span>Переглянути заклади з доставкою</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/delivery"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Продовжити вибір страв</span>
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Кошик замовлення
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:underline font-semibold"
          >
            Очистити кошик
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Business indicator */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3">
            <Store className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                Замовлення із закладу:
              </span>
              <span className="font-extrabold text-sm text-slate-900">
                {businessName}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {formatPrice(item.product.price)} за одиницю
                  </div>
                </div>

                {/* Quantity buttons */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 rounded-lg hover:bg-white text-slate-600 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-1.5 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 rounded-lg hover:bg-white text-slate-600 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for item */}
                <div className="font-black text-sm text-slate-900 min-w-[70px] text-right shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition shrink-0"
                  title="Видалити"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 sticky top-24">
            <h2 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Підсумок замовлення
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Вартість страв / товарів:</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Доставка по Снятину:</span>
                <span className="font-bold text-slate-900">{formatPrice(deliveryFee)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-base">
              <span className="font-bold text-slate-900">Разом до сплати:</span>
              <span className="font-black text-xl text-emerald-800">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition shadow-md shadow-emerald-700/20 active:scale-95"
            >
              <span>Оформити доставку</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Оплата готівкою або карткою курʼєру при отриманні</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
