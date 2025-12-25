import type { RootState } from './index';
import type { Token, TokenCategory } from '@/domain/token/token.types';

function selectTokens(state: RootState): Readonly<Record<string, Token>> {
  return state.token.tokens;
}

function selectSortedIds(state: RootState): readonly string[] {
  return state.token.sortedIds;
}

function selectActiveCategory(state: RootState): TokenCategory | null {
  return state.token.activeCategory;
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

function selectTokensByCategory(
  state: RootState,
  category: TokenCategory
): readonly Token[] {
  const tokens = Object.values(state.token.tokens);
  return tokens.filter((token) => token.category === category);
}

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
  selectLoading,
  selectError,
  selectTokenById,
  selectTokensByCategory,
  selectSortedTokens,
};

