'use client'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { name: 'Beranda', icon: '🏠' },
    { name: 'Shorts', icon: '🎬' },
    { name: 'Langganan', icon: '📺' },
    { name: 'Music', icon: '🎵' },
    { name: 'Karaoke', icon: '🎤' },
    { name: 'Playlist', icon: '📝' },
    { name: 'Video Saya', icon: '📹' },
    { name: 'Tonton Nanti', icon: '⏱️' },
    { name: 'Suka', icon: '👍' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col border-r border-gray-700
      `}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1 className="text-xl font-bold text-white">MyVideoTube</h1>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 text-left transition-colors">
                  <span className="text-xl w-6 text-center">{item.icon}</span>
                  <span className="text-white font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Created By: DimzM01
          </p>
        </div>
      </aside>
    </>
  );
}