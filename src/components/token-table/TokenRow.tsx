import { memo } from 'react';
import type { Token } from '@/domain/token/token.types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PriceCell } from './PriceCell';
import { ChangeIndicator } from './ChangeIndicator';

interface TokenRowProps {
  token: Token;
}

function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

function formatVolume(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

function TokenRow({ token }: TokenRowProps) {
  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={token.image}
          alt={token.name}
          className="w-10 h-10 rounded-full"
          loading="lazy"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-medium text-sm">{token.name}</div>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label="Token information"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-gray-800 border-gray-700 text-white">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div>
                      <div className="font-semibold text-sm">{token.name}</div>
                      <div className="text-xs text-gray-400">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="capitalize">{token.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price:</span>
                      <span>${token.price.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Cap:</span>
                      <span>{formatMarketCap(token.marketCap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Volume:</span>
                      <span>{formatVolume(token.volume24h)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">1h Change:</span>
                      <span
                        className={
                          token.change1h >= 0 ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {token.change1h >= 0 ? '+' : ''}
                        {token.change1h.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Change:</span>
                      <span
                        className={
                          token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {token.change24h >= 0 ? '+' : ''}
                        {token.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-xs text-gray-400">{token.symbol}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="text-gray-400 mb-1">Price</div>
          <PriceCell price={token.price} priceDirection={token.priceDirection} />
        </div>
        <div>
          <div className="text-gray-400 mb-1">MC</div>
          <div className="text-sm">{formatMarketCap(token.marketCap)}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Volume</div>
          <div className="text-sm">{formatVolume(token.volume24h)}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Change</div>
          <ChangeIndicator change1h={token.change1h} change24h={token.change24h} />
        </div>
      </div>
    </div>
  );
}

const MemoizedTokenRow = memo(TokenRow);

export { MemoizedTokenRow as TokenRow };
