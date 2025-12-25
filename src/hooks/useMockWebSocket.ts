import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import { updateTokenPriceAction } from '@/store/tokenSlice';
import { selectTokens } from '@/store/tokenSelectors';
import type { Token } from '@/domain/token/token.types';

function generateRandomDelta(): number {
  const sign = Math.random() < 0.5 ? -1 : 1;
  const magnitude = 0.1 + Math.random() * 0.6;
  return sign * magnitude;
}

function calculateNewPrice(currentPrice: number, deltaPercent: number): number {
  const multiplier = 1 + deltaPercent / 100;
  return currentPrice * multiplier;
}

function selectRandomTokens(
  tokens: Readonly<Record<string, Token>>,
  count: number
): readonly Token[] {
  const tokenArray = Object.values(tokens);
  if (tokenArray.length === 0) {
    return [];
  }

  const shuffled = [...tokenArray].sort(() => Math.random() - 0.5);
  const selectCount = Math.min(count, shuffled.length);
  return shuffled.slice(0, selectCount);
}

function useMockWebSocket(intervalMs: number = 2500): void {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector(selectTokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Object.keys(tokens).length === 0) {
      return;
    }

    function tick(): void {
      const tokenCount = Math.random() < 0.5 ? 1 : 2;
      const selectedTokens = selectRandomTokens(tokens, tokenCount);

      selectedTokens.forEach((token) => {
        const deltaPercent = generateRandomDelta();
        const newPrice = calculateNewPrice(token.price, deltaPercent);
        dispatch(
          updateTokenPriceAction({
            tokenId: token.id,
            newPrice,
          })
        );
      });
    }

    intervalRef.current = setInterval(tick, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, tokens, intervalMs]);
}

export { useMockWebSocket };
