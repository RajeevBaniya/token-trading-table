'use client';

import { useState } from 'react';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navigationItems = [
    { label: 'Trade', href: '#' },
    { label: 'Pulse', href: '#', active: true },
    { label: 'Markets', href: '#' },
    { label: 'Portfolio', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">P</span>
              </div>
              <span className="text-white font-semibold text-base sm:text-lg hidden sm:block">
                Pulseboard
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    item.active
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search tokens..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-48 lg:w-64 px-3 lg:px-4 py-1.5 lg:py-2 bg-gray-800 border rounded-lg text-sm text-white placeholder-gray-500 transition-colors ${
                  searchFocused
                    ? 'border-blue-500 outline-none'
                    : 'border-gray-700 focus:border-gray-600'
                }`}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                <span className="text-white text-xs sm:text-sm font-medium">U</span>
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                    <div className="p-2">
                      <a
                        href="#"
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </a>
                      <div className="border-t border-gray-700 my-1" />
                      <a
                        href="#"
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
