'use client';

import { memo, useState, useCallback } from 'react';
import type { TokenWithRuntime } from '@/domain/token/token.types';

interface TradingPanelProps {
  readonly token: TokenWithRuntime;
}

function formatPrice(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  if (value >= 1) {
    return `$${value.toFixed(2)}`;
  }
  return `$${value.toFixed(6)}`;
}

function TradingPanelComponent({ token }: TradingPanelProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'adv'>('market');
  const [amount, setAmount] = useState('0.0');
  const [activePreset, setActivePreset] = useState<1 | 2 | 3>(1);

  const handleTabChange = useCallback((tab: 'buy' | 'sell') => {
    setActiveTab(tab);
  }, []);

  const handleOrderTypeChange = useCallback((type: 'market' | 'limit' | 'adv') => {
    setOrderType(type);
  }, []);

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value);
  }, []);

  const handlePresetChange = useCallback((preset: 1 | 2 | 3) => {
    setActivePreset(preset);
  }, []);

  const handleQuickAmount = useCallback((value: string) => {
    setAmount(value);
  }, []);

  return (
    <div className="bg-black rounded-lg p-3 sm:p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-400">Pulseboard</div>
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">5m Vol</span>
          <span className="text-white">{formatPrice(token.volume24h * 0.01)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Buys</span>
          <span className="text-green-400">0 / $0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Sells</span>
          <span className="text-red-400">0 / $0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Net Vol.</span>
          <span className="text-white">$0</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`flex-1 py-2 rounded font-medium text-sm transition-colors ${
            activeTab === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('buy')}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 rounded font-medium text-sm transition-colors ${
            activeTab === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleTabChange('sell')}
        >
          Sell
        </button>
      </div>

      <div className="flex gap-1 mb-4">
        <button
          className={`flex-1 py-1 rounded text-xs transition-colors ${
            orderType === 'market'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleOrderTypeChange('market')}
        >
          Market
        </button>
        <button
          className={`flex-1 py-1 rounded text-xs transition-colors ${
            orderType === 'limit'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleOrderTypeChange('limit')}
        >
          Limit
        </button>
        <button
          className={`flex-1 py-1 rounded text-xs transition-colors ${
            orderType === 'adv'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handleOrderTypeChange('adv')}
        >
          Adv
        </button>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2">AMOUNT</div>
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="0.0"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
            BNB
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4">
        <button
          className="py-1 bg-gray-800 hover:bg-gray-700 rounded text-[10px] sm:text-xs text-gray-300 transition-colors"
          onClick={() => handleQuickAmount('0.025')}
        >
          0.025
        </button>
        <button
          className="py-1 bg-gray-800 hover:bg-gray-700 rounded text-[10px] sm:text-xs text-gray-300 transition-colors"
          onClick={() => handleQuickAmount('0.05')}
        >
          0.05
        </button>
        <button
          className="py-1 bg-gray-800 hover:bg-gray-700 rounded text-[10px] sm:text-xs text-gray-300 transition-colors"
          onClick={() => handleQuickAmount('0.1')}
        >
          0.1
        </button>
        <button
          className="py-1 bg-gray-800 hover:bg-gray-700 rounded text-[10px] sm:text-xs text-gray-300 transition-colors"
          onClick={() => handleQuickAmount('0.25')}
        >
          0.25
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs">
        <span className="text-gray-400">40%</span>
        <span className="text-gray-400">1</span>
        <span className="text-gray-400">0</span>
        <span className="text-green-400">On</span>
      </div>

      <button
        className={`w-full py-3 rounded font-medium text-sm transition-colors ${
          activeTab === 'buy'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {activeTab === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
      </button>

      <div className="mt-4 space-y-2 text-xs">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-gray-400">Bought</div>
            <div className="text-white">0</div>
          </div>
          <div>
            <div className="text-gray-400">Sold</div>
            <div className="text-white">0</div>
          </div>
          <div>
            <div className="text-gray-400">Holding</div>
            <div className="text-white">0</div>
          </div>
          <div>
            <div className="text-gray-400">PnL</div>
            <div className="text-green-400">+0 (+0%)</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className={`flex-1 py-2 rounded text-xs transition-colors ${
            activePreset === 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handlePresetChange(1)}
        >
          PRESET 1
        </button>
        <button
          className={`flex-1 py-2 rounded text-xs transition-colors ${
            activePreset === 2
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handlePresetChange(2)}
        >
          PRESET 2
        </button>
        <button
          className={`flex-1 py-2 rounded text-xs transition-colors ${
            activePreset === 3
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handlePresetChange(3)}
        >
          PRESET 3
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Token Info</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Tax %</span>
          <span className="text-green-400">1.00%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Top 10 H.</span>
          <span className="text-red-400">16.83%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Dev H.</span>
          <span className="text-green-400">0%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Snipers H.</span>
          <span className="text-green-400">0%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Holders</span>
          <span className="text-white">383</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Dex Paid</span>
          <span className="text-yellow-400">Unpaid</span>
        </div>
      </div>
    </div>
  );
}

const TradingPanel = memo(TradingPanelComponent);

export { TradingPanel };

