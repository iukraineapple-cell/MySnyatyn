'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { useAuth } from '@/lib/context/auth-context';

export default function RegisterPage() {
  const router = useRouter();
  const { loginAs } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locationName, setLocationName] = useState('Снятин');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('user');
    router.push('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
          СН
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Реєстрація у Снятині
        </h1>
        <p className="text-xs text-slate-500">
          Створюйте оголошення, замовляйте доставку та викликайте майстрів.
        </p>
      </div>

      <form onSubmit={handleRegister} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Прізвище та імʼя *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Оксана Василик"
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Номер телефону *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380 67 000 00 00"
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Населений пункт *
          </label>
          <select
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white text-slate-800 font-medium cursor-pointer"
          >
            {SNIATYN_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Електронна пошта *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="oksana@example.com"
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Пароль *
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600 focus:bg-white font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition active:scale-95 mt-2"
        >
          Зареєструватися
        </button>

        <div className="pt-2 text-center text-xs text-slate-500">
          Вже маєте акаунт?{' '}
          <Link href="/auth/login" className="font-bold text-emerald-800 hover:underline">
            Увійти
          </Link>
        </div>
      </form>
    </div>
  );
}
