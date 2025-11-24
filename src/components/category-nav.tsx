'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

const categories = [
  'Beranda',
  'Musik',
  'Karaoke',
  'Berita',
  'Live',
  'Kuliner',
  'Komedi',
  'Film',
  'Horor',
  'Traveling',
  'Hobby',
];

export function CategoryNav() {
  const pathname = usePathname();
  const activeCategory = pathname === '/' ? 'Beranda' : ''; // Simple logic for now

  return (
    <nav className="sticky top-16 z-10 border-b bg-background px-4 py-2">
      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {categories.map(category => (
              <CarouselItem key={category} className="pl-2 basis-auto">
                <Button
                  variant={activeCategory === category ? 'default' : 'secondary'}
                  size="sm"
                  className="h-8"
                >
                  {category}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
        </Carousel>
      </div>
    </nav>
  );
}
