'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { SAMPLE_SERVICE_PROVIDERS } from '@/lib/data/sample-data';

function ServiceProviderDetailsContent() {
  const params = useParams();
  const id = params?.id as string;

  const provider = SAMPLE_SERVICE_PROVIDERS.find((p) => p.id === id) || SAMPLE_SERVICE_PROVIDERS[0];

  const [requestText, setRequestText] = useState('');
  const [clientPhone, setClientPhone] = useState('+380 ');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText || !clientPhone) {
      alert('Будь ласка, заповніть деталі заявки.');
      return;
    }
    setIsSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до каталогу майстрів</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Bio & Portfolio */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={provider.avatar_url}
                alt={provider.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-50 shadow-md shrink-0"
              />

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900">{provider.name}</h1>
                  <span title="Перевірений спеціаліст">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </span>
                </div>
                <div className="text-sm font-bold text-emerald-800">{provider.title}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {provider.location_name}
                  </span>
                  <span>•</span>
                  <span>Зона виїзду: {provider.service_area}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <h2 className="font-bold text-base text-slate-900">Про спеціаліста</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {provider.description}
              </p>
            </div>

            {/* Portfolio images */}
            {provider.portfolio_images.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="font-bold text-base text-slate-900">Фотографії виконаних робіт</h2>
                <div className="grid grid-cols-2 gap-3">
                  {provider.portfolio_images.map((img, i) => (
                    <div key={i} className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact & Quick Request */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6 sticky top-24">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Орієнтовна вартість
              </div>
              <div className="text-2xl font-black text-emerald-900 mt-1">
                {provider.price_range}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${provider.phone}`}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center flex items-center justify-center gap-2 transition shadow-md shadow-emerald-700/20"
              >
                <Phone className="w-4 h-4" />
                <span>{provider.phone}</span>
              </a>
            </div>

            {/* Request Form */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">
                Залишити заявку майстру
              </h3>

              {isSent ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-xs font-semibold space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Заявку надіслано!</span>
                  </div>
                  <p>Майстер отримає ваші контакти та звʼяжеться з вами найближчим часом.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest} className="space-y-3">
                  <textarea
                    required
                    rows={3}
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    placeholder="Опишіть ваше завдання (наприклад: полагодити бойлер у Снятині)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-emerald-600"
                  />

                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ваш номер телефону"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-emerald-600"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition active:scale-95"
                  >
                    Надіслати заявку
                  </button>
                </form>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 text-[11px] text-slate-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Прямий звʼязок без посередників. Оплата лише за фактом виконаної роботи.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceProviderDetailsPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto p-12 text-center text-slate-400">Завантаження профілю майстра...</div>}>
      <ServiceProviderDetailsContent />
    </Suspense>
  );
}
