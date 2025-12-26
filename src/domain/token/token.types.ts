export type TokenCategory = 'new' | 'final' | 'migrated';

export type PriceDirection = 'up' | 'down' | 'neutral';

export type ChainType = 'BNB' | 'SOL';

export type ChainFilter = 'All' | 'BNB' | 'SOL';

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
  readonly prevPrice: number;
  readonly priceDirection: PriceDirection;
  readonly marketCap: number;
  readonly volume24h: number;
  readonly change1h: number;
  readonly change24h: number;
  readonly category: TokenCategory;
  readonly chain: ChainType;
}

export type TokenMap = Readonly<Record<string, Token>>;

export interface TokensByCategory {
  readonly new: readonly Token[];
  readonly final: readonly Token[];
  readonly migrated: readonly Token[];
}
