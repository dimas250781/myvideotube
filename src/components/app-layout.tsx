'use client';

import React, { useState, cloneElement } from 'react';
import { usePathname } from 'next/navigation';
import { AppHeader } from '@/components/header';
import { CategoryNav } from '@/components/category-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState('Beranda');
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && isHomePage) {
      // @ts-ignore
      return cloneElement(child, { activeCategory });
    }
    return child;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      {isHomePage && (
         <CategoryNav
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {isHomePage ? childrenWithProps : children}
      </main>
    </div>
  );
}
