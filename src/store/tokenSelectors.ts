import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Token, TokenCategory, ChainFilter } from '@/domain/token/token.types';

function selectTokens(state: RootState): Readonly<Record<string, Token>> {
  return state.token.tokens;
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

function selectTokenById(state: RootState, tokenId: string): Token | undefined {
  return state.token.tokens[tokenId];
}

const selectTokensByCategory = createSelector(
  [
    (state: RootState) => state.token.tokens,
    (state: RootState) => state.token.chainFilter,
    (_state: RootState, category: TokenCategory) => category,
  ],
  (tokens, chainFilter, category): readonly Token[] => {
    const tokenArray = Object.values(tokens);
    return tokenArray.filter((token) => {
      const matchesCategory = token.category === category;
      const matchesChain = chainFilter === 'All' || token.chain === chainFilter;
      return matchesCategory && matchesChain;
    });
  }
);

function selectSortedTokens(state: RootState): readonly Token[] {
  const tokens = Object.values(state.token.tokens);
  const sortedIds = state.token.sortedIds;
  
  return sortedIds
    .map((id) => tokens.find((token) => token.id === id))
    .filter((token): token is Token => token !== undefined);
}

export {
  selectTokens,
  selectSortedIds,
  selectActiveCategory,
  selectChainFilter,
  selectLoading,
  selectError,
  selectTokenById,
  selectTokensByCategory,
  selectSortedTokens,
};
