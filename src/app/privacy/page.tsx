import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>На головну</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Політика конфіденційності
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Як ми захищаємо ваші персональні дані на платформі «СНЯТИН».
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <p>
          Ми поважаємо приватність мешканців Снятина та відповідально ставимося до захисту особистої інформації.
        </p>

        <h3 className="font-bold text-base text-slate-900">1. Які дані ми збираємо</h3>
        <p>
          Для забезпечення роботи сервісів ми зберігаємо: імʼя, контактний номер телефону, населений пункт проживання та адресу доставки (лише при оформленні замовлення).
        </p>

        <h3 className="font-bold text-base text-slate-900">2. Використання даних</h3>
        <p>
          Контактні дані використовуються виключно для звʼязку між сторонами угоди (покупець — продавець, замовник — майстер, клієнт — курʼєр). Ми не передаємо ваші контакти третім сторонам для рекламного спаму.
        </p>

        <h3 className="font-bold text-base text-slate-900">3. Безпека даних</h3>
        <p>
          Усі паролі та облікові записи шифруються через захищені сервери Supabase з дотриманням сучасних стандартів шифрування та правил RLS (Row Level Security).
        </p>
      </div>
    </div>
  );
}
