import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/auth-context";
import { CartProvider } from "@/lib/context/cart-context";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "СНЯТИН — Твоє місто. Все поруч | Міська платформа",
  description: "Офіційний міський портал Снятина та громади: свіжі оголошення, послуги майстрів, бізнес-довідник, швидка доставка їжі та афіша подій.",
  keywords: ["Снятин", "оголошення Снятин", "майстри Снятин", "доставка Снятин", "послуги Снятин", "Покуття"],
  authors: [{ name: "Громада міста Снятин" }],
  openGraph: {
    title: "СНЯТИН — Твоє місто. Все поруч",
    description: "Локальна цифрова платформа для жителів Снятина та сіл громади.",
    url: "https://mysnyatyn.vercel.app",
    siteName: "СНЯТИН",
    locale: "uk_UA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
        <AuthProvider>
          <CartProvider>
            <React.Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
              <Navbar />
            </React.Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <React.Suspense fallback={null}>
              <MobileNav />
            </React.Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
