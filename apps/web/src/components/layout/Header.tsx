'use client';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DepositModal } from '@/components/exchange/DepositModal';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { setChainFilter } from '@/store/tokenSlice';
import { selectChainFilter } from '@/store/tokenSelectors';
import type { ChainFilter } from '@/domain/token/token.types';

function Header() {
  const dispatch = useDispatch();
  const chainFilter = useSelector(selectChainFilter);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [chainFilterOpen, setChainFilterOpen] = useState(false);

  const handleChainFilterChange = useCallback((filter: ChainFilter) => {
    dispatch(setChainFilter(filter));
    setChainFilterOpen(false);
  }, [dispatch]);

  const navigationItems = [
    { label: 'Discover', href: '#' },
    { label: 'Pulse', href: '#', active: true },
    { label: 'Trackers', href: '#' },
    { label: 'Perpetuals', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Rewards', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search by token or CA..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-48 lg:w-64 px-3 lg:px-4 py-1.5 lg:py-2 bg-gray-800 border rounded-lg text-sm text-white placeholder-gray-500 transition-colors ${
                  searchFocused
                    ? 'border-blue-500 outline-none'
                    : 'border-gray-700 focus:border-gray-600'
                }`}
              />
            </div>

            <div className="hidden md:block">
              <Popover open={chainFilterOpen} onOpenChange={setChainFilterOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-lg text-sm text-white transition-colors">
                    {chainFilter === 'All' ? (
                      <span>All</span>
                    ) : chainFilter === 'BNB' ? (
                      <>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black text-[8px] font-bold">B</span>
                        </div>
                        <span>BNB</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">S</span>
                        </div>
                        <span>SOL</span>
                      </>
                    )}
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-28 p-1 bg-gray-800 border-gray-700">
                  <button
                    onClick={() => handleChainFilterChange('All')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                      chainFilter === 'All' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-white'
                    }`}
                  >
                    <span className="text-sm">All</span>
                  </button>
                  <button
                    onClick={() => handleChainFilterChange('BNB')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                      chainFilter === 'BNB' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-white'
                    }`}
                  >
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-[8px] font-bold">B</span>
                    </div>
                    <span className="text-sm">BNB</span>
                  </button>
                  <button
                    onClick={() => handleChainFilterChange('SOL')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                      chainFilter === 'SOL' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-white'
                    }`}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">S</span>
                    </div>
                    <span className="text-sm">SOL</span>
                  </button>
                </PopoverContent>
              </Popover>
            </div>

            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="hidden md:block px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white font-medium transition-colors"
            >
              Deposit
            </button>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center relative">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">0</span>
              </button>

              <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="ml-1 text-xs text-gray-400">0</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  <span className="text-white text-xs sm:text-sm font-medium">EB</span>
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
      </div>
      <DepositModal open={isDepositModalOpen} onOpenChange={setIsDepositModalOpen} />
    </header>
  );
}

export { Header };
