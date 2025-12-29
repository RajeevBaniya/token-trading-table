import type {
  RawTokenData,
  RawTokensData,
  Token,
  TokenCategory,
  PriceDirection,
  TokensByCategory,
  ChainType,
  TokenRuntime,
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
    marketCap: rawToken.marketCap,
    volume24h: rawToken.volume24h,
    change1h: rawToken.change1h,
    change24h: rawToken.change24h,
    category,
    chain: rawToken.chain as ChainType,
    timestamp: rawToken.timestamp,
    engagement: rawToken.engagement,
    txCount: rawToken.txCount,
    percentage: rawToken.percentage,
  };
}

function createInitialRuntime(token: Token): TokenRuntime {
  return {
    prevPrice: token.price,
    priceDirection: 'neutral',
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

interface UpdateTokenPriceResult {
  readonly domain: Token;
  readonly runtime: TokenRuntime;
}

function updateTokenPrice(
  existingDomain: Token,
  _existingRuntime: TokenRuntime,
  newPrice: number
): UpdateTokenPriceResult {
  const priceDirection = calculatePriceDirection(newPrice, existingDomain.price);
  
  const priceChangePercent = ((newPrice - existingDomain.price) / existingDomain.price) * 100;
  const marketCapRatio = newPrice / existingDomain.price;
  const newMarketCap = existingDomain.marketCap * marketCapRatio;
  const newVolume24h = existingDomain.volume24h;
  const newChange1h = existingDomain.change1h + priceChangePercent * 0.3;
  const newChange24h = existingDomain.change24h + priceChangePercent * 0.15;

  const updatedDomain: Token = {
    ...existingDomain,
    price: newPrice,
    marketCap: newMarketCap,
    volume24h: newVolume24h,
    change1h: Math.max(-50, Math.min(50, newChange1h)),
    change24h: Math.max(-50, Math.min(50, newChange24h)),
  };

  const updatedRuntime: TokenRuntime = {
    prevPrice: existingDomain.price,
    priceDirection,
  };

  return {
    domain: updatedDomain,
    runtime: updatedRuntime,
  };
}

export {
  normalizeInitialToken,
  normalizeTokensByCategory,
  flattenTokens,
  createTokenMap,
  createInitialRuntime,
  updateTokenPrice,
};
export type { UpdateTokenPriceResult };
