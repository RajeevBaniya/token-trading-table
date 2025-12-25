import type { Token } from '@/domain/token/token.types';

interface ChangeIndicatorProps {
  change1h: number;
  change24h: number;
}

function ChangeIndicator({ change1h, change24h }: ChangeIndicatorProps) {
  const formatChange = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className="flex flex-col gap-1 text-xs">
      <span className={change1h >= 0 ? 'text-green-400' : 'text-red-400'}>
        {formatChange(change1h)}
      </span>
      <span className={change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
        {formatChange(change24h)}
      </span>
    </div>
  );
}

export { ChangeIndicator };
