'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { TokenWithRuntime } from '@/domain/token/token.types';
import type { RootState } from '@/store';
import { selectTokenWithRuntimeById } from '@/store/tokenSelectors';
import { useLivePriceSeries } from '@/hooks/useLivePriceSeries';
import { TokenInfoBar } from '@/components/token-details/TokenInfoBar';
import { TokenChart } from '@/components/token-details/TokenChart';
import { TradingPanel } from '@/components/token-details/TradingPanel';
import { TokenTabsPanel } from '@/components/token-details/TokenTabsPanel';
import { DrawingToolsSidebar } from '@/components/token-details/DrawingToolsSidebar';
import { ChartToolbar } from '@/components/token-details/ChartToolbar';
import { BuySellModal } from '@/components/token-details/BuySellModal';

interface TokenDetailsModalProps {
  readonly tokenId: string | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

function TokenDetailsModalComponent({
  tokenId,
  open,
  onOpenChange,
}: TokenDetailsModalProps): JSX.Element | null {
  const token = useSelector((state: RootState) =>
    tokenId ? selectTokenWithRuntimeById(state, tokenId) : undefined
  );
  const { series, currentPrice, isUp } = useLivePriceSeries(tokenId);
  const [buySellModalOpen, setBuySellModalOpen] = useState(false);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleTradeClick = useCallback(() => {
    setBuySellModalOpen(true);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleClose]);

  if (!token) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-none w-screen h-screen p-0 m-0 rounded-none left-0 top-0 right-0 bottom-0 translate-x-0 translate-y-0 gap-0 flex flex-col sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:right-auto sm:bottom-auto sm:grid sm:gap-4" hideCloseButton>
        <DialogTitle className="sr-only">Token Details - {token.name}</DialogTitle>
        <DialogDescription className="sr-only">
          View detailed information, charts, and trading options for {token.name} ({token.symbol})
        </DialogDescription>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <div className="flex items-center justify-between bg-black border-b border-gray-800 px-4 py-2">
            <div className="flex items-center gap-4">
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </button>
            </div>
            <button
              className="p-1 text-gray-400 hover:text-white transition-colors"
              onClick={handleClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <TokenInfoBar token={token} />

          {/* Desktop Chart Toolbar */}
          <div className="hidden sm:block">
            <ChartToolbar />
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-row flex-1 overflow-hidden">
            <DrawingToolsSidebar />

            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              <div className="flex-1 min-h-0">
                <TokenChart series={series} currentPrice={currentPrice} isUp={isUp} />
              </div>

              <TokenTabsPanel token={token} />
            </div>

            <div className="w-72 border-l border-gray-800 overflow-y-auto">
              <TradingPanel token={token} />
            </div>
          </div>

          {/* Mobile Layout - Full Screen Chart */}
          <div className="sm:hidden flex flex-col flex-1 overflow-hidden min-h-0">
            {/* Mobile Chart Toolbar - Compact */}
            <div className="flex items-center gap-1 px-2 py-1 bg-black border-b border-gray-800 overflow-x-auto flex-shrink-0">
              <button className="px-2 py-1 text-xs rounded bg-gray-700 text-white transition-colors">
                1s
              </button>
              <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
              <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-0.5">
                <span className="text-[10px]">fx</span>
                <span className="text-[10px]">Indicators</span>
              </button>
              <button className="px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <div className="w-px h-3 bg-gray-700"></div>
              <button className="px-2 py-1 text-[10px] text-gray-400 hover:text-gray-300 transition-colors">
                Display Options
              </button>
              <button className="px-2 py-1 text-[10px] text-gray-400 hover:text-gray-300 transition-colors">
                Hide Bubl.
              </button>
            </div>

            <div className="flex-1 min-h-0 relative">
              <TokenChart series={series} currentPrice={currentPrice} isUp={isUp} />
            </div>

            {/* Mobile Trade Button - Fixed at Bottom */}
            <div className="px-2 py-1.5 bg-black border-t border-gray-800 flex-shrink-0">
              <button
                className="w-full py-2 rounded font-medium text-sm bg-blue-700 hover:bg-blue-600 text-white transition-colors duration-200"
                onClick={handleTradeClick}
              >
                Trade
              </button>
            </div>
          </div>
        </div>

        {/* Buy/Sell Modal - Mobile Only */}
        {token && (
          <div className="sm:hidden">
            <BuySellModal
              open={buySellModalOpen}
              onOpenChange={setBuySellModalOpen}
              token={token}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const TokenDetailsModal = memo(TokenDetailsModalComponent);

export { TokenDetailsModal };
