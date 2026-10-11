'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MapPin, 
  Search, 
  PlusCircle, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldAlert, 
  Bike, 
  Store,
  Layers,
  Heart
} from 'lucide-react';
import { SNIATYN_LOCATIONS } from '@/lib/data/locations';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';

export default function Navbar() {
  const pathname = usePathname();
  const { itemsCount } = useCart();
  const { user, role, loginAs, logout } = useAuth();
  
  const [selectedLocation, setSelectedLocation] = useState('Снятин');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const navLinks = [
    { href: '/announcements', label: 'Оголошення' },
    { href: '/services', label: 'Послуги' },
    { href: '/businesses', label: 'Бізнес' },
    { href: '/delivery', label: 'Доставка', badge: 'Hot' },
    { href: '/events', label: 'Афіша' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
        {/* Top announcement bar for role switching and town status */}
        <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-300">СНЯТИН:</span>
              <span>Твоє місто. Все поруч. Офіційний портал громади та сіл району.</span>
            </div>
            
            {/* Quick role switch for instant platform testing */}
            <div className="flex items-center gap-3">
              <span className="text-emerald-300/80">Режим перегляду:</span>
              <button 
                onClick={() => loginAs('user')} 
                className={`px-2 py-0.5 rounded transition ${role === 'user' ? 'bg-emerald-700 text-white font-bold' : 'hover:text-white'}`}
              >
                Мешканець
              </button>
              <button 
                onClick={() => loginAs('business_owner')} 
                className={`px-2 py-0.5 rounded transition flex items-center gap-1 ${role === 'business_owner' ? 'bg-emerald-700 text-white font-bold' : 'hover:text-white'}`}
              >
                <Store className="w-3 h-3" /> Заклад
              </button>
              <button 
                onClick={() => loginAs('courier')} 
                className={`px-2 py-0.5 rounded transition flex items-center gap-1 ${role === 'courier' ? 'bg-emerald-700 text-white font-bold' : 'hover:text-white'}`}
              >
                <Bike className="w-3 h-3" /> Курʼєр
              </button>
              <button 
                onClick={() => loginAs('admin')} 
                className={`px-2 py-0.5 rounded transition flex items-center gap-1 ${role === 'admin' ? 'bg-amber-600 text-white font-bold' : 'hover:text-white'}`}
              >
                <ShieldAlert className="w-3 h-3" /> Адмін
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-black text-xl flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition">
                СН
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 leading-none">
                  СНЯТИН
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 tracking-wider uppercase mt-0.5">
                  Міська платформа
                </span>
              </div>
            </Link>

            {/* Location selector dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 text-xs font-medium border border-emerald-200/60 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{selectedLocation}</span>
                <ChevronDown className="w-3 h-3 text-emerald-600" />
              </button>

              {isLocationOpen && (
                <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 max-h-64 overflow-y-auto">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Населений пункт
                  </div>
                  {SNIATYN_LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocation(loc.name);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 flex items-center justify-between ${
                        selectedLocation === loc.name ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{loc.name}</span>
                      <span className="text-[10px] text-slate-400">{loc.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1.5 transition ${
                    isActive ? 'text-emerald-800 font-bold' : 'hover:text-emerald-700'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-amber-500 text-white">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search link */}
            <Link
              href="/announcements"
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition"
              title="Пошук"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart link */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition"
              title="Кошик доставки"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {itemsCount}
                </span>
              )}
            </Link>

            {/* Favorites link */}
            <Link
              href="/favorites"
              className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition hidden sm:block"
              title="Збережені"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Publish button */}
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-700/20 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Опублікувати</span>
            </button>

            {/* User Profile menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  {user?.full_name ? user.full_name[0] : 'У'}
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="px-4 pb-3 border-b border-slate-100">
                    <div className="font-bold text-sm text-slate-900">{user?.full_name}</div>
                    <div className="text-xs text-slate-500">{user?.phone || user?.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      Роль: {role === 'admin' ? 'Адміністратор' : role === 'business_owner' ? 'Підприємець' : role === 'courier' ? 'Курʼєр' : 'Мешканець'}
                    </div>
                  </div>

                  <div className="py-2 text-xs text-slate-700">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                    >
                      Мій профіль та оголошення
                    </Link>
                    <Link
                      href="/favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                    >
                      Обрані оголошення
                    </Link>

                    {role === 'business_owner' && (
                      <Link
                        href="/partner"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-emerald-50 text-emerald-700 font-bold"
                      >
                        Кабінет закладу / Замовлення
                      </Link>
                    )}

                    {role === 'courier' && (
                      <Link
                        href="/courier"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-emerald-50 text-emerald-700 font-bold"
                      >
                        Кабінет курʼєра / Доставки
                      </Link>
                    )}

                    {role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-amber-50 text-amber-700 font-bold"
                      >
                        Панель адміністратора
                      </Link>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 px-4">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left text-xs font-semibold text-rose-600 hover:text-rose-700 py-1"
                    >
                      Вийти
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 font-bold text-sm text-slate-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                Перемкнути роль для тестування:
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { loginAs('user'); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold"
                >
                  Мешканець
                </button>
                <button
                  onClick={() => { loginAs('business_owner'); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold"
                >
                  Заклад / Партнер
                </button>
                <button
                  onClick={() => { loginAs('courier'); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold"
                >
                  Курʼєр
                </button>
                <button
                  onClick={() => { loginAs('admin'); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-lg bg-amber-50 text-amber-800 font-bold"
                >
                  Адміністратор
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPublishModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
            >
              <PlusCircle className="w-5 h-5" />
              Опублікувати на порталі
            </button>
          </div>
        )}
      </header>

      {/* Publish Modal Choice */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">Що ви бажаєте опублікувати?</h3>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 py-4">
              <Link
                href="/announcements/new"
                onClick={() => setIsPublishModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex items-start gap-3.5 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                    Оголошення про товар чи послугу
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Продаж авто, техніки, нерухомості, речей або господарських товарів
                  </div>
                </div>
              </Link>

              <Link
                href="/services/request"
                onClick={() => setIsPublishModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex items-start gap-3.5 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                    Заявку: «Потрібен майстер»
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Опишіть вашу проблему, щоб спеціалісти Снятина надіслали пропозиції
                  </div>
                </div>
              </Link>

              <Link
                href="/services/new"
                onClick={() => setIsPublishModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex items-start gap-3.5 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                    Анкету спеціаліста / майстра
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Зареєструйтесь як електрик, сантехнік, перевізник тощо
                  </div>
                </div>
              </Link>

              <Link
                href="/businesses/new"
                onClick={() => setIsPublishModalOpen(false)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex items-start gap-3.5 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                    Додати місцевий бізнес / заклад
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Ресторан, маркет, СТО або салон із підключенням до доставки
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
