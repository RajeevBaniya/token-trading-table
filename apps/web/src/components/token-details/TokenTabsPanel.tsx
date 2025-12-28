'use client';

import { memo, useState, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { TokenWithRuntime } from '@/domain/token/token.types';

interface TokenTabsPanelProps {
  readonly token: TokenWithRuntime;
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

interface ActionButton {
  readonly id: string;
  readonly label: string;
  readonly icon: JSX.Element;
  readonly variant: 'default' | 'primary';
  readonly onClick?: () => void;
}

const ACTION_BUTTONS: readonly ActionButton[] = [
  {
    id: 'show-hidden',
    label: 'Show Hidden',
    variant: 'default',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ),
  },
  {
    id: 'instant-trade',
    label: 'Instant Trade',
    variant: 'primary',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'trades-panel',
    label: 'Trades Panel',
    variant: 'default',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    id: 'usd',
    label: 'USD',
    variant: 'default',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
  },
];

function TokenTabsPanelComponent({ token }: TokenTabsPanelProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('positions');
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleActionClick = useCallback((actionId: string) => {
    setPopoverOpen(false);
    // Handle action click here if needed
  }, []);

  return (
    <div className="bg-black border-t border-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 px-2 py-1 gap-1.5 sm:gap-0">
        <div className="flex overflow-x-auto w-full sm:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium transition-colors relative whitespace-nowrap ${
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

        {/* Desktop: Show all buttons */}
        <div className="hidden lg:flex items-center gap-1.5 flex-nowrap">
          {ACTION_BUTTONS.map((action) => (
            <button
              key={action.id}
              className={`flex items-center gap-0.5 px-2 py-0.5 rounded text-xs transition-all duration-200 cursor-pointer ${
                action.variant === 'primary'
                  ? 'bg-green-600 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/20 text-white hover:scale-105'
                  : 'bg-gray-800 hover:bg-gray-700 hover:text-white text-gray-300 hover:scale-105 hover:shadow-md'
              }`}
              onClick={() => handleActionClick(action.id)}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>

        {/* Tablet/Mobile: Show menu button with popover */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="lg:hidden flex items-center gap-1 px-2 py-0.5 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <span>Actions</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-gray-800 border-gray-700" align="end">
            <div className="flex flex-col gap-1">
              {ACTION_BUTTONS.map((action) => (
                <button
                  key={action.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-xs transition-all duration-200 text-left cursor-pointer ${
                    action.variant === 'primary'
                      ? 'bg-green-600 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/20 text-white hover:scale-[1.02]'
                      : 'bg-gray-700 hover:bg-gray-600 hover:text-white text-gray-300 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-900/50'
                  }`}
                  onClick={() => handleActionClick(action.id)}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="p-2 sm:p-3">
        {activeTab === 'positions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400 text-[10px]">
                  <th className="pb-1.5 pr-3">Token</th>
                  <th className="pb-1.5 pr-3">Bought</th>
                  <th className="pb-1.5 pr-3">Sold</th>
                  <th className="pb-1.5 pr-3">Remaining</th>
                  <th className="pb-1.5 pr-3">PnL</th>
                  <th className="pb-1.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-800">
                  <td className="py-1.5 pr-3">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      <span className="text-white text-xs">{token.symbol}</span>
                    </div>
                  </td>
                  <td className="py-1.5 pr-3 text-gray-400 text-xs">-</td>
                  <td className="py-1.5 pr-3 text-gray-400 text-xs">-</td>
                  <td className="py-1.5 pr-3 text-gray-400 text-xs">-</td>
                  <td className="py-1.5 pr-3 text-gray-400 text-xs">-</td>
                  <td className="py-1.5">
                    <button className="px-1.5 py-0.5 bg-gray-800 hover:bg-gray-700 rounded text-[10px] text-gray-300 transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center py-4 text-gray-500 text-xs">
              No positions found. Start trading to see your positions here.
            </div>
          </div>
        )}

        {activeTab === 'trades' && (
          <div className="text-center py-4 text-gray-500 text-xs">
            No recent trades found.
          </div>
        )}

        {activeTab === 'holders' && (
          <div className="text-center py-4 text-gray-500 text-xs">
            Holder information is not available for mock data.
          </div>
        )}

        {activeTab === 'topTraders' && (
          <div className="text-center py-4 text-gray-500 text-xs">
            Top trader information is not available for mock data.
          </div>
        )}

        {activeTab === 'devTokens' && (
          <div className="text-center py-4 text-gray-500 text-xs">
            Dev token information is not available for mock data.
          </div>
        )}
      </div>
    </div>
  );
}

const TokenTabsPanel = memo(TokenTabsPanelComponent);

export { TokenTabsPanel };

