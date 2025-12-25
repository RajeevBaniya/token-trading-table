import { memo } from 'react';
import type { Token } from '@/domain/token/token.types';
import { PriceCell } from './PriceCell';
import { ChangeIndicator } from './ChangeIndicator';

interface TokenRowProps {
  token: Token;
}

function TokenRow({ token }: TokenRowProps) {
  const formatMarketCap = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatVolume = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={token.image}
          alt={token.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="font-medium text-sm">{token.name}</div>
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
