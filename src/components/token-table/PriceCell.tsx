import { memo } from 'react';
import type { Token } from '@/domain/token/token.types';

interface PriceCellProps {
  price: number;
  priceDirection: Token['priceDirection'];
}

function formatPrice(value: number): string {
  if (value >= 1) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 0.01) {
    return `$${value.toFixed(4)}`;
  }
  return `$${value.toFixed(8)}`;
}

function PriceCell({ price, priceDirection }: PriceCellProps) {
  const getColorClasses = (): string => {
    if (priceDirection === 'up') {
      return 'text-green-400 bg-green-500/10 transition-all duration-300';
    }
    if (priceDirection === 'down') {
      return 'text-red-400 bg-red-500/10 transition-all duration-300';
    }
    return 'text-white transition-all duration-300';
  };

  return (
    <div className={`text-sm font-medium rounded px-2 py-1 ${getColorClasses()}`}>
      {formatPrice(price)}
    </div>
  );
}

const MemoizedPriceCell = memo(PriceCell);

export { MemoizedPriceCell as PriceCell };
