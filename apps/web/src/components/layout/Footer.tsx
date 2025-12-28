'use client';

function Footer() {
  return (
    <footer className="hidden md:block fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 lg:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <select className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white">
              <option>PRESET 1</option>
              <option>PRESET 2</option>
              <option>PRESET 3</option>
            </select>
            <div className="text-xs text-gray-400">1 0</div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </button>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Wallet</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors hidden sm:inline">Twitter</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors hidden lg:inline">Discover</a>
              <a href="#" className="text-xs text-blue-400 font-medium">Pulse</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors hidden lg:inline">PnL</a>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400">
            <span>$88.7K</span>
            <span className="hidden sm:inline">$2970</span>
            <span className="hidden lg:inline">$840</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="hidden sm:inline">Connection is stable</span>
              <span className="sm:hidden">Connected</span>
            </div>
            <select className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white">
              <option>GLOBAL</option>
            </select>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors hidden lg:block">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors hidden xl:inline">X Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

