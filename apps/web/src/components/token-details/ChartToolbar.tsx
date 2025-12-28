'use client';

import { memo, useState, useCallback } from 'react';

function ChartToolbarComponent(): JSX.Element {
  const [timeframe, setTimeframe] = useState('1s');
  const [showIndicators, setShowIndicators] = useState(false);

  const handleTimeframeChange = useCallback((tf: string) => {
    setTimeframe(tf);
  }, []);

  const handleIndicatorsToggle = useCallback(() => {
    setShowIndicators((prev) => !prev);
  }, []);

  return (
    <div className="flex items-center justify-between bg-black border-b border-gray-800 px-2 py-1 overflow-x-auto">
      <div className="flex items-center gap-2">
        <button
          className={`px-2 py-1 text-xs rounded transition-colors ${
            timeframe === '1s'
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => handleTimeframeChange('1s')}
        >
          1s
        </button>
        <button
          className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
        <button
          className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
            showIndicators
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={handleIndicatorsToggle}
        >
          <span>fx</span>
          <span>Indicators</span>
        </button>
        <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <div className="w-px h-4 bg-gray-700"></div>
        <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
          Display Options
        </button>
        <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
          Hide All Bubbles
        </button>
        <div className="w-px h-4 bg-gray-700"></div>
        <button className="px-2 py-1 text-xs bg-gray-700 text-white rounded transition-colors">
          USD/BNB
        </button>
        <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
          MarketCap/Price
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>
        <div className="w-px h-4 bg-gray-700"></div>
        <span className="text-xs text-gray-400">Pulseboard</span>
        <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const ChartToolbar = memo(ChartToolbarComponent);

export { ChartToolbar };

