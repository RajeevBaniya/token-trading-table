import type { Token } from '@/domain/token/token.types';

interface PriceCellProps {
  price: number;
  priceDirection: Token['priceDirection'];
}

function PriceCell({ price, priceDirection }: PriceCellProps) {
  const formatPrice = (value: number): string => {
    if (value >= 1) {
      return `$${value.toFixed(2)}`;
    }
    if (value >= 0.01) {
      return `$${value.toFixed(4)}`;
    }
    return `$${value.toFixed(8)}`;
  };

  return (
    <div className="text-sm font-medium">
      {formatPrice(price)}
    </div>
  );
}

export { PriceCell };
