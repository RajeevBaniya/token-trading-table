'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Token } from '@/domain/token/token.types';
import { PriceCell } from './PriceCell';
import { ChangeIndicator } from './ChangeIndicator';

interface TokenDetailsModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

function TokenDetailsModal({ token, open, onOpenChange }: TokenDetailsModalProps) {
  if (!token) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={token.image}
              alt={token.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="text-xl font-semibold">{token.name}</div>
              <div className="text-sm text-gray-400">{token.symbol}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Price</div>
              <PriceCell price={token.price} priceDirection={token.priceDirection} />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Market Cap</div>
              <div className="text-sm font-medium">{formatMarketCap(token.marketCap)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">24h Volume</div>
              <div className="text-sm font-medium">{formatVolume(token.volume24h)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Change</div>
              <ChangeIndicator change1h={token.change1h} change24h={token.change24h} />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-400 mb-2">Category</div>
            <div className="text-sm font-medium capitalize">{token.category}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { TokenDetailsModal };

