'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('q') as string;
    if (searchQuery.trim()) {
      router.push(`/results?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/results');
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <div className="relative w-full">
        <Input
          type="search"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Search"
          className="h-10 pl-4 pr-12 rounded-full rounded-r-none border-r-0"
          aria-label="Search"
        />
      </div>
      <Button type="submit" variant="secondary" className="h-10 rounded-l-none rounded-r-full px-6" aria-label="Perform search">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
