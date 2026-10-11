-- ====================================================================
-- СНЯТИН (MySnyatyn) — Початкова схема бази даних Supabase PostgreSQL
-- ====================================================================

-- 1. СТВОРЕННЯ ТИПІВ (ENUMS)
CREATE TYPE user_role AS ENUM ('user', 'business_owner', 'courier', 'admin');
CREATE TYPE listing_price_type AS ENUM ('fixed', 'negotiable', 'free');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'hidden');
CREATE TYPE service_request_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE courier_transport AS ENUM ('car', 'bicycle', 'scooter', 'foot');
CREATE TYPE courier_status AS ENUM ('online', 'offline', 'busy');
CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'cooking',
  'ready_for_pickup',
  'courier_assigned',
  'in_transit',
  'delivered',
  'cancelled'
);
CREATE TYPE payment_method AS ENUM ('cash', 'card_to_courier');

-- 2. ТАБЛИЦЯ НАСЕЛЕНИХ ПУНКТІВ (LOCATIONS)
CREATE TABLE IF NOT EXISTS public.locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'село',
  district TEXT NOT NULL DEFAULT 'Коломийський район',
  is_center BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ТАБЛИЦЯ КАТЕГОРІЙ (CATEGORIES)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  section TEXT NOT NULL, -- 'announcements', 'services', 'businesses'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ТАБЛИЦЯ ПРОФІЛІВ КОРИСТУВАЧІВ (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  location_id TEXT REFERENCES public.locations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ТАБЛИЦЯ ОГОЛОШЕНЬ (LISTINGS)
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  price_type listing_price_type DEFAULT 'fixed',
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  location_id TEXT NOT NULL REFERENCES public.locations(id),
  contact_phone TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  status listing_status DEFAULT 'active',
  is_promoted BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ТАБЛИЦЯ ОБРАНОГО (FAVORITES)
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- 7. ТАБЛИЦЯ СПЕЦІАЛІСТІВ / МАЙСТРІВ (SERVICE_PROVIDERS)
CREATE TABLE IF NOT EXISTS public.service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  location_id TEXT NOT NULL REFERENCES public.locations(id),
  service_area TEXT NOT NULL DEFAULT 'Снятин та села громади',
  phone TEXT NOT NULL,
  avatar_url TEXT,
  portfolio_images TEXT[] DEFAULT '{}',
  price_range TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ТАБЛИЦЯ ЗАЯВОК: ПОТРІБЕН МАЙСТЕР (SERVICE_REQUESTS)
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  location_name TEXT NOT NULL,
  preferred_time TEXT,
  status service_request_status DEFAULT 'open',
  contact_phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ТАБЛИЦЯ ПРОПОЗИЦІЙ ВІД МАЙСТРІВ (SERVICE_OFFERS)
CREATE TABLE IF NOT EXISTS public.service_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  comment TEXT,
  estimated_price NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ТАБЛИЦЯ МІСЦЕВИХ ЗАКЛАДІВ ТА БІЗНЕСУ (BUSINESSES)
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  address TEXT NOT NULL,
  location_name TEXT NOT NULL DEFAULT 'Снятин',
  phone TEXT NOT NULL,
  working_hours TEXT NOT NULL DEFAULT '09:00 - 21:00',
  image_url TEXT,
  has_delivery BOOLEAN DEFAULT FALSE,
  delivery_fee NUMERIC DEFAULT 45,
  min_order NUMERIC DEFAULT 100,
  delivery_time TEXT DEFAULT '30-45 хв',
  is_verified BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ТАБЛИЦЯ ТОВАРІВ ТА МЕНЮ (PRODUCTS)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT,
  weight_or_volume TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ТАБЛИЦЯ КУРʼЄРІВ (COURIERS)
CREATE TABLE IF NOT EXISTS public.couriers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  transport courier_transport DEFAULT 'car',
  working_area TEXT NOT NULL DEFAULT 'Снятин',
  is_verified BOOLEAN DEFAULT FALSE,
  status courier_status DEFAULT 'offline',
  total_deliveries INTEGER DEFAULT 0,
  total_earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ТАБЛИЦЯ ЗАМОВЛЕНЬ ДОСТАВКИ (ORDERS)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  business_id UUID NOT NULL REFERENCES public.businesses(id),
  courier_id UUID REFERENCES public.couriers(id) ON DELETE SET NULL,
  delivery_address TEXT NOT NULL,
  delivery_instructions TEXT,
  status order_status DEFAULT 'pending',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC NOT NULL DEFAULT 45,
  total NUMERIC NOT NULL,
  courier_earnings NUMERIC NOT NULL DEFAULT 45,
  payment_method payment_method DEFAULT 'cash',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ТАБЛИЦЯ АФІШІ ТА ПОДІЙ (EVENTS)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  organizer TEXT NOT NULL,
  contact_phone TEXT,
  price_info TEXT DEFAULT 'Вхід вільний',
  category TEXT NOT NULL DEFAULT 'community',
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. ТАБЛИЦЯ СКАРГ (REPORTS)
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  target_type TEXT NOT NULL, -- 'listing', 'service', 'business'
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- АТОМАРНА ФУНКЦІЯ: ПРИЙНЯТТЯ ЗАМОВЛЕННЯ КУРʼЄРОМ БЕЗ КОНФЛІКТІВ
-- ====================================================================
CREATE OR REPLACE FUNCTION public.accept_delivery_order(
  p_order_id UUID,
  p_courier_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_order RECORD;
BEGIN
  -- Блокуємо рядок для запобігання паралельним призначенням
  SELECT * INTO v_order
  FROM public.orders
  WHERE id = p_order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Замовлення не знайдено');
  END IF;

  IF v_order.courier_id IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Замовлення вже прийнято іншим курʼєром');
  END IF;

  IF v_order.status NOT IN ('cooking', 'ready_for_pickup') THEN
    RETURN jsonb_build_object('success', false, 'message', 'Замовлення ще не готове до взяття курʼєром');
  END IF;

  -- Призначаємо курʼєра
  UPDATE public.orders
  SET 
    courier_id = p_courier_id,
    status = 'courier_assigned',
    updated_at = NOW()
  WHERE id = p_order_id;

  RETURN jsonb_build_object('success', true, 'message', 'Замовлення успішно призначено вам');
END;
$$;

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) ПОЛІТИКИ БЕЗПЕКИ
-- ====================================================================
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Публічне читання довідників, оголошень, майстрів та бізнесів
CREATE POLICY "Public read locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read active listings" ON public.listings FOR SELECT USING (status = 'active');
CREATE POLICY "Public read service providers" ON public.service_providers FOR SELECT USING (is_available = true);
CREATE POLICY "Public read active businesses" ON public.businesses FOR SELECT USING (is_active = true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (is_available = true);
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (is_approved = true);

-- Користувачі керують лише власними оголошеннями
CREATE POLICY "Users insert own listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own listings" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own listings" ON public.listings FOR DELETE USING (auth.uid() = user_id);

-- Партнери керують своїм закладом та товарами
CREATE POLICY "Owners update own business" ON public.businesses FOR UPDATE USING (auth.uid() = owner_id);

-- Клієнти та кур'єри бачать відповідні замовлення
CREATE POLICY "Clients read own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id OR auth.uid() IN (SELECT user_id FROM public.couriers WHERE id = courier_id));
