import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { initializeTokens } from '@/store/tokenSlice';
import { normalizeTokensByCategory } from '@/domain/token/token.normalizer';
import type { RawTokensData } from '@/domain/token/token.types';
import mockCoinsData from '@/data/mock/mockCoins.json';
import { useMockWebSocket } from './useMockWebSocket';

function useTokenBootstrap(): void {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const rawData = mockCoinsData as RawTokensData;
    const normalized = normalizeTokensByCategory(rawData);

    const allTokens = [
      ...normalized.new,
      ...normalized.final,
      ...normalized.migrated,
    ];

    dispatch(
      initializeTokens({
        tokens: allTokens,
        category: 'new',
      })
    );
  }, [dispatch]);

  useMockWebSocket();
}

export { useTokenBootstrap };

