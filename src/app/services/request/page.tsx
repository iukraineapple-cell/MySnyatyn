'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Wrench, MapPin, Clock } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/data/categories';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { useAuth } from '@/lib/context/auth-context';

export default function ServiceRequestFormPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(SERVICE_CATEGORIES[0].id);
  const [locationName, setLocationName] = useState('Снятин');
  const [preferredTime, setPreferredTime] = useState('Якнайшвидше');
  const [phone, setPhone] = useState(user?.phone || '+380 ');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !phone) {
      alert('Будь ласка, заповніть обовʼязкові поля.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/services');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Заявку опубліковано!</h2>
        <p className="text-sm text-slate-600">
          Спеціалісти Снятина відповідної категорії отримають повідомлення та зможуть запропонувати вам послуги.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до каталогу послуг</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Потрібен майстер у Снятині
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Опишіть ваше завдання, щоб місцеві майстри могли звʼязатися з вами з пропозиціями.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Коротко суть завдання *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Наприклад: Замінити розетки та повісити люстру у вітальні"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Сфера робіт *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              {SERVICE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Населений пункт / Адреса *
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
            Бажаний час виконання
          </label>
          <input
            type="text"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            placeholder="Наприклад: Терміново сьогодні або субота після 14:00"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Детальний опис проблеми *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишіть, що саме сталося, які матеріали вже є, або потрібна консультація спеціаліста..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ваш контактний телефон *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380 67 000 00 00"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            Номер буде передано лише майстрам, які відгукнуться на завдання.
          </span>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Безкоштовне розміщення</span>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition active:scale-95"
          >
            Опублікувати заявку
          </button>
        </div>
      </form>
    </div>
  );
}
