'use client';

import Link from 'next/link';
import { Bell, Upload, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './logo';
import { SearchBar } from './search-bar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MainSidebar } from './main-sidebar';
import { SidebarTrigger } from './ui/sidebar';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-2 md:gap-4 h-16 px-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="flex items-center w-full max-w-2xl">
          <SearchBar />
          <Button variant="ghost" size="icon" className="ml-2 flex-shrink-0">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Upload className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Bell className="h-5 w-5" />
        </Button>
        <UserMenu />
      </div>
      <MainSidebar/>
    </header>
  );
}

function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint}/>}
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            user@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
