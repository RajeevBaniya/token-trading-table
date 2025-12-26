'use client';

import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { Token } from '@/domain/token/token.types';
import type { RootState } from '@/store';
import { useLivePriceSeries } from '@/hooks/useLivePriceSeries';
import { TokenInfoBar } from '@/components/token-details/TokenInfoBar';
import { TokenChart } from '@/components/token-details/TokenChart';
import { TradingPanel } from '@/components/token-details/TradingPanel';
import { TokenTabsPanel } from '@/components/token-details/TokenTabsPanel';
import { DrawingToolsSidebar } from '@/components/token-details/DrawingToolsSidebar';
import { ChartToolbar } from '@/components/token-details/ChartToolbar';

interface TokenDetailsModalProps {
  readonly tokenId: string | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

function selectTokenById(state: RootState, tokenId: string | null): Token | null {
  if (!tokenId) {
    return null;
  }
  return state.token.tokens[tokenId] ?? null;
}

function TokenDetailsModalComponent({
  tokenId,
  open,
  onOpenChange,
}: TokenDetailsModalProps): JSX.Element | null {
  const token = useSelector((state: RootState) => selectTokenById(state, tokenId));
  const { series, currentPrice, isUp } = useLivePriceSeries(tokenId);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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
      <DialogContent className="bg-black text-white border-gray-800 max-w-none w-screen h-screen p-0 m-0 rounded-none" hideCloseButton>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between bg-black border-b border-gray-800 px-4 py-2">
            <div className="flex items-center gap-4">
              <button
                className="p-1 text-gray-400 hover:text-white transition-colors"
                onClick={handleClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
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

          <ChartToolbar />

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            <DrawingToolsSidebar />

            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              <div className="flex-1 min-h-0">
                <TokenChart series={series} currentPrice={currentPrice} isUp={isUp} />
              </div>

              <TokenTabsPanel token={token} />
            </div>

            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800 overflow-y-auto max-h-[50vh] lg:max-h-none">
              <TradingPanel token={token} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const TokenDetailsModal = memo(TokenDetailsModalComponent);

export { TokenDetailsModal };
