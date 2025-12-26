import { memo } from 'react';
import type { Token } from '@/domain/token/token.types';

interface ChangeIndicatorProps {
  change1h: number;
  change24h: number;
}

function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function ChangeIndicator({ change1h, change24h }: ChangeIndicatorProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-xs">
      <span className={change1h >= 0 ? 'text-green-400' : 'text-red-400'}>
        {formatChange(change1h)}
      </span>
      <span className={change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
        {formatChange(change24h)}
      </span>
    </div>
  );
}

const MemoizedChangeIndicator = memo(ChangeIndicator);

export { MemoizedChangeIndicator as ChangeIndicator };
