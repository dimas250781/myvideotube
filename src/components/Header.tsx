'use client'

import { useState } from "react";
import { Search, Video, Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
    onSearch: (query: string) => void;
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

        {/* Left Section: Logo - shows on non-search view on mobile */}
        <div className={`flex items-center cursor-pointer transition-opacity duration-300 ${isSearchVisible ? 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto' : 'opacity-100'}`}>
          <div className="w-8 h-8 bg-red-600 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-bold text-white whitespace-nowrap">MyVideoTube</h1>
            <p className="text-[10px] sm:text-xs text-gray-400">Created By. DimzM01</p>
          </div>
        </div>

        {/* Center Section: Search Bar */}
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

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
           <button onClick={toggleSearch} className="sm:hidden text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Search">
             {isSearchVisible ? <X className="w-5 h-5"/> : <Search className="w-5 h-5"/>}
           </button>
          <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Upload">
            <Video className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors flex-shrink-0">
            <span className="text-white text-sm font-medium">D</span>
          </div>
        </div>

      </div>
    </header>
  );
}
