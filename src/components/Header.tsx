'use client'

import { useState, useEffect } from "react";
import { Search, Cast, Bell, X, User } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { ApiKeyStatus } from "@/lib/api-key-manager";


interface HeaderProps {
    onSearch: (query: string) => void;
}

function ApiKeyStatusIndicator() {
  const [keyStatus, setKeyStatus] = useState<ApiKeyStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/youtube/status');
        if (!response.ok) {
          throw new Error('Failed to fetch API key status');
        }
        const data = await response.json();
        setKeyStatus(data.keys);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchStatus();
    // Optional: Refresh status periodically
    const interval = setInterval(fetchStatus, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ApiKeyStatus['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'standby': return 'bg-yellow-500';
      case 'quotaExceeded': return 'bg-red-500';
      case 'error': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  }

  return (
     <div className="p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
      <h3 className="font-bold text-white mb-4 text-lg">API Key Status</h3>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="space-y-3">
        {keyStatus.length > 0 ? keyStatus.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></span>
              <span>{item.name}</span>
            </div>
            <span className="text-sm font-mono px-2 py-1 bg-gray-800 rounded">{item.status}</span>
          </div>
        )) : <p className="text-gray-400">Loading status...</p>}
      </div>
    </div>
  )
}

export default function Header({ onSearch }: HeaderProps) {
  const [query, setQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsSearchVisible(false); // Hide search bar after search on mobile
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  }

  return (
    <header className="bg-black border-b border-gray-800 p-2 sm:p-4 sticky top-0 z-20 h-[57px] sm:h-[73px] flex items-center">
      <div className="flex items-center justify-between w-full">

        <div className={`flex items-center cursor-pointer`}>
          <div className="w-8 h-8 bg-red-600 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-bold text-white whitespace-nowrap">MyVideoTube</h1>
            <p className="text-[10px] sm:text-xs text-gray-400">Created By. DimzM01</p>
          </div>
        </div>

        <div className={`flex-1 absolute sm:static left-0 right-0 px-2 sm:px-4 transition-all duration-300 ${isSearchVisible ? 'top-1/2 -translate-y-1/2 opacity-100' : 'top-[-100%] opacity-0 sm:opacity-100 sm:top-auto sm:translate-y-0'}`}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Cari video..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-4 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
           <button onClick={toggleSearch} className="sm:hidden text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Search">
             {isSearchVisible ? <X className="w-5 h-5"/> : <Search className="w-5 h-5"/>}
           </button>
          <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Cast to TV">
            <Cast className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <Popover>
            <PopoverTrigger asChild>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" sideOffset={15}>
                <ApiKeyStatusIndicator />
            </PopoverContent>
          </Popover>

        </div>
      </div>
    </header>
  );
}
