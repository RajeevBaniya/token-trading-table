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
  readonly chain: 'BNB' | 'SOL';
}

export interface RawTokensData {
  readonly new: readonly RawTokenData[];
  readonly final: readonly RawTokenData[];
  readonly migrated: readonly RawTokenData[];
}

export interface ApiResponse {
  readonly version: string;
  readonly timestamp: number;
  readonly data: RawTokensData;
}

