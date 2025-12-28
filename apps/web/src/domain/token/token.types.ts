export type TokenCategory = 'new' | 'final' | 'migrated';

export type PriceDirection = 'up' | 'down' | 'neutral';

export type ChainType = 'BNB' | 'SOL';

export type ChainFilter = 'All' | 'BNB' | 'SOL';

export interface EngagementData {
  readonly person: number;
  readonly globe: number;
  readonly search: number;
  readonly doc: number;
  readonly crown: number;
}

export interface RawTokenData {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly image: string;
  readonly price: number;
  readonly marketCap: number;
  readonly volume24h: number;
  readonly change1h: number;
  readonly change24h: number;
  readonly chain: ChainType;
  readonly timestamp: string;
  readonly engagement: EngagementData;
  readonly txCount: number;
  readonly percentage: number;
}

export interface RawTokensData {
  readonly new: readonly RawTokenData[];
  readonly final: readonly RawTokenData[];
  readonly migrated: readonly RawTokenData[];
}

export interface Token {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly image: string;
  readonly price: number;
  readonly marketCap: number;
  readonly volume24h: number;
  readonly change1h: number;
  readonly change24h: number;
  readonly category: TokenCategory;
  readonly chain: ChainType;
  readonly timestamp: string;
  readonly engagement: EngagementData;
  readonly txCount: number;
  readonly percentage: number;
}

export interface TokenRuntime {
  readonly prevPrice: number;
  readonly priceDirection: PriceDirection;
}

export interface TokenWithRuntime extends Token {
  readonly prevPrice: number;
  readonly priceDirection: PriceDirection;
}

export type TokenMap = Readonly<Record<string, Token>>;
export type TokenRuntimeMap = Readonly<Record<string, TokenRuntime>>;

export interface TokensByCategory {
  readonly new: readonly Token[];
  readonly final: readonly Token[];
  readonly migrated: readonly Token[];
}
