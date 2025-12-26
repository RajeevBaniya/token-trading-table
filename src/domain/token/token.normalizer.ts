import type {
  RawTokenData,
  RawTokensData,
  Token,
  TokenCategory,
  PriceDirection,
  TokensByCategory,
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
  return {
    id: rawToken.id,
    name: rawToken.name,
    symbol: rawToken.symbol,
    image: rawToken.image,
    price: rawToken.price,
    prevPrice: rawToken.price,
    priceDirection: 'neutral',
    marketCap: rawToken.marketCap,
    volume24h: rawToken.volume24h,
    change1h: rawToken.change1h,
    change24h: rawToken.change24h,
    category,
  };
}

function normalizeTokensByCategory(rawData: RawTokensData): TokensByCategory {
  return {
    new: rawData.new.map((token) => normalizeInitialToken(token, 'new')),
    final: rawData.final.map((token) => normalizeInitialToken(token, 'final')),
    migrated: rawData.migrated.map((token) => normalizeInitialToken(token, 'migrated')),
  };
}

function flattenTokens(tokensByCategory: TokensByCategory): readonly Token[] {
  return [
    ...tokensByCategory.new,
    ...tokensByCategory.final,
    ...tokensByCategory.migrated,
  ];
}

function createTokenMap(tokens: readonly Token[]): Readonly<Record<string, Token>> {
  return Object.fromEntries(
    tokens.map((token) => [token.id, token])
  );
}

interface UpdateTokenPriceParams {
  newPrice: number;
  newMarketCap: number;
  newVolume24h: number;
  newChange1h: number;
  newChange24h: number;
}

function updateTokenPrice(
  existingToken: Token,
  params: UpdateTokenPriceParams
): Token {
  const priceDirection = calculatePriceDirection(params.newPrice, existingToken.price);

  return {
    ...existingToken,
    price: params.newPrice,
    prevPrice: existingToken.price,
    priceDirection,
    marketCap: params.newMarketCap,
    volume24h: params.newVolume24h,
    change1h: Math.max(-50, Math.min(50, params.newChange1h)),
    change24h: Math.max(-50, Math.min(50, params.newChange24h)),
  };
}

export {
  normalizeInitialToken,
  normalizeTokensByCategory,
  flattenTokens,
  createTokenMap,
  updateTokenPrice,
};
