'use client';

import { useCallback, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import {
  selectTokensByCategory,
  selectLoading,
  selectError,
  selectInitialized,
} from '@/store/tokenSelectors';
import { sortTokens, setError } from '@/store/tokenSlice';
import type { TokenWithRuntime, TokenCategory } from '@/domain/token/token.types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TokenRow } from './TokenRow';
import { SkeletonRow } from './SkeletonRow';
import { TokenDetailsModal } from './TokenDetailsModal';
import { DisplaySettings } from './DisplaySettings';

interface TokenColumnProps {
  readonly title: string;
  readonly category: TokenCategory;
  readonly tokens: readonly TokenWithRuntime[];
  readonly initialized: boolean;
  readonly onSort: (sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h') => void;
  readonly onTokenClick: (token: TokenWithRuntime) => void;
}

function TokenColumn({ title, tokens, initialized, onSort, onTokenClick }: TokenColumnProps) {
  return (
    <div className="flex-1 flex flex-col border-r-0 md:border-r border-gray-800 md:last:border-r-0 border-b md:border-b-0 last:border-b-0 overflow-hidden min-h-0">
      <div className="flex-shrink-0 bg-black border-b border-gray-800 p-2 sm:p-4">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-xs text-gray-400">4 0</span>
            <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:inline">P1 P2 P3</span>
            <button className="text-gray-400 hover:text-gray-300 transition-colors">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
          </div>
          <TooltipProvider>
            <div className="flex gap-1 sm:gap-2 text-[10px] sm:text-xs">
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs text-red-400 font-medium uppercase tracking-wide">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        {initialized && tokens.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No tokens in this category
          </div>
        ) : tokens.length > 0 ? (
          tokens.map((token) => (
            <div
              key={token.id}
              onClick={() => onTokenClick(token)}
              className="cursor-pointer"
            >
              <TokenRow token={token} />
            </div>
          ))
        ) : null}
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
  const initialized = useSelector(selectInitialized);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TokenCategory>('new');

  const handleSort = useCallback(
    (sortBy: 'marketCap' | 'volume' | 'change1h' | 'change24h') => {
      dispatch(sortTokens({ sortBy }));
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  const handleTokenClick = useCallback((token: TokenWithRuntime) => {
    setSelectedTokenId(token.id);
    setIsModalOpen(true);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
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
      <div className="bg-black text-white px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-800">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <DisplaySettings open={displayOpen} onOpenChange={setDisplayOpen} />
            <button className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
              <span>1</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] bg-black text-white overflow-hidden">
        <div className="md:hidden flex-shrink-0 bg-black border-b border-gray-800 px-4 py-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategory('new')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'new'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              New Pairs
            </button>
            <button
              onClick={() => setActiveCategory('final')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'final'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Final Stretch
            </button>
            <button
              onClick={() => setActiveCategory('migrated')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'migrated'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Migrated
            </button>
          </div>
        </div>

        <div className={`${activeCategory === 'new' ? 'flex' : 'hidden'} md:flex flex-1 w-full md:w-auto min-h-0 overflow-hidden`}>
          <MemoizedTokenColumn
            title="New Pairs"
            category="new"
            tokens={newTokens}
            initialized={initialized}
            onSort={handleSort}
            onTokenClick={handleTokenClick}
          />
        </div>
        <div className={`${activeCategory === 'final' ? 'flex' : 'hidden'} md:flex flex-1 w-full md:w-auto min-h-0 overflow-hidden`}>
          <MemoizedTokenColumn
            title="Final Stretch"
            category="final"
            tokens={finalTokens}
            initialized={initialized}
            onSort={handleSort}
            onTokenClick={handleTokenClick}
          />
        </div>
        <div className={`${activeCategory === 'migrated' ? 'flex' : 'hidden'} md:flex flex-1 w-full md:w-auto min-h-0 overflow-hidden`}>
          <MemoizedTokenColumn
            title="Migrated"
            category="migrated"
            tokens={migratedTokens}
            initialized={initialized}
            onSort={handleSort}
            onTokenClick={handleTokenClick}
          />
        </div>
      </div>
      <TokenDetailsModal
        tokenId={selectedTokenId}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

export { TokenTable };
