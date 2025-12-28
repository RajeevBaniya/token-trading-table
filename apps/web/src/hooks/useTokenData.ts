import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { initializeTokens, setLoading, setError } from '@/store/tokenSlice';
import { normalizeTokensByCategory } from '@/domain/token/token.normalizer';
import type { RawTokensData, Token } from '@/domain/token/token.types';

interface ApiResponse {
  readonly version: string;
  readonly timestamp: number;
  readonly data: RawTokensData;
}

async function fetchTokens(): Promise<readonly Token[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const response = await fetch(`${apiUrl}/tokens`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tokens: ${response.statusText}`);
  }
  
  const apiResponse: ApiResponse = await response.json();
  const normalized = normalizeTokensByCategory(apiResponse.data);

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
