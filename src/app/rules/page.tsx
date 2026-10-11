import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function RulesPage() {
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
          Правила користування платформою «СНЯТИН»
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Основні положення для продавців, покупців, майстрів та курʼєрів громади.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>1. Загальні положення</span>
          </h2>
          <p>
            Платформа «СНЯТИН» створена для зручної взаємодії жителів Снятинської громади та сусідніх населених пунктів. Усі публікації повинні бути достовірними та відповідати чинному законодавству України.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>2. Правила публікації оголошень</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Заборонено розміщення товарів, обіг яких обмежено або заборонено законодавством.</li>
            <li>Ціни вказуються виключно в національній валюті (гривня).</li>
            <li>Фотографії повинні відображати реальний стан товару, що продається.</li>
            <li>Контактний телефон має належати автору оголошення.</li>
          </ul>
        </section>

        <section id="safety" className="space-y-2 p-5 rounded-2xl bg-amber-50 border border-amber-200">
          <h2 className="text-base font-bold text-amber-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>3. Безпека угод та розрахунків</span>
          </h2>
          <p className="text-xs text-amber-900 leading-relaxed">
            Платформа не бере участі у прямих фінансових розрахунках між покупцем і продавцем. Розрахунок за товари та послуги здійснюється при особистій зустрічі або курʼєру при отриманні. Ніколи не перераховуйте аванси незнайомим особам.
          </p>
        </section>
      </div>
    </div>
  );
}
