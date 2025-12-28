'use client';

import { memo, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { TokenWithRuntime } from '@/domain/token/token.types';

interface BuySellModalProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
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

function BuySellModalComponent({
  open,
  onOpenChange,
  token,
}: BuySellModalProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'adv'>('market');
  const [amount, setAmount] = useState('0.0');

  const handleOrderTypeChange = useCallback((type: 'market' | 'limit' | 'adv') => {
    setOrderType(type);
  }, []);

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value);
  }, []);

  const handleQuickAmount = useCallback((value: string) => {
    setAmount(value);
  }, []);

  const handleSubmit = useCallback(() => {
    // Handle buy/sell submission
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md w-[calc(100%-2rem)] rounded-lg" hideCloseButton>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">
              {activeTab === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
            </h2>
            <button
              className="p-1 text-gray-400 hover:text-white transition-colors"
              onClick={() => onOpenChange(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Buy/Sell Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              className={`flex-1 py-2 rounded font-medium text-sm transition-colors ${
                activeTab === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 rounded font-medium text-sm transition-colors ${
                activeTab === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('sell')}
            >
              Sell
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                className={`flex-1 py-2 rounded text-sm transition-colors ${
                  orderType === 'market'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => handleOrderTypeChange('market')}
              >
                Market
              </button>
              <button
                className={`flex-1 py-2 rounded text-sm transition-colors ${
                  orderType === 'limit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => handleOrderTypeChange('limit')}
              >
                Limit
              </button>
              <button
                className={`flex-1 py-2 rounded text-sm transition-colors ${
                  orderType === 'adv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => handleOrderTypeChange('adv')}
              >
                Adv
              </button>
            </div>

            <div>
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

            <div className="grid grid-cols-4 gap-2">
              <button
                className="py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                onClick={() => handleQuickAmount('0.025')}
              >
                0.025
              </button>
              <button
                className="py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                onClick={() => handleQuickAmount('0.05')}
              >
                0.05
              </button>
              <button
                className="py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                onClick={() => handleQuickAmount('0.1')}
              >
                0.1
              </button>
              <button
                className="py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                onClick={() => handleQuickAmount('0.25')}
              >
                0.25
              </button>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-white">{formatPrice(token.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-white">
                  {amount && !isNaN(Number(amount)) ? formatPrice(Number(amount) * token.price) : '$0.00'}
                </span>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded font-medium text-sm transition-colors ${
                activeTab === 'buy'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              onClick={handleSubmit}
            >
              {activeTab === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const BuySellModal = memo(BuySellModalComponent);

export { BuySellModal };

