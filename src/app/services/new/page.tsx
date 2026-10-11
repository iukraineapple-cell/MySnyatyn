'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, UserPlus, Wrench } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/data/categories';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { useAuth } from '@/lib/context/auth-context';

export default function NewServiceProviderPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState(user?.full_name || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(SERVICE_CATEGORIES[0].id);
  const [locationId, setLocationId] = useState('loc-sniatyn');
  const [serviceArea, setServiceArea] = useState('Снятин та села в радіусі 15 км');
  const [phone, setPhone] = useState(user?.phone || '+380 ');
  const [priceRange, setPriceRange] = useState('від 300 грн');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !description || !phone) {
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
        <h2 className="text-2xl font-black text-slate-900">Анкету майстра збережено!</h2>
        <p className="text-sm text-slate-600">
          Ваш профіль додано до каталогу спеціалістів Снятина. Тепер жителі громади зможуть замовляти ваші послуги.
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
          Реєстрація спеціаліста / майстра
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Створіть свій публічний профіль для отримання замовлень від жителів Снятинщини.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Ваше імʼя або назва бригади *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Іван Ковальчук"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Спеціалізація (Категорія) *
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
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Короткий заголовок профілю *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Наприклад: Професійний сантехнік: монтаж опалення, котлів, труб"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Населений пункт базування *
            </label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              {SNIATYN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Територія виїзду
            </label>
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="Снятин та села в радіусі 20 км"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Орієнтовні розцінки
            </label>
            <input
              type="text"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              placeholder="від 350 грн / точка"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Контактний телефон *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 67 000 00 00"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Фотографія профілю (URL)
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://images.unsplash.com/... (залиште порожнім для типової іконки)"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Детальний опис досвіду та послуг *
          </label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Розкажіть про ваш стаж, види робіт, який інструмент використовуєте, гарантію на роботу..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Реєстрація безкоштовна</span>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            Створити анкету майстра
          </button>
        </div>
      </form>
    </div>
  );
}
