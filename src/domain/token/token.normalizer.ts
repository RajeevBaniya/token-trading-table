import type {
  RawTokenData,
  RawTokensData,
  Token,
  TokenCategory,
  PriceDirection,
  TokensByCategory,
  TokenMap,
} from './token.types';

function calculatePriceDirection(
  currentPrice: number,
  previousPrice: number
): PriceDirection {
  if (currentPrice > previousPrice) {
    return 'up';
  }
  if (currentPrice < previousPrice) {
    return 'down';
  }
  return 'neutral';
}

function normalizeInitialToken(
  rawToken: RawTokenData,
  category: TokenCategory
): Token {
  const priceDirection = calculatePriceDirection(rawToken.price, rawToken.price);

  return {
    id: rawToken.id,
    name: rawToken.name,
    symbol: rawToken.symbol,
    image: rawToken.image,
    price: rawToken.price,
    prevPrice: rawToken.price,
    priceDirection,
    marketCap: rawToken.marketCap,
    volume24h: rawToken.volume24h,
    change1h: rawToken.change1h,
    change24h: rawToken.change24h,
    category,
  };
}

function normalizeTokensByCategory(
  rawData: RawTokensData
): TokensByCategory {
  const newTokens = rawData.new.map((token) =>
    normalizeInitialToken(token, 'new')
  );

  const finalTokens = rawData.final.map((token) =>
    normalizeInitialToken(token, 'final')
  );

  const migratedTokens = rawData.migrated.map((token) =>
    normalizeInitialToken(token, 'migrated')
  );

  return {
    new: newTokens,
    final: finalTokens,
    migrated: migratedTokens,
  };
}

function flattenTokens(tokensByCategory: TokensByCategory): readonly Token[] {
  return [
    ...tokensByCategory.new,
    ...tokensByCategory.final,
    ...tokensByCategory.migrated,
  ];
}

function createTokenMap(tokens: readonly Token[]): TokenMap {
  return Object.fromEntries(
    tokens.map((token) => [token.id, token])
  ) as TokenMap;
}

function updateTokenPrice(token: Token, newPrice: number): Token {
  const priceDirection = calculatePriceDirection(newPrice, token.price);

  return {
    id: token.id,
    name: token.name,
    symbol: token.symbol,
    image: token.image,
    price: newPrice,
    prevPrice: token.price,
    priceDirection,
    marketCap: token.marketCap,
    volume24h: token.volume24h,
    change1h: token.change1h,
    change24h: token.change24h,
    category: token.category,
  };
}

export {
  calculatePriceDirection,
  normalizeInitialToken,
  normalizeTokensByCategory,
  flattenTokens,
  createTokenMap,
  updateTokenPrice,
};
