export type UserRole = 'user' | 'business_owner' | 'courier' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url?: string;
  role: UserRole;
  location_id?: string;
  location_name?: string;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'місто' | 'село' | 'селище';
  district: string; // e.g. "Коломийський район"
  is_center?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description?: string;
  section: 'announcements' | 'services' | 'businesses';
}

export type ListingPriceType = 'fixed' | 'negotiable' | 'free';
export type ListingStatus = 'active' | 'sold' | 'hidden';

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  price_type: ListingPriceType;
  category_id: string;
  category_name?: string;
  location_id: string;
  location_name?: string;
  contact_phone: string;
  images: string[];
  status: ListingStatus;
  is_promoted?: boolean;
  views_count?: number;
  created_at: string;
  updated_at?: string;
  user_name?: string;
}

export interface ServiceProvider {
  id: string;
  user_id: string;
  name: string;
  title: string;
  description: string;
  category_id: string;
  category_name?: string;
  location_id: string;
  location_name?: string;
  service_area: string; // e.g. "Снятин та села в радіусі 20 км"
  phone: string;
  avatar_url: string;
  portfolio_images: string[];
  price_range: string;
  is_available: boolean;
  rating?: number;
  reviews_count?: number;
  created_at: string;
}

export type ServiceRequestStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceRequest {
  id: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  title: string;
  description: string;
  category_id: string;
  category_name?: string;
  location_name: string;
  preferred_time: string;
  status: ServiceRequestStatus;
  offers_count?: number;
  created_at: string;
}

export interface Business {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  description: string;
  category_id: string;
  category_name?: string;
  address: string;
  location_name: string;
  phone: string;
  working_hours: string;
  image_url: string;
  cover_url?: string;
  has_delivery: boolean;
  delivery_fee?: number;
  min_order?: number;
  delivery_time?: string;
  instagram_url?: string;
  facebook_url?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category?: string;
  weight_or_volume?: string;
  is_available: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  businessId: string;
  businessName: string;
}

export type OrderStatus =
  | 'pending'           // Очікує підтвердження
  | 'confirmed'         // Прийняте закладом
  | 'cooking'           // Готується
  | 'ready_for_pickup'  // Готове до видачі
  | 'courier_assigned'  // Кур'єр призначений
  | 'in_transit'        // Кур'єр забрав
  | 'delivered'         // Доставлено
  | 'cancelled';        // Скасовано

export type PaymentMethod = 'cash' | 'card_to_courier';

export interface Order {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  business_id: string;
  business_name: string;
  courier_id?: string;
  courier_name?: string;
  courier_phone?: string;
  delivery_address: string;
  delivery_instructions?: string;
  status: OrderStatus;
  items: {
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  courier_earnings: number;
  payment_method: PaymentMethod;
  created_at: string;
  updated_at: string;
}

export type CourierTransport = 'car' | 'bicycle' | 'scooter' | 'foot';
export type CourierStatus = 'online' | 'offline' | 'busy';

export interface Courier {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  transport: CourierTransport;
  working_area: string;
  is_verified: boolean;
  status: CourierStatus;
  total_deliveries: number;
  total_earnings: number;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string; // ISO date-time
  location: string;
  organizer: string;
  contact_phone?: string;
  ticket_link?: string;
  price_info: string; // e.g. "Вхід вільний" або "100 грн"
  category: 'culture' | 'sports' | 'community' | 'charity';
  is_approved: boolean;
  created_at: string;
}
