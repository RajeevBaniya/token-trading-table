'use client';

import { memo, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DepositTab } from './DepositTab';
import { ConvertTab } from './ConvertTab';
import { BuyTab } from './BuyTab';

interface DepositModalProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

type TabType = 'convert' | 'deposit' | 'buy';

const DEPOSIT_ADDRESS = '0x36b18239bbfc69106c5997e23010cab551c2a8a9';
const EXCHANGE_RATE = 0.1463;
const SOL_PRICE = 0.67;

function DepositModalComponent({ open, onOpenChange }: DepositModalProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('convert');

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-md w-[calc(100vw-2rem)] sm:w-full" hideCloseButton>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Exchange</DialogTitle>
            <button
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <DialogDescription className="sr-only">
            Exchange, deposit, or buy tokens through various payment methods
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => handleTabChange('convert')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'convert'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 text-gray-500 hover:bg-gray-650'
            }`}
          >
            Convert
          </button>
          <button
            onClick={() => handleTabChange('deposit')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'deposit'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 text-gray-500 hover:bg-gray-650'
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => handleTabChange('buy')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'buy'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 text-gray-500 hover:bg-gray-650'
            }`}
          >
            Buy
          </button>
        </div>

        {activeTab === 'deposit' && (
          <DepositTab depositAddress={DEPOSIT_ADDRESS} />
        )}

        {activeTab === 'convert' && (
          <ConvertTab exchangeRate={EXCHANGE_RATE} solPrice={SOL_PRICE} />
        )}

        {activeTab === 'buy' && (
          <BuyTab />
        )}
      </DialogContent>
    </Dialog>
  );
}

const DepositModal = memo(DepositModalComponent);

export { DepositModal };
