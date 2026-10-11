import { Category } from './types';

export const ANNOUNCEMENT_CATEGORIES: Category[] = [
  { id: 'cat-auto', slug: 'auto', name: 'Авто та запчастини', icon: 'Car', section: 'announcements' },
  { id: 'cat-realty', slug: 'realty', name: 'Нерухомість', icon: 'Home', section: 'announcements' },
  { id: 'cat-tech', slug: 'tech', name: 'Телефони та техніка', icon: 'Smartphone', section: 'announcements' },
  { id: 'cat-home', slug: 'home', name: 'Дім і меблі', icon: 'Armchair', section: 'announcements' },
  { id: 'cat-clothes', slug: 'clothes', name: 'Одяг і взуття', icon: 'Shirt', section: 'announcements' },
  { id: 'cat-kids', slug: 'kids', name: 'Дитячі товари', icon: 'Baby', section: 'announcements' },
  { id: 'cat-animals', slug: 'animals', name: 'Тварини', icon: 'Dog', section: 'announcements' },
  { id: 'cat-garden', slug: 'garden', name: 'Сад, город і господарство', icon: 'Sprout', section: 'announcements' },
  { id: 'cat-build', slug: 'build', name: 'Будівництво та матеріали', icon: 'Hammer', section: 'announcements' },
  { id: 'cat-other', slug: 'other', name: 'Інше', icon: 'Package', section: 'announcements' },
];

export const SERVICE_CATEGORIES: Category[] = [
  { id: 'srv-electric', slug: 'electricians', name: 'Електрики', icon: 'Zap', section: 'services' },
  { id: 'srv-plumb', slug: 'plumbers', name: 'Сантехніки', icon: 'Wrench', section: 'services' },
  { id: 'srv-builder', slug: 'builders', name: 'Будівельники', icon: 'HardHat', section: 'services' },
  { id: 'srv-appliance', slug: 'repair', name: 'Ремонт техніки', icon: 'Tv', section: 'services' },
  { id: 'srv-auto', slug: 'auto-masters', name: 'Автомайстри', icon: 'Settings', section: 'services' },
  { id: 'srv-transport', slug: 'transport', name: 'Перевезення', icon: 'Truck', section: 'services' },
  { id: 'srv-cleaning', slug: 'cleaning', name: 'Прибирання', icon: 'Sparkles', section: 'services' },
  { id: 'srv-garden', slug: 'garden-services', name: 'Сад і город', icon: 'Flower2', section: 'services' },
  { id: 'srv-it', slug: 'computer', name: 'Компʼютерна допомога', icon: 'Laptop', section: 'services' },
  { id: 'srv-beauty', slug: 'beauty', name: 'Краса та догляд', icon: 'Scissors', section: 'services' },
  { id: 'srv-photo', slug: 'photo-video', name: 'Фото та відео', icon: 'Camera', section: 'services' },
  { id: 'srv-other', slug: 'other-services', name: 'Інші послуги', icon: 'Briefcase', section: 'services' },
];

export const BUSINESS_CATEGORIES: Category[] = [
  { id: 'biz-rest', slug: 'restaurants', name: 'Ресторани та кафе', icon: 'Utensils', section: 'businesses' },
  { id: 'biz-shops', slug: 'shops', name: 'Магазини', icon: 'Store', section: 'businesses' },
  { id: 'biz-grocery', slug: 'groceries', name: 'Продукти', icon: 'ShoppingBag', section: 'businesses' },
  { id: 'biz-auto', slug: 'auto-service', name: 'СТО та автомийки', icon: 'CarFront', section: 'businesses' },
  { id: 'biz-beauty', slug: 'beauty-salons', name: 'Салони краси', icon: 'Sparkles', section: 'businesses' },
  { id: 'biz-med', slug: 'medicine', name: 'Медицина та аптеки', icon: 'HeartPulse', section: 'businesses' },
  { id: 'biz-build', slug: 'construction', name: 'Будівельні магазини', icon: 'Building2', section: 'businesses' },
  { id: 'biz-hotels', slug: 'hotels', name: 'Готелі', icon: 'Hotel', section: 'businesses' },
  { id: 'biz-sport', slug: 'sport', name: 'Спорт і відпочинок', icon: 'Trophy', section: 'businesses' },
  { id: 'biz-other', slug: 'other-businesses', name: 'Інші підприємства', icon: 'Building', section: 'businesses' },
];
