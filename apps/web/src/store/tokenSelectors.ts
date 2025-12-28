import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type {
  Token,
  TokenCategory,
  ChainFilter,
  TokenWithRuntime,
} from '@/domain/token/token.types';

function selectTokens(state: RootState): Readonly<Record<string, Token>> {
  return state.token.tokens;
}

function selectTokensWithRuntime(state: RootState): Readonly<Record<string, TokenWithRuntime>> {
  const tokens = state.token.tokens;
  const runtimeState = state.token.runtimeState;
  const result: Record<string, TokenWithRuntime> = {};
  
  for (const tokenId in tokens) {
    const domain = tokens[tokenId];
    const runtime = runtimeState[tokenId];
    if (domain && runtime) {
      result[tokenId] = {
        ...domain,
        ...runtime,
      };
    }
  }
  
  return result;
}

function selectSortedIds(state: RootState): readonly string[] {
  return state.token.sortedIds;
}

function selectActiveCategory(state: RootState): TokenCategory | null {
  return state.token.activeCategory;
}

function selectChainFilter(state: RootState): ChainFilter {
  return state.token.chainFilter;
}

function selectLoading(state: RootState): boolean {
  return state.token.loading;
}

function selectError(state: RootState): string | null {
  return state.token.error;
}

function selectInitialized(state: RootState): boolean {
  return state.token.initialized;
}

function selectTokenById(state: RootState, tokenId: string): Token | undefined {
  return state.token.tokens[tokenId];
}

function selectTokenWithRuntimeById(
  state: RootState,
  tokenId: string
): TokenWithRuntime | undefined {
  const domain = state.token.tokens[tokenId];
  const runtime = state.token.runtimeState[tokenId];
  if (domain && runtime) {
    return {
      ...domain,
      ...runtime,
    };
  }
  return undefined;
}

const selectTokensByCategory = createSelector(
  [
    (state: RootState) => state.token.sortedIds,
    (state: RootState) => state.token.tokens,
    (state: RootState) => state.token.runtimeState,
    (state: RootState) => state.token.chainFilter,
    (_state: RootState, category: TokenCategory) => category,
  ],
  (sortedIds, tokens, runtimeState, chainFilter, category): readonly TokenWithRuntime[] => {
    return sortedIds
      .map((tokenId) => {
        const domain = tokens[tokenId];
        const runtime = runtimeState[tokenId];
        if (domain && runtime) {
          const matchesCategory = domain.category === category;
          const matchesChain = chainFilter === 'All' || domain.chain === chainFilter;
          if (matchesCategory && matchesChain) {
            return {
              ...domain,
              ...runtime,
            };
          }
        }
        return null;
      })
      .filter((token): token is TokenWithRuntime => token !== null);
  }
);

function selectSortedTokens(state: RootState): readonly TokenWithRuntime[] {
  const tokens = state.token.tokens;
  const runtimeState = state.token.runtimeState;
  const sortedIds = state.token.sortedIds;
  
  return sortedIds
    .map((id) => {
      const domain = tokens[id];
      const runtime = runtimeState[id];
      if (domain && runtime) {
        return {
          ...domain,
          ...runtime,
        };
      }
      return null;
    })
    .filter((token): token is TokenWithRuntime => token !== null);
}

export {
  selectTokens,
  selectTokensWithRuntime,
  selectSortedIds,
  selectActiveCategory,
  selectChainFilter,
  selectLoading,
  selectError,
  selectInitialized,
  selectTokenById,
  selectTokenWithRuntimeById,
  selectTokensByCategory,
  selectSortedTokens,
};
