'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import VideoGrid from '@/components/video-grid'
import type { Video } from '@/lib/data';

const categories = ["Beranda", "Musik", "Karaoke", "Berita", "Live", "Kuliner", "Komedi", "Film", "Horor", "Traveling", "Hobby"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Beranda');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/youtube?category=${activeCategory}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
        // Optionally, show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory]);


  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Category Nav */}
      <div className="p-4 md:p-6 pb-4">
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
      <main className="p-4 md:p-6 pt-0">
        {/* Video Grid */}
        {loading ? (
          <div className="text-center text-white">Loading videos...</div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </main>
    </div>
  )
}
