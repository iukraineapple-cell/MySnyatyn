'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Wrench, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';

export default function MobileNav() {
  const pathname = usePathname();
  const { itemsCount } = useCart();

  const navItems = [
    { href: '/', label: 'Головна', icon: Home },
    { href: '/announcements', label: 'Оголошення', icon: Layers },
    { href: '/services', label: 'Послуги', icon: Wrench },
    { href: '/delivery', label: 'Доставка', icon: ShoppingBag, badge: itemsCount },
    { href: '/profile', label: 'Кабінет', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition relative ${
                isActive ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-emerald-700'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
