-- ====================================================================
-- СНЯТИН — Початкові дані (Seed Data)
-- ====================================================================

-- Населені пункти Снятинської громади
INSERT INTO public.locations (id, name, type, district, is_center) VALUES
  ('loc-sniatyn', 'Снятин', 'місто', 'Коломийський район', true),
  ('loc-zavallia', 'Завалля', 'село', 'Коломийський район', false),
  ('loc-stetseva', 'Стецева', 'село', 'Коломийський район', false),
  ('loc-vovchkivtsi', 'Вовчківці', 'село', 'Коломийський район', false),
  ('loc-potichok', 'Потічок', 'село', 'Коломийський район', false),
  ('loc-khutir-budyliv', 'Хутір-Будилів', 'село', 'Коломийський район', false),
  ('loc-budyliv', 'Будилів', 'село', 'Коломийський район', false),
  ('loc-dzhuriv', 'Джурів', 'село', 'Коломийський район', false),
  ('loc-rusiv', 'Русів', 'село', 'Коломийський район', false),
  ('loc-ustia', 'Устя', 'село', 'Коломийський район', false),
  ('loc-vydyniv', 'Видинів', 'село', 'Коломийський район', false),
  ('loc-krasnostavtsi', 'Красноставці', 'село', 'Коломийський район', false),
  ('loc-pidvysoka', 'Підвисока', 'село', 'Коломийський район', false),
  ('loc-balyntsi', 'Балинці', 'село', 'Коломийський район', false),
  ('loc-illyntsi', 'Іллінці', 'село', 'Коломийський район', false),
  ('loc-orelets', 'Орелець', 'село', 'Коломийський район', false),
  ('loc-rudnyky', 'Рудники', 'село', 'Коломийський район', false),
  ('loc-tulova', 'Тулова', 'село', 'Коломийський район', false),
  ('loc-troitsia', 'Троїця', 'село', 'Коломийський район', false)
ON CONFLICT (id) DO NOTHING;

-- Категорії оголошень
INSERT INTO public.categories (id, slug, name, icon, section) VALUES
  ('cat-auto', 'auto', 'Авто та запчастини', 'Car', 'announcements'),
  ('cat-realty', 'realty', 'Нерухомість', 'Home', 'announcements'),
  ('cat-tech', 'tech', 'Телефони та техніка', 'Smartphone', 'announcements'),
  ('cat-home', 'home', 'Дім і меблі', 'Armchair', 'announcements'),
  ('cat-clothes', 'clothes', 'Одяг і взуття', 'Shirt', 'announcements'),
  ('cat-kids', 'kids', 'Дитячі товари', 'Baby', 'announcements'),
  ('cat-animals', 'animals', 'Тварини', 'Dog', 'announcements'),
  ('cat-garden', 'garden', 'Сад, город і господарство', 'Sprout', 'announcements'),
  ('cat-build', 'build', 'Будівництво та матеріали', 'Hammer', 'announcements'),
  ('cat-other', 'other', 'Інше', 'Package', 'announcements'),

  -- Категорії послуг
  ('srv-electric', 'electricians', 'Електрики', 'Zap', 'services'),
  ('srv-plumb', 'plumbers', 'Сантехніки', 'Wrench', 'services'),
  ('srv-builder', 'builders', 'Будівельники', 'HardHat', 'services'),
  ('srv-appliance', 'repair', 'Ремонт техніки', 'Tv', 'services'),
  ('srv-auto', 'auto-masters', 'Автомайстри', 'Settings', 'services'),
  ('srv-transport', 'transport', 'Перевезення', 'Truck', 'services'),
  ('srv-cleaning', 'cleaning', 'Прибирання', 'Sparkles', 'services'),
  ('srv-garden', 'garden-services', 'Сад і город', 'Flower2', 'services'),
  ('srv-it', 'computer', 'Компʼютерна допомога', 'Laptop', 'services'),
  ('srv-beauty', 'beauty', 'Краса та догляд', 'Scissors', 'services'),
  ('srv-photo', 'photo-video', 'Фото та відео', 'Camera', 'services'),
  ('srv-other', 'other-services', 'Інші послуги', 'Briefcase', 'services'),

  -- Категорії бізнесу
  ('biz-rest', 'restaurants', 'Ресторани та кафе', 'Utensils', 'businesses'),
  ('biz-shops', 'shops', 'Магазини', 'Store', 'businesses'),
  ('biz-grocery', 'groceries', 'Продукти', 'ShoppingBag', 'businesses'),
  ('biz-auto', 'auto-service', 'СТО та автомийки', 'CarFront', 'businesses'),
  ('biz-beauty', 'beauty-salons', 'Салони краси', 'Sparkles', 'businesses'),
  ('biz-med', 'medicine', 'Медицина та аптеки', 'HeartPulse', 'businesses'),
  ('biz-build', 'construction', 'Будівельні магазини', 'Building2', 'businesses'),
  ('biz-hotels', 'hotels', 'Готелі', 'Hotel', 'businesses'),
  ('biz-sport', 'sport', 'Спорт і відпочинок', 'Trophy', 'businesses'),
  ('biz-other', 'other-businesses', 'Інші підприємства', 'Building', 'businesses')
ON CONFLICT (id) DO NOTHING;
