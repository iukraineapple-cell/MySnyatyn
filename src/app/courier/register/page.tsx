'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Bike, ShieldCheck } from 'lucide-react';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { CourierTransport } from '@/lib/data/types';

export default function CourierRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [locationName, setLocationName] = useState('Снятин');
  const [transport, setTransport] = useState<CourierTransport>('car');
  const [workingArea, setWorkingArea] = useState('Снятин та найближчі села');
  const [agreed, setAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agreed) {
      alert('Будь ласка, заповніть усі поля та підтвердіть згоду з правилами.');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/courier');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Заявку курʼєра прийнято!</h2>
        <p className="text-sm text-slate-600">
          Після швидкої перевірки адміністратором ваш акаунт буде активовано для здійснення доставок у Снятині.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <Link
          href="/delivery"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до доставки</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Реєстрація курʼєра у Снятині
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Заробляйте на доставці їжі та товарів з вільним графіком на власному транспорті.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Прізвище та імʼя *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Володимир Мельник"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Контактний телефон *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 97 000 00 00"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Населений пункт проживання *
            </label>
            <select
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              {SNIATYN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ваш транспорт для доставки *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'car', label: 'Автомобіль' },
              { id: 'scooter', label: 'Скутер / Мото' },
              { id: 'bicycle', label: 'Велосипед' },
              { id: 'foot', label: 'Пішки' },
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setTransport(t.id as any)}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition ${
                  transport === t.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Бажаний район роботи
          </label>
          <input
            type="text"
            value={workingArea}
            onChange={(e) => setWorkingArea(e.target.value)}
            placeholder="Снятин (Центр, мікрорайони) або по селах громади"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span>
              Погоджуюсь з умовами співпраці, правилами збереження замовлень та політикою конфіденційності платформи Снятин.
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Швидка верифікація</span>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            Надіслати анкету курʼєра
          </button>
        </div>
      </form>
    </div>
  );
}
