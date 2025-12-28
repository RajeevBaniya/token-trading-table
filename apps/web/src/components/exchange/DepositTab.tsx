'use client';

import { memo, useState, useCallback } from 'react';

interface DepositTabProps {
  readonly depositAddress: string;
}

function DepositTabComponent({ depositAddress }: DepositTabProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  }, [depositAddress]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-xs sm:text-sm">BNB</span>
        </div>
        <div className="flex-1">
          <div className="text-xs sm:text-sm text-gray-400">Balance</div>
          <div className="text-base sm:text-lg font-semibold text-white">0 BNB</div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-400">
          Only deposit BNB through the BSC network for this address.
        </p>

        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Deposit Address</span>
            <button
              onClick={handleCopyAddress}
              className="p-1.5 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {copied ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm text-white font-mono break-all">
              {depositAddress}
            </code>
          </div>
        </div>

        <a
          href="#"
          className="block text-sm text-blue-400 hover:text-blue-300 transition-colors text-center"
        >
          Don&apos;t have any BNB? Buy through Onramper.
        </a>

        <button
          onClick={handleCopyAddress}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Address'}
        </button>
      </div>
    </div>
  );
}

const DepositTab = memo(DepositTabComponent);

export { DepositTab };

