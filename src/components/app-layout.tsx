'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/header';
import { MainSidebar } from '@/components/main-sidebar';
import React from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <div className="flex-1 min-w-0">
        <AppHeader />
        <SidebarInset>
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
