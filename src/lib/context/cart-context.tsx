'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Business } from '../data/types';

interface CartContextType {
  items: CartItem[];
  businessId: string | null;
  businessName: string | null;
  deliveryFee: number;
  addToCart: (product: Product, business: Business) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(45);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mysnyatyn_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed.items || []);
        setBusinessId(parsed.businessId || null);
        setBusinessName(parsed.businessName || null);
        setDeliveryFee(parsed.deliveryFee || 45);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'mysnyatyn_cart',
        JSON.stringify({ items, businessId, businessName, deliveryFee })
      );
    } catch {
      // ignore
    }
  }, [items, businessId, businessName, deliveryFee]);

  const addToCart = (product: Product, business: Business) => {
    // If adding from a different business, replace or warn
    if (businessId && businessId !== business.id) {
      if (!confirm(`У вашому кошику є страви з іншого закладу (${businessName}). Очистити кошик і додати нові позиції?`)) {
        return;
      }
      setItems([{ product, quantity: 1, businessId: business.id, businessName: business.name }]);
      setBusinessId(business.id);
      setBusinessName(business.name);
      setDeliveryFee(business.delivery_fee || 45);
      return;
    }

    setBusinessId(business.id);
    setBusinessName(business.name);
    setDeliveryFee(business.delivery_fee || 45);

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, businessId: business.id, businessName: business.name }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      if (next.length === 0) {
        setBusinessId(null);
        setBusinessName(null);
      }
      return next;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setBusinessId(null);
    setBusinessName(null);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = items.length > 0 ? subtotal + deliveryFee : 0;
  const itemsCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        businessId,
        businessName,
        deliveryFee,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        total,
        itemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
