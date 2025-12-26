'use client';

import { useState, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type TabType = 'layout' | 'metrics' | 'extras';
type MetricSize = 'small' | 'large';
type QuickBuySize = 'small' | 'large' | 'mega' | 'ultra';

interface DisplaySettingsProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

function DisplaySettings({ open, onOpenChange }: DisplaySettingsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('layout');
  const [metricSize, setMetricSize] = useState<MetricSize>('large');
  const [quickBuySize, setQuickBuySize] = useState<QuickBuySize>('small');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [noDecimals, setNoDecimals] = useState(true);
  const [showHiddenTokens, setShowHiddenTokens] = useState(true);
  const [unhideOnMigrated, setUnhideOnMigrated] = useState(true);
  const [circleImages, setCircleImages] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [spacedTables, setSpacedTables] = useState(false);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="px-2 py-1 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded text-xs text-white transition-colors flex items-center gap-1">
          <span>Display</span>
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-0 bg-gray-800 border-gray-700" align="end">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-medium">Metrics</div>
            <div className="flex gap-2">
              <button
                onClick={() => setMetricSize('small')}
                className={`flex-1 px-3 py-2 rounded text-xs transition-colors ${
                  metricSize === 'small'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                MC 77K Small
              </button>
              <button
                onClick={() => setMetricSize('large')}
                className={`flex-1 px-3 py-2 rounded text-xs transition-colors ${
                  metricSize === 'large'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                MC 77K Large
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-medium">Quick Buy</div>
            <div className="grid grid-cols-4 gap-2">
              {(['small', 'large', 'mega', 'ultra'] as QuickBuySize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setQuickBuySize(size)}
                  className={`px-2 py-2 rounded text-xs transition-colors flex flex-col items-center gap-1 ${
                    quickBuySize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="text-[10px]">47</span>
                  <span className="capitalize">{size}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-medium">Theme</div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-xs text-gray-300">Grey</span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-3">
            <div className="flex gap-1 mb-3">
              <button
                onClick={() => handleTabChange('layout')}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  activeTab === 'layout'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Layout
              </button>
              <button
                onClick={() => handleTabChange('metrics')}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  activeTab === 'metrics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Metrics
              </button>
              <button
                onClick={() => handleTabChange('extras')}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  activeTab === 'extras'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Extras
              </button>
            </div>

            {activeTab === 'layout' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSearchBar}
                      onChange={(e) => setShowSearchBar(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300">Show Search Bar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noDecimals}
                      onChange={(e) => setNoDecimals(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300"># No Decimals</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showHiddenTokens}
                      onChange={(e) => setShowHiddenTokens(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300">Show Hidden Tokens</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={unhideOnMigrated}
                      onChange={(e) => setUnhideOnMigrated(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300">Unhide on Migrated</span>
                  </label>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={circleImages}
                      onChange={(e) => setCircleImages(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300">Circle Images</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={progressBar}
                      onChange={(e) => setProgressBar(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300">Progress Bar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={spacedTables}
                      onChange={(e) => setSpacedTables(e.target.checked)}
                      className="w-3 h-3 text-blue-600 rounded"
                    />
                    <span className="text-xs text-gray-300">Spaced Tables</span>
                  </label>
                </div>

                <div className="pt-2 text-xs text-gray-400">Customize rows</div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="text-xs text-gray-400">Metrics settings coming soon</div>
            )}

            {activeTab === 'extras' && (
              <div className="text-xs text-gray-400">Extras settings coming soon</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DisplaySettings };

