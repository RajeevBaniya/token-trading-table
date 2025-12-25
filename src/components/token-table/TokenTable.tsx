'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import {
  selectTokensByCategory,
  selectLoading,
} from '@/store/tokenSelectors';
import { sortTokens } from '@/store/tokenSlice';
import type { Token, TokenCategory } from '@/domain/token/token.types';
import { TokenRow } from './TokenRow';
import { SkeletonRow } from './SkeletonRow';

interface TokenColumnProps {
  title: string;
  category: TokenCategory;
  tokens: readonly Token[];
  onSort: (sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h') => void;
}

function TokenColumn({ title, tokens, onSort }: TokenColumnProps) {
  return (
    <div className="flex-1 border-r-0 md:border-r border-gray-800 md:last:border-r-0 border-b md:border-b-0 last:border-b-0">
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => onSort('marketCap')}
              className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
            >
              MC
            </button>
            <button
              onClick={() => onSort('volume')}
              className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
            >
              Vol
            </button>
            <button
              onClick={() => onSort('change1h')}
              className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
            >
              1h
            </button>
            <button
              onClick={() => onSort('change24h')}
              className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
            >
              24h
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-400">{tokens.length} tokens</div>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {tokens.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No tokens in this category
          </div>
        ) : (
          tokens.map((token) => <TokenRow key={token.id} token={token} />)
        )}
      </div>
    </div>
  );
}

function TokenTable() {
  const dispatch = useDispatch<AppDispatch>();
  const newTokens = useSelector((state) => selectTokensByCategory(state, 'new'));
  const finalTokens = useSelector((state) => selectTokensByCategory(state, 'final'));
  const migratedTokens = useSelector((state) => selectTokensByCategory(state, 'migrated'));
  const loading = useSelector(selectLoading);

  const handleSort = (sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h') => {
    dispatch(sortTokens({ sortBy }));
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
        <div className="flex-1">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
        <div className="flex-1">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-gray-900 text-white">
      <TokenColumn
        title="New Pairs"
        category="new"
        tokens={newTokens}
        onSort={handleSort}
      />
      <TokenColumn
        title="Final Stretch"
        category="final"
        tokens={finalTokens}
        onSort={handleSort}
      />
      <TokenColumn
        title="Migrated"
        category="migrated"
        tokens={migratedTokens}
        onSort={handleSort}
      />
    </div>
  );
}

export { TokenTable };
