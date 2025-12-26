'use client';

import { useCallback, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import {
  selectTokensByCategory,
  selectLoading,
  selectError,
} from '@/store/tokenSelectors';
import { sortTokens, setError } from '@/store/tokenSlice';
import type { Token, TokenCategory } from '@/domain/token/token.types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TokenRow } from './TokenRow';
import { SkeletonRow } from './SkeletonRow';
import { TokenDetailsModal } from './TokenDetailsModal';

interface TokenColumnProps {
  title: string;
  category: TokenCategory;
  tokens: readonly Token[];
  onSort: (sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h') => void;
  onTokenClick: (token: Token) => void;
}

function TokenColumn({ title, tokens, onSort, onTokenClick }: TokenColumnProps) {
  return (
    <div className="flex-1 border-r-0 md:border-r border-gray-800 md:last:border-r-0 border-b md:border-b-0 last:border-b-0">
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs text-red-400 font-medium uppercase tracking-wide">Live</span>
          </div>
          <TooltipProvider>
            <div className="flex gap-2 text-xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSort('marketCap')}
                    className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    MC
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p>Sort by Market Cap</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSort('volume')}
                    className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    Vol
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p>Sort by Volume</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSort('change1h')}
                    className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    1h
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p>Sort by 1h Change</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSort('change24h')}
                    className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    24h
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p>Sort by 24h Change</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <div className="text-xs text-gray-400">{tokens.length} tokens</div>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {tokens.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No tokens in this category
          </div>
        ) : (
          tokens.map((token) => (
            <div
              key={token.id}
              onClick={() => onTokenClick(token)}
              className="cursor-pointer"
            >
              <TokenRow token={token} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const MemoizedTokenColumn = memo(TokenColumn);

function TokenTable() {
  const dispatch = useDispatch<AppDispatch>();
  const newTokens = useSelector((state: RootState) => selectTokensByCategory(state, 'new'));
  const finalTokens = useSelector((state: RootState) => selectTokensByCategory(state, 'final'));
  const migratedTokens = useSelector((state: RootState) => selectTokensByCategory(state, 'migrated'));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = useCallback(
    (sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h') => {
      dispatch(sortTokens({ sortBy }));
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Error loading tokens</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
    <>
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900 text-white">
        <MemoizedTokenColumn
          title="New Pairs"
          category="new"
          tokens={newTokens}
          onSort={handleSort}
          onTokenClick={handleTokenClick}
        />
        <MemoizedTokenColumn
          title="Final Stretch"
          category="final"
          tokens={finalTokens}
          onSort={handleSort}
          onTokenClick={handleTokenClick}
        />
        <MemoizedTokenColumn
          title="Migrated"
          category="migrated"
          tokens={migratedTokens}
          onSort={handleSort}
          onTokenClick={handleTokenClick}
        />
      </div>
      <TokenDetailsModal
        token={selectedToken}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

export { TokenTable };
