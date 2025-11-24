'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import VideoGrid from '@/components/video-grid'
import { videos } from '@/lib/data';

const categories = ["Semua", "Beranda", "Musik", "Karaoke", "Berita", "Live", "Kuliner", "Komedi", "Film", "Horor", "Traveling", "Hobby"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredVideos = activeCategory === 'Semua' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <Header />
      
      {/* Welcome Section & Category Nav */}
      <div className="sticky top-0 bg-black z-10 p-4 md:p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              MYVIDEOTUBE
            </h1>
            <p className="text-gray-400 text-sm">Created By. DimzM01</p>
          </div>
        </div>
        
        {/* Category Buttons */}
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-0">
        {/* Video Grid */}
        <VideoGrid videos={filteredVideos} />
      </main>
    </div>
  )
}
