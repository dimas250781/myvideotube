'use client'

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 p-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center cursor-pointer">
          <div className="w-8 h-8 bg-red-600 rounded-lg mr-2 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className="text-xl font-bold text-white hidden sm:block">MyVideoTube</h1>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari video..."
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Upload">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
            </svg>
          </button>
          <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Notifications">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors">
            <span className="text-white text-sm font-medium">D</span>
          </div>
        </div>
      </div>
    </header>
  );
}
