'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import VideoGrid from '@/components/video-grid'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Selamat Datang di MyVideoTube
            </h1>
            
            {/* Category Buttons */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                Semua
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                Music
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                Karaoke
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                Gaming
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                Live
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                Baru diupload
              </button>
            </div>
          </div>
          
          {/* Video Grid */}
          <VideoGrid />
        </main>
      </div>
    </div>
  )
}
