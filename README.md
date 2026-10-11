# Мій Снятин (MySnyatyn)

Інформаційно-міський портал міста Снятин та Снятинської міської територіальної громади (Івано-Франківська область).

## 🚀 Технологічний стек

* **Фреймворк**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Turbopack)
* **Бібліотека інтерфейсу**: [React 19](https://react.dev/)
* **Мова програмування**: [TypeScript](https://www.typescriptlang.org/)
* **Стилізація**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Іконки**: [Lucide React](https://lucide.dev/)
* **Бекенд та База даних**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, Realtime)
* **Хостинг та CI/CD**: [Vercel](https://vercel.com/)

---

## 🛠️ Швидкий старт локально

1. **Встановлення залежностей**:
   ```bash
   npm install
   ```

2. **Налаштування змінних середовища**:
   Створіть файл `.env.local` на основі `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Вкажіть ваші ключі `NEXT_PUBLIC_SUPABASE_URL` та `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

3. **Запуск сервера розробки**:
   ```bash
   npm run dev
   ```
   Сайт буде доступний за адресою [http://localhost:3000](http://localhost:3000).

4. **Перевірка збірки та типів**:
   ```bash
   npm run typecheck
   npm run build
   ```

---

## 🔐 Змінні середовища

| Змінна | Призначення | Доступ |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL-адреса проєкту Supabase | Клієнт + Сервер |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Публічний анонімний API ключ | Клієнт + Сервер |
| `SUPABASE_SERVICE_ROLE_KEY` | Секретний ключ адміністратора | Тільки Сервер |
| `DATABASE_URL` | Рядок підключення до PostgreSQL | Тільки Сервер |

---

## 📦 Розгортання (Vercel)

Репозиторій підключено до автоматичного розгортання на Vercel.  
Кожен новий коміт у гілку `main` автоматично ініціює нову збірку та публікацію на продакшн.
