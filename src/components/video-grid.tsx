'use client'

const videos = [
  {
    id: 1,
    title: 'Next.js 15 Crash Course for Beginners 2024',
    channel: 'Fireship',
    views: '250K views',
    time: '2 weeks ago',
    duration: '15:30'
  },
  {
    id: 2,
    title: 'React 18 Tutorial - Build Projects',
    channel: 'Web Dev Simplified',
    views: '150K views',
    time: '1 month ago',
    duration: '22:45'
  },
  {
    id: 3,
    title: 'TypeScript Full Course for Beginners',
    channel: 'Programming with Mosh',
    views: '500K views',
    time: '3 months ago',
    duration: '1:30:15'
  },
  {
    id: 4,
    title: 'Tailwind CSS Complete Guide',
    channel: 'The Net Ninja',
    views: '180K views',
    time: '2 weeks ago',
    duration: '45:20'
  },
  {
    id: 5,
    title: 'Firebase Authentication Tutorial',
    channel: 'Fireship',
    views: '120K views',
    time: '1 week ago',
    duration: '18:30'
  },
  {
    id: 6,
    title: 'Building Modern Web Apps',
    channel: 'Traversy Media',
    views: '300K views',
    time: '2 months ago',
    duration: '35:10'
  },
  {
    id: 7,
    title: 'JavaScript Masterclass 2024',
    channel: 'CodeWithHarry',
    views: '400K views',
    time: '1 month ago',
    duration: '2:15:30'
  },
  {
    id: 8,
    title: 'Node.js Backend Development',
    channel: 'FreeCodeCamp',
    views: '600K views',
    time: '4 months ago',
    duration: '3:45:00'
  }
];

export default function VideoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <div 
          key={video.id} 
          className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer transform hover:scale-105 duration-200"
        >
          {/* Thumbnail */}
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Thumbnail</span>
              </div>
            </div>
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </span>
          </div>
          
          {/* Video Info */}
          <div className="p-4">
            <h3 className="font-semibold text-white line-clamp-2 mb-2 text-sm leading-tight">
              {video.title}
            </h3>
            <p className="text-gray-400 text-sm mb-1">{video.channel}</p>
            <div className="flex text-gray-400 text-xs">
              <span>{video.views}</span>
              <span className="mx-1">•</span>
              <span>{video.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}