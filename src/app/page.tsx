import { 
  Building2, 
  Newspaper, 
  MapPin, 
  Compass, 
  PhoneCall, 
  Users, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Database,
  CloudUpload,
  GitBranch
} from "lucide-react";

export default function Home() {
  const isSupabaseConfigured = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id"));

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Шапка сайту */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
              СН
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Мій Снятин</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Портал громади
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#sections" className="hover:text-blue-600 transition">Розділи</a>
            <a href="#stack" className="hover:text-blue-600 transition">Архітектура</a>
            <a href="#status" className="hover:text-blue-600 transition">Статус підключення</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/iukraineapple-cell/MySnyatyn"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-500" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Головний екран (Hero) */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Готово до розробки та проектування
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Інформаційний портал <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 bg-clip-text text-transparent">
                міста Снятин
              </span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
              Сучасна цифрова платформа для жителів, гостей та бізнесу Снятинщини: новини, каталог закладів, оголошення, довідка та електронні сервіси.
            </p>

            {/* Статус інтеграцій */}
            <div id="status" className="mt-10 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm text-slate-900">GitHub</div>
                  <div className="text-xs text-slate-500 mt-0.5">Репозиторій налаштовано, origin підключено</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm text-slate-900">Vercel</div>
                  <div className="text-xs text-slate-500 mt-0.5">Готово до автодеплою з гілки main</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                {isSupabaseConfigured ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-sm text-slate-900">Supabase</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {isSupabaseConfigured ? "Підключення активне" : "Очікує ключі в .env.local"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Заплановані розділи сайту */}
        <section id="sections" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Майбутні модулі платформи</h2>
            <p className="mt-2 text-sm text-slate-600">
              Базова структура створена для швидкого проектування та наповнення необхідними сервісами.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Новини та Афіша</h3>
              <p className="text-sm text-slate-600">
                Оперативні міські новини, анонси культурних та спортивних заходів, офіційні повідомлення громади.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Бізнес та Заклади</h3>
              <p className="text-sm text-slate-600">
                Каталог підприємств, магазинів, кафе, сервісних центрів та медичних закладів із контактами та графіком роботи.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Дошка оголошень</h3>
              <p className="text-sm text-slate-600">
                Місцеві оголошення жителів Снятина: робота, нерухомість, послуги, авто та взаємодопомога.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Довідник та Екстрені служби</h3>
              <p className="text-sm text-slate-600">
                Важливі телефони екстрених служб, комунальних підприємств, міської ради, розклад руху транспорту.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Історія та Туризм</h3>
              <p className="text-sm text-slate-600">
                Визначні пам'ятки архітектури (Ратуша, сакральні споруди), історія Покуття, маршрути для гостей міста.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Інтерактивна мапа</h3>
              <p className="text-sm text-slate-600">
                Зручна навігація містом із позначеннями інфраструктури, укриттів, аптек та цікавих локацій.
              </p>
            </div>
          </div>
        </section>

        {/* Робочий стек */}
        <section id="stack" className="py-12 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Технологічний ланцюг проєкту</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="font-semibold text-slate-900 text-sm">Antigravity</div>
                <div className="text-xs text-slate-500 mt-1">Швидка парна розробка та кодування</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="font-semibold text-slate-900 text-sm">Next.js 16 + React 19</div>
                <div className="text-xs text-slate-500 mt-1">Швидкий App Router та SSR</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="font-semibold text-slate-900 text-sm">Supabase</div>
                <div className="text-xs text-slate-500 mt-1">PostgreSQL, Auth, Storage, Realtime</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="font-semibold text-slate-900 text-sm">Vercel</div>
                <div className="text-xs text-slate-500 mt-1">Швидкісний Edge деплой та CDN</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Підвал */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MySnyatyn. Усі права захищено.</p>
          <div className="flex items-center gap-4">
            <span>Снятин, Івано-Франківська область</span>
            <span>•</span>
            <span>Україна</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
