import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-900/30">
                СН
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white block">
                  СНЯТИН
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  Твоє місто. Все поруч.
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Головна цифрова екосистема Снятинщини: дошка оголошень, перевірені майстри, каталог місцевих закладів та швидка доставка замовлень.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>м. Снятин, Коломийський район, Івано-Франківська обл.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Гаряча лінія підтримки: +380 (3476) 2-15-40</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@snyatyn.city</span>
              </div>
            </div>
          </div>

          {/* Column 1: Розділи */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide uppercase">
              Розділи
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/announcements" className="hover:text-emerald-400 transition">
                  Оголошення Снятина
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition">
                  Послуги та майстри
                </Link>
              </li>
              <li>
                <Link href="/services/request" className="hover:text-emerald-400 transition">
                  Потрібен майстер
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="hover:text-emerald-400 transition">
                  Каталог бізнесу
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-emerald-400 transition">
                  Доставка їжі та товарів
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition">
                  Афіша подій
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Для бізнесу та кур'єрів */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide uppercase">
              Співпраця
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/businesses/new" className="hover:text-emerald-400 transition">
                  Підключити заклад / бізнес
                </Link>
              </li>
              <li>
                <Link href="/courier/register" className="hover:text-emerald-400 transition">
                  Стати курʼєром
                </Link>
              </li>
              <li>
                <Link href="/services/new" className="hover:text-emerald-400 transition">
                  Додати анкету майстра
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-emerald-400 transition">
                  Кабінет закладу
                </Link>
              </li>
              <li>
                <Link href="/courier" className="hover:text-emerald-400 transition">
                  Кабінет курʼєра
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition">
                  Адміністративна панель
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Інформація */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide uppercase">
              Довідка
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/rules" className="hover:text-emerald-400 transition">
                  Правила публікацій
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition">
                  Політика конфіденційності
                </Link>
              </li>
              <li>
                <Link href="/rules#safety" className="hover:text-emerald-400 transition">
                  Безпечні угоди
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-emerald-400 transition">
                  Особистий кабінет
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 СНЯТИН. Усі права захищено. Створено з турботою про рідне місто.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Зроблено для Снятина та сіл Покуття</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
