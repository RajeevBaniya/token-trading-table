import type { Token, TokenCategory, TokensByCategory } from './token.types';

function selectTokensByCategory(
  tokensByCategory: TokensByCategory,
  category: TokenCategory
): readonly Token[] {
  return tokensByCategory[category];
}

function selectTokenById(
  tokens: readonly Token[],
  tokenId: string
): Token | undefined {
  return tokens.find((token) => token.id === tokenId);
}

function selectTokensByPriceDirection(
  tokens: readonly Token[],
  direction: 'up' | 'down' | 'neutral'
): readonly Token[] {
  return tokens.filter((token) => token.priceDirection === direction);
}

function sortTokensByMarketCap(tokens: readonly Token[]): readonly Token[] {
  return [...tokens].sort((a, b) => b.marketCap - a.marketCap);
}

function sortTokensByVolume(tokens: readonly Token[]): readonly Token[] {
  return [...tokens].sort((a, b) => b.volume24h - a.volume24h);
}

function sortTokensByChange1h(tokens: readonly Token[]): readonly Token[] {
  return [...tokens].sort((a, b) => b.change1h - a.change1h);
}

function sortTokensByChange24h(tokens: readonly Token[]): readonly Token[] {
  return [...tokens].sort((a, b) => b.change24h - a.change24h);
}

function selectTokensByMinMarketCap(
  tokens: readonly Token[],
  minMarketCap: number
): readonly Token[] {
  return tokens.filter((token) => token.marketCap >= minMarketCap);
}

function selectTokensByMinVolume(
  tokens: readonly Token[],
  minVolume: number
): readonly Token[] {
  return tokens.filter((token) => token.volume24h >= minVolume);
}

export {
  selectTokensByCategory,
  selectTokenById,
  selectTokensByPriceDirection,
  sortTokensByMarketCap,
  sortTokensByVolume,
  sortTokensByChange1h,
  sortTokensByChange24h,
  selectTokensByMinMarketCap,
  selectTokensByMinVolume,
};
