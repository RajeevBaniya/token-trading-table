'use client';

import { memo } from 'react';
import type { TokenWithRuntime } from '@/domain/token/token.types';

interface TokenInfoBarProps {
  readonly token: TokenWithRuntime;
  readonly onTradeClick?: () => void;
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
  if (value >= 0.01) {
    return `$${value.toFixed(4)}`;
  }
  return `$${value.toFixed(8)}`;
}

function formatMarketCap(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

function TokenInfoBarComponent({ token, onTradeClick }: TokenInfoBarProps): JSX.Element {
  const priceColorClass =
    token.priceDirection === 'up'
      ? 'text-green-400'
      : token.priceDirection === 'down'
        ? 'text-red-400'
        : 'text-white';

  return (
    <div className="bg-black border-b border-gray-800 p-1.5 sm:p-2">
      {/* Mobile Header Row - Token Name and Trade Button */}
      <div className="sm:hidden flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <img
            src={token.image}
            alt={token.name}
            className="w-7 h-7 rounded-full flex-shrink-0"
            width={32}
            height={32}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold text-white text-xs truncate">{token.name}</span>
              <span className="text-gray-400 text-xs">{token.symbol}</span>
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-400">LIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <span>on Pulseboard</span>
              <span>·</span>
              <span>2s</span>
            </div>
          </div>
        </div>
        {/* Mobile Trade Button - Top Right */}
        {onTradeClick && (
          <button
            className="px-3 py-1.5 rounded font-medium text-xs bg-blue-700 hover:bg-blue-600 text-white transition-colors duration-200 flex-shrink-0"
            onClick={onTradeClick}
          >
            Trade
          </button>
        )}
      </div>
      
      {/* Desktop Header Row */}
      <div className="hidden sm:flex flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            src={token.image}
            alt={token.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
            width={32}
            height={32}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold text-white text-sm truncate">{token.name}</span>
              <span className="text-gray-400 text-xs">{token.symbol}</span>
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-400">LIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <span>on Pulseboard</span>
              <span>·</span>
              <span>2s</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="p-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="p-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="p-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Market Data Section */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full justify-between sm:justify-start mt-2 sm:mt-0">
        <div className="text-center">
          <div className={`text-sm sm:text-base font-bold ${priceColorClass} transition-colors duration-300`}>
            {formatMarketCap(token.marketCap)}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400">Market Cap</div>
        </div>

        <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <div>
            <div className="text-[10px] sm:text-xs text-white">Price</div>
            <div className={`text-[10px] sm:text-xs font-medium ${priceColorClass} transition-colors duration-300`}>
              {formatPrice(token.price)}
            </div>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs text-white">Liquidity</div>
            <div className="text-[10px] sm:text-xs font-medium text-white">
              {formatMarketCap(token.volume24h * 0.5)}
            </div>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs text-white">Supply</div>
            <div className="text-[10px] sm:text-xs font-medium text-white">1B</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs text-white">B.Curve</div>
            <div className="text-[10px] sm:text-xs font-medium text-green-400">91.99%</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs text-white">Tax</div>
            <div className="text-[10px] sm:text-xs font-medium text-white">1%</div>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <span
              className={`text-[10px] sm:text-xs font-medium ${
                token.change1h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {token.change1h >= 0 ? '+' : ''}
              {token.change1h.toFixed(2)}%
            </span>
            <span className="text-[10px] text-gray-400">1h</span>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <span
              className={`text-[10px] sm:text-xs font-medium ${
                token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {token.change24h >= 0 ? '+' : ''}
              {token.change24h.toFixed(2)}%
            </span>
            <span className="text-[10px] text-gray-400">24h</span>
          </div>
        </div>

        {/* Mobile Action Icons */}
        <div className="sm:hidden flex items-center gap-1.5 flex-shrink-0">
          <button className="p-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="p-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="p-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const TokenInfoBar = memo(TokenInfoBarComponent);

export { TokenInfoBar };

