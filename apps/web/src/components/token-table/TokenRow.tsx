import { memo } from 'react';
import type { TokenWithRuntime } from '@/domain/token/token.types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PriceCell } from './PriceCell';

interface TokenRowProps {
  token: TokenWithRuntime;
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
    <div className="border-b border-gray-800 p-2 sm:p-4 hover:bg-gray-800/30 transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          <img
            src={token.image}
            alt={token.name}
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
            loading="lazy"
            width={40}
            height={40}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
              <div className="font-medium text-[11px] sm:text-sm truncate">{token.name}</div>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                token.chain === 'BNB' ? 'bg-yellow-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
              }`}>
                <span className={`text-[8px] font-bold ${token.chain === 'BNB' ? 'text-black' : 'text-white'}`}>
                  {token.chain === 'BNB' ? 'B' : 'S'}
                </span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex-shrink-0"
                    aria-label="Token information"
                    onClick={(e) => e.stopPropagation()}
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
            <div className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2">{token.symbol}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">{token.timestamp}</div>

            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-xs text-gray-400">{token.engagement.person}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-400">{token.engagement.globe}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs text-gray-400">{token.engagement.search}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs text-gray-400">{token.engagement.doc}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-gray-400">{token.engagement.crown}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-sm font-semibold ${
                  token.percentage >= 50 ? 'text-green-400' : token.percentage >= 20 ? 'text-gray-400' : 'text-red-400'
                }`}
              >
                {token.percentage}%
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className={token.change1h >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {token.change1h >= 0 ? '+' : ''}
                  {token.change1h.toFixed(2)}%
                </span>
                <span className={token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {token.change24h >= 0 ? '+' : ''}
                  {token.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="mb-1 sm:mb-2">
            <PriceCell price={token.price} priceDirection={token.priceDirection} />
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-xs">
            <div>
              <span className="text-gray-400">MC </span>
              <span className="text-white">{formatMarketCap(token.marketCap)}</span>
            </div>
            <div>
              <span className="text-gray-400">V </span>
              <span className="text-white">{formatVolume(token.volume24h)}</span>
            </div>
            <div>
              <span className="text-gray-400">TX </span>
              <span className="text-white">{token.txCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          className="px-1.5 sm:px-3 py-0.5 sm:py-1 bg-blue-600 hover:bg-blue-700 rounded text-[9px] sm:text-xs text-white font-medium transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          4 0 {token.chain}
        </button>
      </div>
    </div>
  );
}

const MemoizedTokenRow = memo(TokenRow);

export { MemoizedTokenRow as TokenRow };
