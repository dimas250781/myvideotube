'use client';

import React from 'react';
import { AppHeader } from '@/components/header';
import { CategoryNav } from '@/components/category-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <CategoryNav />
      <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
    </div>
  );
}
