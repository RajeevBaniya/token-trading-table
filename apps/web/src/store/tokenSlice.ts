import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Token,
  TokenCategory,
  TokenMap,
  TokenRuntime,
  TokenRuntimeMap,
  ChainFilter,
} from '@/domain/token/token.types';
import {
  createTokenMap,
  createInitialRuntime,
  updateTokenPrice,
} from '@/domain/token/token.normalizer';

interface TokenState {
  tokens: TokenMap;
  runtimeState: TokenRuntimeMap;
  sortedIds: readonly string[];
  activeCategory: TokenCategory | null;
  chainFilter: ChainFilter;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: TokenState = {
  tokens: {} as TokenMap,
  runtimeState: {} as TokenRuntimeMap,
  sortedIds: [],
  activeCategory: null,
  chainFilter: 'All',
  loading: false,
  error: null,
  initialized: false,
};

function initializeTokensReducer(
  state: TokenState,
  action: PayloadAction<{ tokens: readonly Token[]; category: TokenCategory }>
): TokenState {
  const tokenMap = createTokenMap(action.payload.tokens);
  
  const runtimeState: Record<string, TokenRuntime> = {};
  for (const token of action.payload.tokens) {
    runtimeState[token.id] = createInitialRuntime(token);
  }

  const sortedIds = action.payload.tokens
    .slice()
    .sort((a, b) => b.marketCap - a.marketCap)
    .map((token) => token.id);

  return {
    ...state,
    tokens: tokenMap,
    runtimeState: runtimeState as TokenRuntimeMap,
    sortedIds,
    activeCategory: action.payload.category,
    loading: false,
    error: null,
    initialized: true,
  };
}

interface UpdateTokenPricePayload {
  tokenId: string;
  newPrice: number;
}

function updateTokenPriceReducer(
  state: TokenState,
  action: PayloadAction<UpdateTokenPricePayload>
): TokenState {
  if (!state.initialized) {
    return state;
  }

  const existingDomain = state.tokens[action.payload.tokenId];
  const existingRuntime = state.runtimeState[action.payload.tokenId];
  
  if (!existingDomain || !existingRuntime) {
    return state;
  }

  const { domain: updatedDomain, runtime: updatedRuntime } = updateTokenPrice(
    existingDomain,
    existingRuntime,
    action.payload.newPrice
  );

  const updatedTokens: Record<string, Token> = {
    ...state.tokens,
    [action.payload.tokenId]: updatedDomain,
  };

  const updatedRuntimeState: Record<string, TokenRuntime> = {
    ...state.runtimeState,
    [action.payload.tokenId]: updatedRuntime,
  };

  return {
    ...state,
    tokens: updatedTokens as TokenMap,
    runtimeState: updatedRuntimeState as TokenRuntimeMap,
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

function setChainFilterReducer(
  state: TokenState,
  action: PayloadAction<ChainFilter>
): TokenState {
  return {
    ...state,
    chainFilter: action.payload,
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
    setChainFilter: setChainFilterReducer,
  },
});

export const {
  initializeTokens,
  updateTokenPrice: updateTokenPriceAction,
  setCategory,
  sortTokens,
  setLoading,
  setError,
  setChainFilter,
} = tokenSlice.actions;

export default tokenSlice.reducer;
