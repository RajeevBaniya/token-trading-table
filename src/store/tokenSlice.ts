import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Token, TokenCategory, TokenMap } from '@/domain/token/token.types';
import { createTokenMap, updateTokenPrice } from '@/domain/token/token.normalizer';

interface TokenState {
  tokens: TokenMap;
  sortedIds: readonly string[];
  activeCategory: TokenCategory | null;
  loading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  tokens: {} as TokenMap,
  sortedIds: [],
  activeCategory: null,
  loading: false,
  error: null,
};

function initializeTokensReducer(
  state: TokenState,
  action: PayloadAction<{ tokens: readonly Token[]; category: TokenCategory }>
): TokenState {
  const tokenMap = createTokenMap(action.payload.tokens);
  const sortedIds = action.payload.tokens
    .slice()
    .sort((a, b) => b.marketCap - a.marketCap)
    .map((token) => token.id);

  return {
    ...state,
    tokens: tokenMap,
    sortedIds,
    activeCategory: action.payload.category,
    loading: false,
    error: null,
  };
}

interface UpdateTokenPricePayload {
  tokenId: string;
  newPrice: number;
  newMarketCap: number;
  newVolume24h: number;
  newChange1h: number;
  newChange24h: number;
}

function updateTokenPriceReducer(
  state: TokenState,
  action: PayloadAction<UpdateTokenPricePayload>
): TokenState {
  const existingToken = state.tokens[action.payload.tokenId];
  if (!existingToken) {
    return state;
  }

  const updatedToken = updateTokenPrice(existingToken, {
    newPrice: action.payload.newPrice,
    newMarketCap: action.payload.newMarketCap,
    newVolume24h: action.payload.newVolume24h,
    newChange1h: action.payload.newChange1h,
    newChange24h: action.payload.newChange24h,
  });

  const updatedTokens: Record<string, Token> = {
    ...state.tokens,
    [action.payload.tokenId]: updatedToken,
  };

  return {
    ...state,
    tokens: updatedTokens as TokenMap,
  };
}

function setCategoryReducer(
  state: TokenState,
  action: PayloadAction<TokenCategory | null>
): TokenState {
  return {
    ...state,
    activeCategory: action.payload,
  };
}

function sortTokensReducer(
  state: TokenState,
  action: PayloadAction<{ sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h' }>
): TokenState {
  const tokens = Object.values(state.tokens);
  let sorted: readonly Token[];

  switch (action.payload.sortBy) {
    case 'marketCap':
      sorted = [...tokens].sort((a, b) => b.marketCap - a.marketCap);
      break;
    case 'volume':
      sorted = [...tokens].sort((a, b) => b.volume24h - a.volume24h);
      break;
    case 'change1h':
      sorted = [...tokens].sort((a, b) => b.change1h - a.change1h);
      break;
    case 'change24h':
      sorted = [...tokens].sort((a, b) => b.change24h - a.change24h);
      break;
    default:
      sorted = tokens;
  }

  const sortedIds = sorted.map((token) => token.id);

  return {
    ...state,
    sortedIds,
  };
}

function setLoadingReducer(
  state: TokenState,
  action: PayloadAction<boolean>
): TokenState {
  return {
    ...state,
    loading: action.payload,
  };
}

function setErrorReducer(
  state: TokenState,
  action: PayloadAction<string | null>
): TokenState {
  return {
    ...state,
    error: action.payload,
    loading: false,
  };
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    initializeTokens: initializeTokensReducer,
    updateTokenPrice: updateTokenPriceReducer,
    setCategory: setCategoryReducer,
    sortTokens: sortTokensReducer,
    setLoading: setLoadingReducer,
    setError: setErrorReducer,
  },
});

export const {
  initializeTokens,
  updateTokenPrice: updateTokenPriceAction,
  setCategory,
  sortTokens,
  setLoading,
  setError,
} = tokenSlice.actions;

export default tokenSlice.reducer;
