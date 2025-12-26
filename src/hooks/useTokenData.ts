import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { initializeTokens, setLoading, setError } from '@/store/tokenSlice';
import { normalizeTokensByCategory } from '@/domain/token/token.normalizer';
import type { RawTokensData, Token } from '@/domain/token/token.types';
import mockCoinsData from '@/data/mock/mockCoins.json';

async function fetchTokens(): Promise<readonly Token[]> {
  const delay = 800 + Math.random() * 400;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const rawData = mockCoinsData as RawTokensData;
  const normalized = normalizeTokensByCategory(rawData);

  return [
    ...normalized.new,
    ...normalized.final,
    ...normalized.migrated,
  ];
}

function useTokenData(): void {
  const dispatch = useDispatch<AppDispatch>();
  const isInitializedRef = useRef(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isInitializedRef.current) {
      dispatch(
        initializeTokens({
          tokens: data,
          category: 'new',
        })
      );
      isInitializedRef.current = true;
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load tokens';
      dispatch(setError(errorMessage));
    } else if (!isLoading) {
      dispatch(setError(null));
    }
  }, [error, isLoading, dispatch]);
}

export { useTokenData };
