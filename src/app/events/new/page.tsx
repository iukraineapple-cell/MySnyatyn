'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Calendar, MapPin, Tag } from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('м. Снятин, ');
  const [organizer, setOrganizer] = useState('');
  const [priceInfo, setPriceInfo] = useState('Вхід вільний');
  const [category, setCategory] = useState<'culture' | 'sports' | 'community' | 'charity'>('charity');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !eventDate || !location || !organizer) {
      alert('Будь ласка, заповніть усі обовʼязкові поля події.');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/events');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Подію додано на модерацію!</h2>
        <p className="text-sm text-slate-600">
          Після швидкого погодження вона зʼявиться в міській афіші Снятина.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до афіші</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Додати подію в афішу Снятина
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Розкажіть жителям громади про благодійний ярмарок, концерт, матч або зустріч.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Назва заходу *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Благодійний футбольний матч, Виставка покутської писанки..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Дата та час проведення *
            </label>
            <input
              type="datetime-local"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Категорія заходу *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              <option value="charity">Благодійність / ЗСУ</option>
              <option value="sports">Спорт і змагання</option>
              <option value="culture">Культура та концерти</option>
              <option value="community">Громадські зустрічі</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Локація / Місце *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Снятин, Міський стадіон «Колос»"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Вартість квитка / входу
            </label>
            <input
              type="text"
              value={priceInfo}
              onChange={(e) => setPriceInfo(e.target.value)}
              placeholder="Вхід вільний (або 50 грн)"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Організатор або ініціатор *
          </label>
          <input
            type="text"
            required
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            placeholder="Волонтерська спільнота, Будинок культури, ФК Покуття..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Детальний опис події
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Програма заходу, мета збору коштів, запрошені гості..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-rose-600 focus:bg-white font-medium"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Безкоштовно для подій громади</span>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            Опублікувати подію
          </button>
        </div>
      </form>
    </div>
  );
}
