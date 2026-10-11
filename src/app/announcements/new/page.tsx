'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle, 
  Layers, 
  MapPin, 
  Tag, 
  Phone, 
  Info 
} from 'lucide-react';
import { ANNOUNCEMENT_CATEGORIES } from '@/lib/data/categories';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { useAuth } from '@/lib/context/auth-context';

export default function NewAnnouncementPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(ANNOUNCEMENT_CATEGORIES[0].id);
  const [locationId, setLocationId] = useState('loc-sniatyn');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'fixed' | 'negotiable' | 'free'>('fixed');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+380 ');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !contactPhone) {
      alert('Будь ласка, заповніть усі обовʼязкові поля.');
      return;
    }

    setIsSubmitting(true);

    // Simulate save or save to Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/announcements');
      }, 1500);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Оголошення успішно подано!</h2>
        <p className="text-sm text-slate-600">
          Ваше оголошення пройшло первинну валідацію та зʼявиться на дошці оголошень Снятина.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/announcements"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до оголошень</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Подати нове оголошення
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Розмістіть товар чи пропозицію для мешканців Снятина та сіл громади.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Назва оголошення *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Наприклад: Ноутбук Lenovo ThinkPad, новий у коробці"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Категорія *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              {ANNOUNCEMENT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Населений пункт *
            </label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              {SNIATYN_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price & Price Type */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ціна та умови *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <input
                type="number"
                disabled={priceType === 'free'}
                value={priceType === 'free' ? '0' : price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Вкажіть ціну в гривнях"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-bold text-emerald-900 disabled:opacity-50"
              />
              <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">
                грн
              </span>
            </div>

            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-semibold cursor-pointer"
            >
              <option value="fixed">Фіксована</option>
              <option value="negotiable">Договірна</option>
              <option value="free">Безкоштовно</option>
            </select>
          </div>
        </div>

        {/* Photo URL */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Фотографія товару (Посилання на зображення)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/... або залиште пустим для базового фото"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Детальний опис *
          </label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишіть стан, характеристики, причину продажу, чи можливий торг та де можна подивитись у Снятині..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        {/* Contact phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Контактний телефон *
          </label>
          <input
            type="tel"
            required
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="+380 67 000 00 00"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Публікація безкоштовна
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Публікація...' : 'Опублікувати оголошення'}
          </button>
        </div>
      </form>
    </div>
  );
}
