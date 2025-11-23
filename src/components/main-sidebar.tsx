'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Home, Clapperboard, Flame, History, Settings, Flag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { SidebarTrigger } from './ui/sidebar';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/subscriptions', label: 'Subscriptions', icon: Clapperboard },
  { href: '/trending', label: 'Trending', icon: Flame },
  { href: '/history', label: 'History', icon: History },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="hidden md:flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings" className="w-full">
                <SidebarMenuButton tooltip={{children: 'Settings', side: 'right'}} isActive={pathname === '/settings'}>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/report-history" className="w-full">
                <SidebarMenuButton tooltip={{children: 'Report history', side: 'right'}} isActive={pathname === '/report-history'}>
                    <Flag />
                    <span>Report history</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
