'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../data/types';
import { createClient } from '../supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-1',
  email: 'snyatyn.resident@example.com',
  full_name: 'Олексій Покутський',
  phone: '+380 67 111 22 33',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  role: 'user',
  location_name: 'Снятин',
  created_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_DEMO_USER);
  const [favorites, setFavorites] = useState<string[]>(['lst-1', 'lst-3']);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('mysnyatyn_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
      const savedUser = localStorage.getItem('mysnyatyn_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }

    // Check Supabase Auth if available
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: userMeta.full_name || session.user.email?.split('@')[0] || 'Користувач',
            phone: userMeta.phone || '',
            role: (userMeta.role as UserRole) || 'user',
            created_at: session.user.created_at,
          });
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const toggleFavorite = (listingId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId];
      try {
        localStorage.setItem('mysnyatyn_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);

  const loginAs = (newRole: UserRole) => {
    const updatedUser: UserProfile = {
      ...DEFAULT_DEMO_USER,
      role: newRole,
      full_name:
        newRole === 'business_owner'
          ? 'Власник Піцерії «Покуття»'
          : newRole === 'courier'
          ? 'Курʼєр Володимир (Снятин)'
          : newRole === 'admin'
          ? 'Адміністратор Снятин Онлайн'
          : 'Олексій Покутський',
    };
    setUser(updatedUser);
    try {
      localStorage.setItem('mysnyatyn_user', JSON.stringify(updatedUser));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('mysnyatyn_user');
    } catch {
      // ignore
    }
    const supabase = createClient();
    if (supabase) {
      supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'user',
        favorites,
        toggleFavorite,
        isFavorite,
        loginAs,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
