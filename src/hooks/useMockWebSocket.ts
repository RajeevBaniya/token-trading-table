import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import { updateTokenPriceAction } from '@/store/tokenSlice';
import { selectTokens } from '@/store/tokenSelectors';
import type { Token } from '@/domain/token/token.types';

function generateRandomDelta(): number {
  const sign = Math.random() < 0.5 ? -1 : 1;
  const magnitude = 0.5 + Math.random() * 2.5;
  return sign * magnitude;
}

function calculateNewPrice(currentPrice: number, deltaPercent: number): number {
  const multiplier = 1 + deltaPercent / 100;
  return currentPrice * multiplier;
}

function calculateNewMarketCap(currentMarketCap: number, currentPrice: number, newPrice: number): number {
  return (currentMarketCap / currentPrice) * newPrice;
}

function calculateNewVolume(currentVolume: number): number {
  const volumeVariation = 1 + (Math.random() - 0.5) * 0.1;
  return currentVolume * volumeVariation;
}

function calculateNewChange1h(currentChange1h: number, priceChangePercent: number): number {
  return currentChange1h + priceChangePercent * 0.3;
}

function calculateNewChange24h(currentChange24h: number, priceChangePercent: number): number {
  return currentChange24h + priceChangePercent * 0.15;
}

function shuffleArray<T>(array: readonly T[]): readonly T[] {
  return array
    .map((item) => ({ item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ item }) => item);
}

function selectRandomTokens(
  tokens: Readonly<Record<string, Token>>,
  count: number
): readonly Token[] {
  const tokenArray = Object.values(tokens);
  if (tokenArray.length === 0) {
    return [];
  }

  const shuffled = shuffleArray(tokenArray);
  const selectCount = Math.min(count, shuffled.length);
  return shuffled.slice(0, selectCount);
}

function useMockWebSocket(intervalMs: number = 2000): void {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector(selectTokens);
  const tokensRef = useRef(tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    const timeoutRef: { current: NodeJS.Timeout | null } = { current: null };

    function tick(): void {
      const currentTokens = tokensRef.current;
      const count = Object.keys(currentTokens).length;

      if (count === 0) {
        return;
      }

      const updateCount = 2 + Math.floor(Math.random() * 2);
      const selectedTokens = selectRandomTokens(currentTokens, updateCount);

      if (selectedTokens.length === 0) {
        return;
      }

      selectedTokens.forEach((token) => {
        const deltaPercent = generateRandomDelta();
        const newPrice = calculateNewPrice(token.price, deltaPercent);
        const priceChangePercent = ((newPrice - token.price) / token.price) * 100;

        const newMarketCap = calculateNewMarketCap(token.marketCap, token.price, newPrice);
        const newVolume24h = calculateNewVolume(token.volume24h);
        const newChange1h = calculateNewChange1h(token.change1h, priceChangePercent);
        const newChange24h = calculateNewChange24h(token.change24h, priceChangePercent);

        console.log(
          `%c[LIVE UPDATE]%c ${token.symbol}: $${token.price.toFixed(8)} → $${newPrice.toFixed(8)} %c${deltaPercent > 0 ? '↑' : '↓'}${Math.abs(deltaPercent).toFixed(2)}%`,
          'background: #dc2626; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px',
          'color: #e5e7eb; margin: 0 4px',
          deltaPercent > 0 ? 'color: #10b981; font-weight: bold' : 'color: #ef4444; font-weight: bold'
        );

        dispatch(
          updateTokenPriceAction({
            tokenId: token.id,
            newPrice,
            newMarketCap,
            newVolume24h,
            newChange1h,
            newChange24h,
          })
        );
      });
    }

    function startInterval(): void {
      const tokenCount = Object.keys(tokensRef.current).length;

      if (tokenCount === 0) {
        timeoutRef.current = setTimeout(startInterval, 500);
        return;
      }

      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;

      console.log(
        `%c🔴 LIVE UPDATES ACTIVE%c - ${tokenCount} tokens | Updates every ${intervalMs / 1000}s`,
        'background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 13px',
        'color: #9ca3af; margin-left: 8px; font-size: 12px'
      );

      intervalRef.current = setInterval(tick, intervalMs);
      tick();
    }

    startInterval();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      hasStartedRef.current = false;
    };
  }, [dispatch, intervalMs]);
}

export { useMockWebSocket };
