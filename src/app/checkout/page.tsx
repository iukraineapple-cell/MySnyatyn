'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Bike,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { formatPrice } from '@/lib/utils';
import { PaymentMethod } from '@/lib/data/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, businessName, businessId, deliveryFee, subtotal, total, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+380 ');
  const [deliveryAddress, setDeliveryAddress] = useState('м. Снятин, ');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Кошик порожній</h1>
        <p className="text-sm text-slate-500">Додайте страви чи товари для оформлення.</p>
        <Link
          href="/delivery"
          className="inline-block px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
        >
          До вибору закладів
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress || deliveryAddress.trim() === 'м. Снятин,') {
      alert('Будь ласка, заповніть контактні дані та точну адресу доставки у Снятині.');
      return;
    }

    setIsSubmitting(true);

    // Generate realistic order ID
    const newOrderId = 'ord-' + Math.floor(100 + Math.random() * 900);

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      router.push(`/orders/${newOrderId}`);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Повернутися до кошика</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Оформлення доставки
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Вкажіть адресу у Снятині або селах громади для курʼєра.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              1. Контактні дані одержувача
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ваше імʼя *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Тарас Шевченко"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Номер телефону *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+380 67 000 00 00"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
                  />
                </div>
              </div>
            </div>

            <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 pt-2">
              2. Адреса доставки
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Вулиця, номер будинку, квартира *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="м. Снятин, вул. Воєводи Коснятина, 14, кв. 12"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Примітки для курʼєра (підʼїзд, код дверей, поверх)
                </label>
                <textarea
                  rows={2}
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Другий поверх, домофон не працює, наберіть за 5 хв..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
                />
              </div>
            </div>

            <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 pt-2">
              3. Спосіб оплати
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="hidden"
                />
                <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Готівкою курʼєру</div>
                  <div className="text-slate-500 font-normal mt-0.5">При отриманні замовлення</div>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                  paymentMethod === 'card_to_courier'
                    ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card_to_courier'}
                  onChange={() => setPaymentMethod('card_to_courier')}
                  className="hidden"
                />
                <CreditCard className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Карткою курʼєру</div>
                  <div className="text-slate-500 font-normal mt-0.5">Термінал або прямий переказ</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order summary & Submit */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 sticky top-24">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Ваше замовлення
            </h3>

            <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">
              Заклад: {businessName}
            </div>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-900">{item.quantity}x</span>{' '}
                    <span className="text-slate-700 truncate">{item.product.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Страви:</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Доставка:</span>
                <span className="font-bold text-slate-900">{formatPrice(deliveryFee)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">До сплати:</span>
              <span className="font-black text-xl text-emerald-800">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-700/20 active:scale-95 disabled:opacity-50"
            >
              <Bike className="w-5 h-5" />
              <span>{isSubmitting ? 'Оформлення...' : 'Підтвердити замовлення'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
