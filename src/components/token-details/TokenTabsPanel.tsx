'use client';

import { memo, useState, useCallback } from 'react';
import type { Token } from '@/domain/token/token.types';

interface TokenTabsPanelProps {
  readonly token: Token;
}

type TabType = 'trades' | 'positions' | 'holders' | 'topTraders' | 'devTokens';

interface TabConfig {
  readonly id: TabType;
  readonly label: string;
  readonly count?: number;
}

const TABS: readonly TabConfig[] = [
  { id: 'trades', label: 'Trades' },
  { id: 'positions', label: 'Positions' },
  { id: 'holders', label: 'Holders', count: 383 },
  { id: 'topTraders', label: 'Top Traders' },
  { id: 'devTokens', label: 'Dev Tokens', count: 22 },
];

function TokenTabsPanelComponent({ token }: TokenTabsPanelProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('positions');

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="bg-black border-t border-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 px-2 sm:px-4 gap-2 sm:gap-0">
        <div className="flex overflow-x-auto w-full sm:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 text-gray-500">({tab.count})</span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            Show Hidden
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs text-white transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant Trade
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Trades Panel
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            USD
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'positions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs">
                  <th className="pb-3 pr-4">Token</th>
                  <th className="pb-3 pr-4">Bought</th>
                  <th className="pb-3 pr-4">Sold</th>
                  <th className="pb-3 pr-4">Remaining</th>
                  <th className="pb-3 pr-4">PnL</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-800">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-6 h-6 rounded-full"
                        width={24}
                        height={24}
                      />
                      <span className="text-white">{token.symbol}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-400">-</td>
                  <td className="py-3 pr-4 text-gray-400">-</td>
                  <td className="py-3 pr-4 text-gray-400">-</td>
                  <td className="py-3 pr-4 text-gray-400">-</td>
                  <td className="py-3">
                    <button className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center py-8 text-gray-500 text-sm">
              No positions found. Start trading to see your positions here.
            </div>
          </div>
        )}

        {activeTab === 'trades' && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No recent trades found.
          </div>
        )}

        {activeTab === 'holders' && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Holder information is not available for mock data.
          </div>
        )}

        {activeTab === 'topTraders' && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Top trader information is not available for mock data.
          </div>
        )}

        {activeTab === 'devTokens' && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Dev token information is not available for mock data.
          </div>
        )}
      </div>
    </div>
  );
}

const TokenTabsPanel = memo(TokenTabsPanelComponent);

export { TokenTabsPanel };

