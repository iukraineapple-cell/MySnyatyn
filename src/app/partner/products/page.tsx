'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, X, Trash2, Edit2, Sparkles } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/data/sample-data';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/data/types';

export default function PartnerProductsPage() {
  const [products, setProducts] = useState<Product[]>(
    SAMPLE_PRODUCTS.filter((p) => p.business_id === 'biz-1')
  );

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Піца');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    const newProd: Product = {
      id: 'prod-' + Date.now(),
      business_id: 'biz-1',
      name: newName,
      description: newDesc,
      price: Number(newPrice),
      image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
      category: newCategory,
      is_available: true,
      created_at: new Date().toISOString(),
    };

    setProducts([newProd, ...products]);
    setNewName('');
    setNewPrice('');
    setNewDesc('');
    setIsAdding(false);
  };

  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !p.is_available } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm('Видалити цю позицію з меню?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/partner"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до панелі замовлень</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Керування меню та товарами
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Редагуйте наявність, ціни та додавайте нові страви піцерії «Покуття».
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Додати страву / товар</span>
          </button>
        </div>
      </div>

      {/* Add new product modal/form */}
      {isAdding && (
        <form onSubmit={handleAddProduct} className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 space-y-4">
          <h3 className="font-bold text-base text-emerald-950">Нова позиція меню</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Назва страви (наприклад: Піца Салямі)"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-emerald-300 text-xs font-semibold"
            />
            <input
              type="number"
              required
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Ціна (грн)"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-emerald-300 text-xs font-semibold"
            />
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Категорія (Піца, Бургери...)"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-emerald-300 text-xs font-semibold"
            />
          </div>
          <textarea
            rows={2}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Склад, грамовка та опис страви..."
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-xs"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
            >
              Зберегти в меню
            </button>
          </div>
        </form>
      )}

      {/* Products list table / cards */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {products.map((p) => (
          <div key={p.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={p.image_url}
                alt={p.name}
                className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                <div className="text-xs text-slate-500">{p.category} • {p.weight_or_volume}</div>
                <div className="font-bold text-xs text-emerald-800 mt-0.5">{formatPrice(p.price)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleAvailability(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  p.is_available
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {p.is_available ? 'В наявності' : 'Немає'}
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="p-2 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
