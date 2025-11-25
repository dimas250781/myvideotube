'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import VideoGrid from '@/components/video-grid'
import type { Video } from '@/lib/data';

const categories = ["Beranda", "Musik", "Karaoke", "Berita", "Live", "Kuliner", "Komedi", "Film", "Horor", "Traveling", "Hobby"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Beranda');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [title, setTitle] = useState('Beranda');
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const fetchVideos = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    let url = '/api/youtube?';
    if (searchQuery) {
      url += `search_query=${encodeURIComponent(searchQuery)}`;
      setTitle(`Hasil pencarian untuk "${searchQuery}"`);
    } else {
      url += `category=${encodeURIComponent(activeCategory)}`;
      setTitle(activeCategory === 'Beranda' ? 'Video Populer' : activeCategory);
    }

    if (isLoadMore && nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(prevVideos => isLoadMore ? [...prevVideos, ...data.videos] : data.videos);
      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error(error);
      if (!isLoadMore) {
        setVideos([]); // Clear videos on error for initial load
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCategory, searchQuery, nextPageToken]);


  useEffect(() => {
    fetchVideos(false);
  }, [activeCategory, searchQuery]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory(''); // Reset category when searching
    setVideos([]);
    setNextPageToken(null);
  };

  const selectCategory = (category: string) => {
    setSearchQuery(''); // Reset search when a category is selected
    setActiveCategory(category);
    setVideos([]);
    setNextPageToken(null);
  }

  const videoIds = videos.map(v => v.id);
  
  const handleLoadMore = () => {
    if (nextPageToken && !loadingMore) {
      fetchVideos(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      <div className="sticky top-[57px] sm:top-[73px] bg-black z-10 py-2 sm:py-4 px-4 md:px-6 border-b border-gray-800">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => selectCategory(category)}
              className={`px-3 py-1.5 text-sm md:px-4 md:py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                activeCategory === category && !searchQuery
                  ? 'bg-white text-black'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">{title}</h2>
        {loading ? (
          <div className="text-center text-white">Loading videos...</div>
        ) : (
          <>
            <VideoGrid videos={videos} videoIds={videoIds} />
            {nextPageToken && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
